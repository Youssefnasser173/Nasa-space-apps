import { HealthCategory } from '../types';

export interface ParameterMetadata {
  key: string;
  name: string;
  category: HealthCategory;
  unit: string;
  normalRange: [number, number];
  description: string;
  organKey?: string;
  isObjectiveMeasurement: boolean;
}

export const PARAMETER_REGISTRY: Record<string, ParameterMetadata> = {
  // Cardiovascular
  resting_heart_rate: {
    key: 'resting_heart_rate',
    name: 'Resting Heart Rate',
    category: 'cardiovascular',
    unit: 'bpm',
    normalRange: [50, 75],
    description: 'Average baseline resting heart rate during seated quiet rest on Earth.',
    organKey: 'heart',
    isObjectiveMeasurement: true
  },
  hrv_rmssd: {
    key: 'hrv_rmssd',
    name: 'Heart Rate Variability (RMSSD)',
    category: 'cardiovascular',
    unit: 'ms',
    normalRange: [40, 110],
    description: 'Root mean square of successive differences, reflecting parasympathetic autonomic cardiac modulation.',
    organKey: 'heart',
    isObjectiveMeasurement: true
  },
  bp_systolic: {
    key: 'bp_systolic',
    name: 'Systolic Blood Pressure',
    category: 'cardiovascular',
    unit: 'mmHg',
    normalRange: [100, 125],
    description: 'Peak aortic pressure during left ventricular contraction.',
    organKey: 'heart',
    isObjectiveMeasurement: true
  },
  bp_diastolic: {
    key: 'bp_diastolic',
    name: 'Diastolic Blood Pressure',
    category: 'cardiovascular',
    unit: 'mmHg',
    normalRange: [60, 80],
    description: 'Resting vascular pressure between myocardial contractions.',
    organKey: 'heart',
    isObjectiveMeasurement: true
  },
  activity_heart_rate: {
    key: 'activity_heart_rate',
    name: 'Activity-Related Heart Rate',
    category: 'cardiovascular',
    unit: 'bpm',
    normalRange: [110, 155],
    description: 'Mean cardiac frequency sustained during standard 75% VO2 max cycle/treadmill protocols.',
    organKey: 'heart',
    isObjectiveMeasurement: true
  },

  // Respiratory
  spo2: {
    key: 'spo2',
    name: 'Peripheral Oxygen Saturation (SpO2)',
    category: 'respiratory',
    unit: '%',
    normalRange: [96, 100],
    description: 'Pulse oximetry arterial hemoglobin oxygen saturation percentage.',
    organKey: 'right-lung',
    isObjectiveMeasurement: true
  },
  respiratory_rate: {
    key: 'respiratory_rate',
    name: 'Respiratory Rate',
    category: 'respiratory',
    unit: 'breaths/min',
    normalRange: [11, 16],
    description: 'Spontaneous resting ventilatory frequency.',
    organKey: 'left-lung',
    isObjectiveMeasurement: true
  },
  fev1: {
    key: 'fev1',
    name: 'Forced Expiratory Volume in 1 Second (FEV1)',
    category: 'respiratory',
    unit: 'L',
    normalRange: [3.2, 4.8],
    description: 'Volume of air forcefully exhaled in the first second of spirometry.',
    organKey: 'right-lung',
    isObjectiveMeasurement: true
  },
  fvc: {
    key: 'fvc',
    name: 'Forced Vital Capacity (FVC)',
    category: 'respiratory',
    unit: 'L',
    normalRange: [4.0, 5.8],
    description: 'Total volume of air forcefully exhaled after maximal inhalation.',
    organKey: 'left-lung',
    isObjectiveMeasurement: true
  },

  // Brain & Neurological
  sleep_duration: {
    key: 'sleep_duration',
    name: 'Sleep Duration',
    category: 'brain_neurological',
    unit: 'h',
    normalRange: [7.0, 8.5],
    description: 'Total objective sleep duration per 24-hour circadian period.',
    organKey: 'brain',
    isObjectiveMeasurement: true
  },
  sleep_quality: {
    key: 'sleep_quality',
    name: 'Sleep Quality Score',
    category: 'brain_neurological',
    unit: '%',
    normalRange: [80, 100],
    description: 'Composite sleep score assessing deep/REM percentages and awakening frequency.',
    organKey: 'brain',
    isObjectiveMeasurement: true
  },
  sleep_efficiency: {
    key: 'sleep_efficiency',
    name: 'Sleep Efficiency',
    category: 'brain_neurological',
    unit: '%',
    normalRange: [85, 96],
    description: 'Ratio of total time asleep compared to total time in bed.',
    organKey: 'brain',
    isObjectiveMeasurement: true
  },
  sleep_regularity: {
    key: 'sleep_regularity',
    name: 'Sleep Regularity Index (SRI)',
    category: 'brain_neurological',
    unit: 'index',
    normalRange: [75, 98],
    description: 'Measure of circadian schedule stability day-to-day.',
    organKey: 'brain',
    isObjectiveMeasurement: true
  },
  cognitive_performance: {
    key: 'cognitive_performance',
    name: 'Cognitive Throughput',
    category: 'brain_neurological',
    unit: 'pts',
    normalRange: [85, 100],
    description: 'Standardized Cognition battery test performance index score.',
    organKey: 'brain',
    isObjectiveMeasurement: true
  },
  reaction_time: {
    key: 'reaction_time',
    name: 'Psychomotor Vigilance Reaction Time',
    category: 'brain_neurological',
    unit: 'ms',
    normalRange: [190, 245],
    description: 'Mean reaction time on 10-minute PVT vigilance testing.',
    organKey: 'brain',
    isObjectiveMeasurement: true
  },

  // Musculoskeletal
  bone_density_bmd: {
    key: 'bone_density_bmd',
    name: 'Bone Mineral Density (DXA Spine L1-L4)',
    category: 'musculoskeletal',
    unit: 'g/cm²',
    normalRange: [1.05, 1.35],
    description: 'Dual-energy X-ray absorptiometry lumbar spine areal bone mineral density.',
    organKey: 'musculoskeletal',
    isObjectiveMeasurement: true
  },
  muscle_strength: {
    key: 'muscle_strength',
    name: 'Isometric Peak Grip Strength',
    category: 'musculoskeletal',
    unit: 'kg',
    normalRange: [42, 65],
    description: 'Maximal voluntary handgrip dynamometry contraction.',
    organKey: 'musculoskeletal',
    isObjectiveMeasurement: true
  },
  physical_endurance: {
    key: 'physical_endurance',
    name: 'Aerobic Endurance (VO2 Max)',
    category: 'musculoskeletal',
    unit: 'mL/kg/min',
    normalRange: [42, 58],
    description: 'Maximal oxygen consumption measured during standardized cycle ramp protocol.',
    organKey: 'musculoskeletal',
    isObjectiveMeasurement: true
  },
  mobility_score: {
    key: 'mobility_score',
    name: 'Functional Mobility Index',
    category: 'musculoskeletal',
    unit: 'pts',
    normalRange: [90, 100],
    description: 'Composite joint range of motion and functional movement screen score.',
    organKey: 'musculoskeletal',
    isObjectiveMeasurement: true
  },

  // Immune & Labs
  white_blood_cell_count: {
    key: 'white_blood_cell_count',
    name: 'White Blood Cell Count (WBC)',
    category: 'immune',
    unit: '×10⁹/L',
    normalRange: [4.5, 9.5],
    description: 'Total peripheral leukocyte count in whole blood.',
    organKey: 'musculoskeletal',
    isObjectiveMeasurement: true
  },
  absolute_lymphocyte_count: {
    key: 'absolute_lymphocyte_count',
    name: 'Absolute Lymphocyte Count',
    category: 'immune',
    unit: '×10⁹/L',
    normalRange: [1.2, 3.2],
    description: 'Total peripheral blood T, B, and NK lymphocyte count.',
    organKey: 'musculoskeletal',
    isObjectiveMeasurement: true
  },
  alt: {
    key: 'alt',
    name: 'Alanine Aminotransferase (ALT)',
    category: 'laboratory',
    unit: 'U/L',
    normalRange: [10, 45],
    description: 'Hepatospecific transaminase enzyme reflecting hepatocellular integrity.',
    organKey: 'liver',
    isObjectiveMeasurement: true
  },
  ast: {
    key: 'ast',
    name: 'Aspartate Aminotransferase (AST)',
    category: 'laboratory',
    unit: 'U/L',
    normalRange: [12, 38],
    description: 'Mitochondrial and cytoplasmic enzyme present in hepatocytes and cardiac myocytes.',
    organKey: 'liver',
    isObjectiveMeasurement: true
  },
  creatinine: {
    key: 'creatinine',
    name: 'Serum Creatinine',
    category: 'laboratory',
    unit: 'mg/dL',
    normalRange: [0.7, 1.2],
    description: 'Metabolic waste product filtered freely by renal glomeruli.',
    organKey: 'right-kidney',
    isObjectiveMeasurement: true
  },
  egfr: {
    key: 'egfr',
    name: 'Estimated Glomerular Filtration Rate (eGFR)',
    category: 'laboratory',
    unit: 'mL/min/1.73m²',
    normalRange: [90, 125],
    description: 'Calculated clearance estimating total functioning nephron filtration rate.',
    organKey: 'left-kidney',
    isObjectiveMeasurement: true
  },

  // Behavioral
  stress_score: {
    key: 'stress_score',
    name: 'Perceived Stress Assessment',
    category: 'behavioral',
    unit: '/10',
    normalRange: [1, 4],
    description: 'Daily visual analog scale perceived operational stress score.',
    organKey: 'brain',
    isObjectiveMeasurement: false
  },
  mood_valence: {
    key: 'mood_valence',
    name: 'Mood Valence & Stability',
    category: 'behavioral',
    unit: '/10',
    normalRange: [7, 10],
    description: 'Standardized psychological readiness and affective state assessment.',
    organKey: 'brain',
    isObjectiveMeasurement: false
  }
};
