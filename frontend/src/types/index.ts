export type AnatomicalModelType = 'male' | 'female';

export type OrganKey =
  | 'brain'
  | 'heart'
  | 'right-lung'
  | 'left-lung'
  | 'liver'
  | 'right-kidney'
  | 'left-kidney'
  | 'stomach'
  | 'intestines'
  | 'musculoskeletal';

export type HealthCategory =
  | 'personal'
  | 'medical_history'
  | 'cardiovascular'
  | 'respiratory'
  | 'brain_neurological'
  | 'musculoskeletal'
  | 'immune'
  | 'behavioral'
  | 'laboratory';

export interface HealthParameter {
  id: string;
  key: string;
  name: string;
  category: HealthCategory;
  value: number | string | null;
  unit?: string;
  measuredAt?: string;
  source: 'manual' | 'document' | 'wearable' | 'device' | 'laboratory' | 'other';
  sourceDocument?: string;
  verificationStatus: 'verified' | 'unverified' | 'rejected';
  availability: 'available' | 'missing' | 'not_applicable';
  normalRange?: [number, number];
  conflictingValues?: {
    value: number | string;
    sourceDocument: string;
    measuredAt: string;
  }[];
}

export interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  status: 'uploading' | 'processing' | 'extracted' | 'error';
  extractedFieldCount: number;
  rawText?: string;
  previewUrl?: string;
  error?: string;
}

export interface HealthAssessment {
  assessmentMethod: 'upload' | 'manual' | 'combined';
  personalInformation: {
    fullName: string;
    dob: string;
    age: number;
    biologicalSex: 'male' | 'female';
    heightCm: number;
    weightKg: number;
    missionStatus?: string;
    nationality?: string;
  };
  medicalHistory: {
    cardiovascularHistory: string;
    respiratoryHistory: string;
    neurologicalHistory: string;
    previousSurgeries: string;
    allergies: string;
    currentMedications: string;
    chronicConditions: string;
    previousInjuries: string;
  };
  parameters: HealthParameter[];
  uploadedDocuments: UploadedDocument[];
  completeness: number; // 0 to 100%
  createdAt: string;
  verifiedAt?: string;
}

export interface BaselineHistoryPoint {
  date: string;
  value: number;
}

export interface BaselineParameterDetail {
  parameterKey: string;
  name: string;
  category: HealthCategory;
  personalAvg: number;
  stdDev: number;
  variabilityPercent: number;
  minVal: number;
  maxVal: number;
  measurementCount: number;
  measurementPeriod: string;
  lastMeasurement: string;
  unit: string;
  status: 'insufficient' | 'provisional' | 'validated';
  history: BaselineHistoryPoint[];
}

export interface EarthBaseline {
  astronautId: string;
  overallStatus: 'insufficient' | 'provisional' | 'validated';
  measurementPeriod: string;
  totalMeasurementCount: number;
  dataCompleteness: number;
  baselineConfidence: number;
  lastUpdated: string;
  parameters: Record<string, BaselineParameterDetail>;
}

export interface ProjectionTimelinePoint {
  stage: 'Pre-Mission' | 'Early Mission' | 'Mid-Mission' | 'Extended Mission' | 'Return/Recovery';
  earthVal: number;
  projectedVal: number;
  actualVal?: number;
  estimatedMin: number;
  estimatedMax: number;
}

export interface SpaceProjectionParameter {
  parameterKey: string;
  name: string;
  category: HealthCategory;
  earthAvg: number;
  earthVariability: number;
  simulatedProjection: number;
  estimatedMin: number;
  estimatedMax: number;
  actualReading?: number;
  unit: string;
  confidence: 'High' | 'Moderate' | 'Low' | 'Insufficient';
  clinicalContext: string;
  timelineTrend: ProjectionTimelinePoint[];
}

export interface SpaceProjection {
  astronautId: string;
  missionPhase: 'pre_mission' | 'early_mission' | 'mid_mission' | 'extended_mission' | 'return_recovery';
  missionDurationDays: number;
  gravityEnvironment: 'microgravity' | 'lunar_gravity' | 'martian_gravity' | 'earth_normal';
  projectionPeriod: string;
  dataCompleteness: number;
  confidenceStatus: 'high' | 'moderate' | 'low' | 'insufficient';
  projections: Record<string, SpaceProjectionParameter>;
}

export interface MonitoringReading {
  id: string;
  organ: OrganKey;
  parameterKey: string;
  name: string;
  value: number | string;
  unit: string;
  timestamp: string;
  source: string;
  verificationStatus: 'verified' | 'unverified';
  earthBaselineAvg?: number;
  deviationPercent?: number;
  status: 'normal' | 'deviation' | 'critical' | 'missing';
  isSimulated: true;
}

export interface Alert {
  id: string;
  organ: OrganKey;
  parameter: string;
  currentValue: number;
  personalBaseline: number;
  difference: number;
  unit: string;
  time: string;
  duration: string;
  severity: 'normal' | 'unusual' | 'significant'; // Green, Yellow, Red
  dataQuality: string;
  notes: string;
}

export interface FiveHazard {
  id: string;
  key: 'radiation' | 'isolation' | 'distance' | 'gravity' | 'environment';
  title: string;
  subtitle: string;
  nasaUrl: string;
  description: string;
  primarySystems: string[];
  variables: string[];
  physiologicalImpact: string;
  operationalContext: string;
  currentStatus: string;
  statusColor: 'success' | 'warning' | 'critical';
}

export interface Astronaut {
  id: string;
  name: string;
  age: number;
  sex: 'male' | 'female';
  heightCm: number;
  massKg: number;
  anatomicalProfile: AnatomicalModelType;
  missionStatus: 'pre_mission' | 'in_flight' | 'lunar_orbit' | 'mars_transit' | 'post_mission';
  missionDays: number;
  missionName: string;
  baselineStatus: 'insufficient' | 'provisional' | 'validated';
  activeAlertsCount: number;
  lastUpdated: string;
  avatarUrl?: string;
  medicalHistorySummary?: string;
}
