import React, { createContext, useContext, useState } from 'react';
import {
  HealthAssessment,
  HealthParameter,
  UploadedDocument,
  EarthBaseline,
  SpaceProjection,
  Alert,
  MonitoringReading,
  OrganKey,
  HealthCategory
} from '../types';
import { MOCK_EARTH_BASELINES } from '../mocks/baselines';
import { MOCK_SPACE_PROJECTIONS } from '../mocks/projections';
import { MOCK_ALERTS, MOCK_MONITORING_READINGS } from '../mocks/alerts';
import { PARAMETER_REGISTRY } from '../constants/parameters';
import { extractDocumentText, parseHealthDataFromText } from '../features/health-assessment/upload/DocumentExtractor';

interface CategoryStatus {
  category: HealthCategory;
  name: string;
  status: 'available' | 'partially_available' | 'missing';
  availableCount: number;
  totalExpected: number;
}

interface HealthContextType {
  activeAssessment: HealthAssessment;
  setAssessmentMethod: (method: 'upload' | 'manual' | 'combined') => void;
  updatePersonalInfo: (info: Partial<HealthAssessment['personalInformation']>) => void;
  updateMedicalHistory: (history: Partial<HealthAssessment['medicalHistory']>) => void;
  uploadDocumentFile: (file: File) => Promise<{ success: boolean; extractedCount: number; error?: string }>;
  removeUploadedDocument: (docId: string) => void;
  updateParameter: (paramId: string, updates: Partial<HealthParameter>) => void;
  addManualParameter: (param: Omit<HealthParameter, 'id'>) => void;
  removeParameter: (paramId: string) => void;
  getMissingCategories: () => CategoryStatus[];
  calculateCompleteness: () => number;
  resetAssessment: () => void;
  
  // Baselines and monitoring
  earthBaselines: Record<string, EarthBaseline>;
  spaceProjections: Record<string, SpaceProjection>;
  alerts: Alert[];
  monitoringReadings: MonitoringReading[];
  getOrganReadings: (organ: OrganKey) => MonitoringReading[];
  getOrganBaseline: (astronautId: string, organ: OrganKey) => HealthParameter[];
  getOrganAlerts: (organ: OrganKey) => Alert[];
}

const defaultInitialAssessment: HealthAssessment = {
  assessmentMethod: 'manual',
  personalInformation: {
    fullName: '',
    dob: '',
    age: 35,
    biologicalSex: 'female',
    heightCm: 170,
    weightKg: 65,
    missionStatus: 'pre_mission',
    nationality: 'United States'
  },
  medicalHistory: {
    cardiovascularHistory: 'None reported',
    respiratoryHistory: 'None reported',
    neurologicalHistory: 'None reported',
    previousSurgeries: 'None',
    allergies: 'No known drug allergies (NKDA)',
    currentMedications: 'None',
    chronicConditions: 'None',
    previousInjuries: 'None'
  },
  parameters: [],
  uploadedDocuments: [],
  completeness: 0,
  createdAt: new Date().toISOString()
};

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeAssessment, setActiveAssessment] = useState<HealthAssessment>(() => {
    try {
      const stored = sessionStorage.getItem('norelis_assessment');
      return stored ? JSON.parse(stored) : defaultInitialAssessment;
    } catch {
      return defaultInitialAssessment;
    }
  });

  const [earthBaselines] = useState<Record<string, EarthBaseline>>(MOCK_EARTH_BASELINES);
  const [spaceProjections] = useState<Record<string, SpaceProjection>>(MOCK_SPACE_PROJECTIONS);
  const [alerts] = useState<Alert[]>(MOCK_ALERTS);
  const [monitoringReadings] = useState<MonitoringReading[]>(MOCK_MONITORING_READINGS);

  const saveAssessment = (updated: HealthAssessment) => {
    setActiveAssessment(updated);
    sessionStorage.setItem('norelis_assessment', JSON.stringify(updated));
  };

  const setAssessmentMethod = (method: 'upload' | 'manual' | 'combined') => {
    saveAssessment({ ...activeAssessment, assessmentMethod: method });
  };

  const updatePersonalInfo = (info: Partial<HealthAssessment['personalInformation']>) => {
    saveAssessment({
      ...activeAssessment,
      personalInformation: { ...activeAssessment.personalInformation, ...info }
    });
  };

  const updateMedicalHistory = (history: Partial<HealthAssessment['medicalHistory']>) => {
    saveAssessment({
      ...activeAssessment,
      medicalHistory: { ...activeAssessment.medicalHistory, ...history }
    });
  };

  const uploadDocumentFile = async (file: File): Promise<{ success: boolean; extractedCount: number; error?: string }> => {
    const docId = `doc-${Date.now()}`;
    const newDoc: UploadedDocument = {
      id: docId,
      name: file.name,
      type: file.type || file.name.split('.').pop() || 'unknown',
      size: file.size,
      uploadedAt: new Date().toISOString(),
      status: 'processing',
      extractedFieldCount: 0
    };

    // Add document in processing state
    const currentDocs = [...activeAssessment.uploadedDocuments, newDoc];
    saveAssessment({ ...activeAssessment, uploadedDocuments: currentDocs });

    try {
      const text = await extractDocumentText(file);
      const parsed = parseHealthDataFromText(text, file.name);

      // Handle conflicting parameters
      const mergedParams = [...activeAssessment.parameters];
      parsed.parameters.forEach(newP => {
        const existingIdx = mergedParams.findIndex(p => p.key === newP.key);
        if (existingIdx >= 0) {
          const existing = mergedParams[existingIdx];
          if (existing.value !== newP.value) {
            // Keep both as conflicting verification
            const conflicts = existing.conflictingValues || [];
            conflicts.push({
              value: newP.value as any,
              sourceDocument: newP.sourceDocument || file.name,
              measuredAt: newP.measuredAt || new Date().toISOString().split('T')[0]
            });
            mergedParams[existingIdx] = {
              ...existing,
              conflictingValues: conflicts
            };
          }
        } else {
          mergedParams.push(newP);
        }
      });

      // Update doc entry
      const updatedDocs = currentDocs.map(d =>
        d.id === docId
          ? { ...d, status: 'extracted' as const, extractedFieldCount: parsed.extractedCount, rawText: text }
          : d
      );

      // Merge personal info if provided
      const updatedPersonalInfo = {
        ...activeAssessment.personalInformation,
        ...(parsed.personalInfo.fullName ? { fullName: parsed.personalInfo.fullName } : {}),
        ...(parsed.personalInfo.age ? { age: parsed.personalInfo.age } : {}),
        ...(parsed.personalInfo.biologicalSex ? { biologicalSex: parsed.personalInfo.biologicalSex } : {}),
        ...(parsed.personalInfo.heightCm ? { heightCm: parsed.personalInfo.heightCm } : {}),
        ...(parsed.personalInfo.weightKg ? { weightKg: parsed.personalInfo.weightKg } : {})
      };

      const finalAssessment: HealthAssessment = {
        ...activeAssessment,
        parameters: mergedParams,
        uploadedDocuments: updatedDocs,
        personalInformation: updatedPersonalInfo,
        completeness: calculateCompletenessFromData(updatedPersonalInfo, mergedParams)
      };

      saveAssessment(finalAssessment);
      return { success: true, extractedCount: parsed.extractedCount };
    } catch (err: any) {
      const errorDocs = currentDocs.map(d =>
        d.id === docId
          ? { ...d, status: 'error' as const, error: err.message || 'Extraction failed' }
          : d
      );
      saveAssessment({ ...activeAssessment, uploadedDocuments: errorDocs });
      return { success: false, extractedCount: 0, error: err.message };
    }
  };

  const removeUploadedDocument = (docId: string) => {
    const doc = activeAssessment.uploadedDocuments.find(d => d.id === docId);
    if (!doc) return;
    const remainingDocs = activeAssessment.uploadedDocuments.filter(d => d.id !== docId);
    const remainingParams = activeAssessment.parameters.filter(p => p.sourceDocument !== doc.name);
    saveAssessment({
      ...activeAssessment,
      uploadedDocuments: remainingDocs,
      parameters: remainingParams
    });
  };

  const updateParameter = (paramId: string, updates: Partial<HealthParameter>) => {
    const updatedParams = activeAssessment.parameters.map(p =>
      p.id === paramId ? { ...p, ...updates } : p
    );
    saveAssessment({
      ...activeAssessment,
      parameters: updatedParams,
      completeness: calculateCompletenessFromData(activeAssessment.personalInformation, updatedParams)
    });
  };

  const addManualParameter = (param: Omit<HealthParameter, 'id'>) => {
    const id = `param-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newParam: HealthParameter = { ...param, id };
    const updatedParams = [...activeAssessment.parameters, newParam];
    saveAssessment({
      ...activeAssessment,
      parameters: updatedParams,
      completeness: calculateCompletenessFromData(activeAssessment.personalInformation, updatedParams)
    });
  };

  const removeParameter = (paramId: string) => {
    const updatedParams = activeAssessment.parameters.filter(p => p.id !== paramId);
    saveAssessment({
      ...activeAssessment,
      parameters: updatedParams,
      completeness: calculateCompletenessFromData(activeAssessment.personalInformation, updatedParams)
    });
  };

  const getMissingCategories = (): CategoryStatus[] => {
    const categories: { cat: HealthCategory; name: string; keys: string[] }[] = [
      { cat: 'cardiovascular', name: 'Cardiovascular System', keys: ['resting_heart_rate', 'hrv_rmssd', 'bp_systolic', 'bp_diastolic'] },
      { cat: 'respiratory', name: 'Respiratory System', keys: ['spo2', 'respiratory_rate', 'fev1'] },
      { cat: 'brain_neurological', name: 'Brain & Neurological', keys: ['sleep_duration', 'sleep_efficiency', 'cognitive_performance'] },
      { cat: 'musculoskeletal', name: 'Musculoskeletal', keys: ['bone_density_bmd', 'muscle_strength', 'physical_endurance'] },
      { cat: 'immune', name: 'Immune & Hematology', keys: ['white_blood_cell_count', 'absolute_lymphocyte_count'] },
      { cat: 'behavioral', name: 'Behavioral Health', keys: ['stress_score', 'mood_valence'] },
      { cat: 'laboratory', name: 'Laboratory & Metabolic', keys: ['alt', 'creatinine'] }
    ];

    return categories.map(c => {
      const existingInCat = activeAssessment.parameters.filter(p => p.category === c.cat && p.value !== null);
      let status: 'available' | 'partially_available' | 'missing' = 'missing';
      if (existingInCat.length >= c.keys.length) {
        status = 'available';
      } else if (existingInCat.length > 0) {
        status = 'partially_available';
      }
      return {
        category: c.cat,
        name: c.name,
        status,
        availableCount: existingInCat.length,
        totalExpected: c.keys.length
      };
    });
  };

  const calculateCompletenessFromData = (
    personal: HealthAssessment['personalInformation'],
    params: HealthParameter[]
  ): number => {
    let score = 0;
    if (personal.fullName) score += 15;
    if (personal.age && personal.heightCm && personal.weightKg) score += 15;
    const availableParamsCount = params.filter(p => p.value !== null).length;
    score += Math.min(70, Math.round((availableParamsCount / 14) * 70));
    return Math.min(100, score);
  };

  const calculateCompleteness = () => {
    return calculateCompletenessFromData(activeAssessment.personalInformation, activeAssessment.parameters);
  };

  const resetAssessment = () => {
    saveAssessment(defaultInitialAssessment);
  };

  const getOrganReadings = (organ: OrganKey): MonitoringReading[] => {
    return monitoringReadings.filter(r => r.organ === organ);
  };

  const getOrganBaseline = (astronautId: string, organ: OrganKey): HealthParameter[] => {
    const base = earthBaselines[astronautId] || earthBaselines['AG-001'];
    if (!base) return [];
    return Object.values(base.parameters)
      .filter(p => {
        const meta = PARAMETER_REGISTRY[p.parameterKey];
        return meta && meta.organKey === organ;
      })
      .map(p => ({
        id: p.parameterKey,
        key: p.parameterKey,
        name: p.name,
        category: p.category,
        value: p.personalAvg,
        unit: p.unit,
        measuredAt: p.lastMeasurement,
        source: 'device',
        verificationStatus: 'verified',
        availability: 'available'
      }));
  };

  const getOrganAlerts = (organ: OrganKey): Alert[] => {
    return alerts.filter(a => a.organ === organ);
  };

  return (
    <HealthContext.Provider
      value={{
        activeAssessment,
        setAssessmentMethod,
        updatePersonalInfo,
        updateMedicalHistory,
        uploadDocumentFile,
        removeUploadedDocument,
        updateParameter,
        addManualParameter,
        removeParameter,
        getMissingCategories,
        calculateCompleteness,
        resetAssessment,
        earthBaselines,
        spaceProjections,
        alerts,
        monitoringReadings,
        getOrganReadings,
        getOrganBaseline,
        getOrganAlerts
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};
