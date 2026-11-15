import { SpaceProjection } from '../types';

export const MOCK_SPACE_PROJECTIONS: Record<string, SpaceProjection> = {
  'AG-001': {
    astronautId: 'AG-001',
    missionPhase: 'early_mission',
    missionDurationDays: 45,
    gravityEnvironment: 'lunar_gravity',
    projectionPeriod: 'Mission Days 1 to 180 Projected Window',
    dataCompleteness: 94.2,
    confidenceStatus: 'high',
    projections: {
      resting_heart_rate: {
        parameterKey: 'resting_heart_rate',
        name: 'Resting Heart Rate',
        category: 'cardiovascular',
        earthAvg: 58.4,
        earthVariability: 3.2,
        simulatedProjection: 63.8,
        estimatedMin: 59.0,
        estimatedMax: 68.5,
        actualReading: 62.7,
        unit: 'bpm',
        confidence: 'High',
        clinicalContext: 'Cephalad fluid redistribution and sympathetic resetting typically elevate resting heart rate during early microgravity and partial g transition by 4-8 bpm.',
        timelineTrend: [
          { stage: 'Pre-Mission', earthVal: 58.4, projectedVal: 58.4, actualVal: 58.4, estimatedMin: 55.2, estimatedMax: 61.6 },
          { stage: 'Early Mission', earthVal: 58.4, projectedVal: 63.8, actualVal: 62.7, estimatedMin: 59.0, estimatedMax: 68.5 },
          { stage: 'Mid-Mission', earthVal: 58.4, projectedVal: 62.0, actualVal: undefined, estimatedMin: 57.5, estimatedMax: 66.5 },
          { stage: 'Extended Mission', earthVal: 58.4, projectedVal: 61.2, actualVal: undefined, estimatedMin: 56.8, estimatedMax: 65.5 },
          { stage: 'Return/Recovery', earthVal: 58.4, projectedVal: 66.5, actualVal: undefined, estimatedMin: 61.0, estimatedMax: 73.0 }
        ]
      },
      hrv_rmssd: {
        parameterKey: 'hrv_rmssd',
        name: 'HRV (RMSSD)',
        category: 'cardiovascular',
        earthAvg: 68.2,
        earthVariability: 6.8,
        simulatedProjection: 56.4,
        estimatedMin: 48.0,
        estimatedMax: 65.0,
        actualReading: 54.2,
        unit: 'ms',
        confidence: 'High',
        clinicalContext: 'Vagal tone reduction commonly occurs under environmental stressors and altered baroreceptor inputs, yielding moderate parasympathetic withdrawal.',
        timelineTrend: [
          { stage: 'Pre-Mission', earthVal: 68.2, projectedVal: 68.2, actualVal: 68.2, estimatedMin: 61.4, estimatedMax: 75.0 },
          { stage: 'Early Mission', earthVal: 68.2, projectedVal: 56.4, actualVal: 54.2, estimatedMin: 48.0, estimatedMax: 65.0 },
          { stage: 'Mid-Mission', earthVal: 68.2, projectedVal: 59.0, actualVal: undefined, estimatedMin: 51.0, estimatedMax: 67.0 },
          { stage: 'Extended Mission', earthVal: 68.2, projectedVal: 60.5, actualVal: undefined, estimatedMin: 52.0, estimatedMax: 68.0 },
          { stage: 'Return/Recovery', earthVal: 68.2, projectedVal: 52.0, actualVal: undefined, estimatedMin: 44.0, estimatedMax: 61.0 }
        ]
      },
      bp_systolic: {
        parameterKey: 'bp_systolic',
        name: 'Systolic Blood Pressure',
        category: 'cardiovascular',
        earthAvg: 112.5,
        earthVariability: 4.1,
        simulatedProjection: 118.2,
        estimatedMin: 111.0,
        estimatedMax: 125.0,
        actualReading: 119.5,
        unit: 'mmHg',
        confidence: 'Moderate',
        clinicalContext: 'Central aortic pressure shows initial transient elevation as venous volume shifts cephalad, stabilizing after plasma volume contracture.',
        timelineTrend: [
          { stage: 'Pre-Mission', earthVal: 112.5, projectedVal: 112.5, actualVal: 112.5, estimatedMin: 108.4, estimatedMax: 116.6 },
          { stage: 'Early Mission', earthVal: 112.5, projectedVal: 118.2, actualVal: 119.5, estimatedMin: 111.0, estimatedMax: 125.0 },
          { stage: 'Mid-Mission', earthVal: 112.5, projectedVal: 114.0, actualVal: undefined, estimatedMin: 108.0, estimatedMax: 120.0 },
          { stage: 'Extended Mission', earthVal: 112.5, projectedVal: 113.5, actualVal: undefined, estimatedMin: 107.0, estimatedMax: 119.0 },
          { stage: 'Return/Recovery', earthVal: 112.5, projectedVal: 108.0, actualVal: undefined, estimatedMin: 98.0, estimatedMax: 118.0 }
        ]
      },
      spo2: {
        parameterKey: 'spo2',
        name: 'Peripheral SpO2',
        category: 'respiratory',
        earthAvg: 98.7,
        earthVariability: 0.6,
        simulatedProjection: 97.8,
        estimatedMin: 96.5,
        estimatedMax: 99.0,
        actualReading: 98.1,
        unit: '%',
        confidence: 'High',
        clinicalContext: 'Hypobaric cabin atmosphere (10.2 psi, 26.5% O2) designed to support lunar EVA preparation maintains alveolar pO2 with slight expected arterial variation.',
        timelineTrend: [
          { stage: 'Pre-Mission', earthVal: 98.7, projectedVal: 98.7, actualVal: 98.7, estimatedMin: 98.1, estimatedMax: 99.3 },
          { stage: 'Early Mission', earthVal: 98.7, projectedVal: 97.8, actualVal: 98.1, estimatedMin: 96.5, estimatedMax: 99.0 },
          { stage: 'Mid-Mission', earthVal: 98.7, projectedVal: 97.9, actualVal: undefined, estimatedMin: 96.8, estimatedMax: 99.1 },
          { stage: 'Extended Mission', earthVal: 98.7, projectedVal: 98.0, actualVal: undefined, estimatedMin: 97.0, estimatedMax: 99.2 },
          { stage: 'Return/Recovery', earthVal: 98.7, projectedVal: 98.6, actualVal: undefined, estimatedMin: 97.8, estimatedMax: 99.4 }
        ]
      },
      sleep_duration: {
        parameterKey: 'sleep_duration',
        name: 'Sleep Duration',
        category: 'brain_neurological',
        earthAvg: 7.6,
        earthVariability: 0.5,
        simulatedProjection: 6.7,
        estimatedMin: 5.8,
        estimatedMax: 7.4,
        actualReading: 6.4,
        unit: 'h',
        confidence: 'High',
        clinicalContext: 'Spaceflight environmental noise, confinement, and sleep station microgravity restraints typically reduce total sleep time by 45 to 60 minutes.',
        timelineTrend: [
          { stage: 'Pre-Mission', earthVal: 7.6, projectedVal: 7.6, actualVal: 7.6, estimatedMin: 7.1, estimatedMax: 8.1 },
          { stage: 'Early Mission', earthVal: 7.6, projectedVal: 6.7, actualVal: 6.4, estimatedMin: 5.8, estimatedMax: 7.4 },
          { stage: 'Mid-Mission', earthVal: 7.6, projectedVal: 6.9, actualVal: undefined, estimatedMin: 6.1, estimatedMax: 7.6 },
          { stage: 'Extended Mission', earthVal: 7.6, projectedVal: 7.0, actualVal: undefined, estimatedMin: 6.2, estimatedMax: 7.7 },
          { stage: 'Return/Recovery', earthVal: 7.6, projectedVal: 8.2, actualVal: undefined, estimatedMin: 7.4, estimatedMax: 9.1 }
        ]
      },
      bone_density_bmd: {
        parameterKey: 'bone_density_bmd',
        name: 'DXA Spine BMD',
        category: 'musculoskeletal',
        earthAvg: 1.185,
        earthVariability: 0.012,
        simulatedProjection: 1.155,
        estimatedMin: 1.135,
        estimatedMax: 1.172,
        actualReading: 1.162,
        unit: 'g/cm²',
        confidence: 'Moderate',
        clinicalContext: 'Without 1g axial gravity, trabecular bone undergoes osteoclast-mediated demineralization at approx 0.8-1.2% per month despite resistive countermeasures.',
        timelineTrend: [
          { stage: 'Pre-Mission', earthVal: 1.185, projectedVal: 1.185, actualVal: 1.185, estimatedMin: 1.173, estimatedMax: 1.197 },
          { stage: 'Early Mission', earthVal: 1.185, projectedVal: 1.170, actualVal: 1.162, estimatedMin: 1.155, estimatedMax: 1.182 },
          { stage: 'Mid-Mission', earthVal: 1.185, projectedVal: 1.155, actualVal: undefined, estimatedMin: 1.135, estimatedMax: 1.172 },
          { stage: 'Extended Mission', earthVal: 1.185, projectedVal: 1.138, actualVal: undefined, estimatedMin: 1.115, estimatedMax: 1.158 },
          { stage: 'Return/Recovery', earthVal: 1.185, projectedVal: 1.150, actualVal: undefined, estimatedMin: 1.125, estimatedMax: 1.170 }
        ]
      },
      muscle_strength: {
        parameterKey: 'muscle_strength',
        name: 'Peak Grip Strength',
        category: 'musculoskeletal',
        earthAvg: 48.6,
        earthVariability: 2.1,
        simulatedProjection: 45.2,
        estimatedMin: 41.5,
        estimatedMax: 48.0,
        actualReading: 46.1,
        unit: 'kg',
        confidence: 'Moderate',
        clinicalContext: 'ARED resistive protocols preserve grip and upper extremity mass well; slight transient drop relates to operational hand fatigue during glove operations.',
        timelineTrend: [
          { stage: 'Pre-Mission', earthVal: 48.6, projectedVal: 48.6, actualVal: 48.6, estimatedMin: 46.5, estimatedMax: 50.7 },
          { stage: 'Early Mission', earthVal: 48.6, projectedVal: 45.2, actualVal: 46.1, estimatedMin: 41.5, estimatedMax: 48.0 },
          { stage: 'Mid-Mission', earthVal: 48.6, projectedVal: 46.0, actualVal: undefined, estimatedMin: 42.8, estimatedMax: 49.0 },
          { stage: 'Extended Mission', earthVal: 48.6, projectedVal: 46.5, actualVal: undefined, estimatedMin: 43.0, estimatedMax: 49.5 },
          { stage: 'Return/Recovery', earthVal: 48.6, projectedVal: 44.0, actualVal: undefined, estimatedMin: 40.0, estimatedMax: 47.5 }
        ]
      }
    }
  },
  'AG-002': {
    astronautId: 'AG-002',
    missionPhase: 'early_mission',
    missionDurationDays: 62,
    gravityEnvironment: 'microgravity',
    projectionPeriod: 'Gateway Microgravity Flight Window',
    dataCompleteness: 92.0,
    confidenceStatus: 'high',
    projections: {
      resting_heart_rate: {
        parameterKey: 'resting_heart_rate',
        name: 'Resting Heart Rate',
        category: 'cardiovascular',
        earthAvg: 62.1,
        earthVariability: 3.8,
        simulatedProjection: 67.5,
        estimatedMin: 62.0,
        estimatedMax: 73.0,
        actualReading: 66.8,
        unit: 'bpm',
        confidence: 'High',
        clinicalContext: 'Microgravity neurohumoral resetting shifts baseline upward.',
        timelineTrend: [
          { stage: 'Pre-Mission', earthVal: 62.1, projectedVal: 62.1, actualVal: 62.1, estimatedMin: 58.3, estimatedMax: 65.9 },
          { stage: 'Early Mission', earthVal: 62.1, projectedVal: 67.5, actualVal: 66.8, estimatedMin: 62.0, estimatedMax: 73.0 },
          { stage: 'Mid-Mission', earthVal: 62.1, projectedVal: 65.0, actualVal: undefined, estimatedMin: 60.0, estimatedMax: 70.0 },
          { stage: 'Extended Mission', earthVal: 62.1, projectedVal: 64.2, actualVal: undefined, estimatedMin: 59.0, estimatedMax: 69.0 },
          { stage: 'Return/Recovery', earthVal: 62.1, projectedVal: 71.0, actualVal: undefined, estimatedMin: 65.0, estimatedMax: 78.0 }
        ]
      }
    }
  },
  'AG-003': {
    astronautId: 'AG-003',
    missionPhase: 'pre_mission',
    missionDurationDays: 0,
    gravityEnvironment: 'earth_normal',
    projectionPeriod: 'Pre-Mission Assessment Phase',
    dataCompleteness: 48.0,
    confidenceStatus: 'insufficient',
    projections: {}
  }
};
