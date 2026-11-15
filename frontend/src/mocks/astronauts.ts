import { Astronaut } from '../types';

export const MOCK_ASTRONAUTS: Astronaut[] = [
  {
    id: 'AG-001',
    name: 'Dr. Sarah Chen',
    age: 38,
    sex: 'female',
    heightCm: 168,
    massKg: 62,
    anatomicalProfile: 'female',
    missionStatus: 'in_flight',
    missionDays: 45,
    missionName: 'Artemis IV Lunar Surface Habitat',
    baselineStatus: 'validated',
    activeAlertsCount: 2,
    lastUpdated: '2026-11-15T13:45:00Z',
    medicalHistorySummary: 'Endurance triathlete; no prior cardiovascular, respiratory, or chronic metabolic diagnoses. Baseline established over 180 pre-flight monitoring days.'
  },
  {
    id: 'AG-002',
    name: 'Col. Marcus Vance',
    age: 45,
    sex: 'male',
    heightCm: 182,
    massKg: 86,
    anatomicalProfile: 'male',
    missionStatus: 'in_flight',
    missionDays: 62,
    missionName: 'Gateway Deep Space Logistics',
    baselineStatus: 'validated',
    activeAlertsCount: 1,
    lastUpdated: '2026-11-15T14:10:00Z',
    medicalHistorySummary: 'Prior military test pilot; mild seasonal rhinitis (asymptomatic in cabin); arthroscopic right knee meniscectomy (2019, fully rehabilitated). Baseline verified.'
  },
  {
    id: 'AG-003',
    name: 'Dr. Leo Kovacs',
    age: 41,
    sex: 'male',
    heightCm: 175,
    massKg: 74,
    anatomicalProfile: 'male',
    missionStatus: 'pre_mission',
    missionDays: 0,
    missionName: 'Mars Transit Habitat Phase II Simulation',
    baselineStatus: 'provisional',
    activeAlertsCount: 0,
    lastUpdated: '2026-11-15T10:30:00Z',
    medicalHistorySummary: 'Astrophysicist specialist; pre-flight baseline data collection active (day 42 of 90). Provisional baseline generated from 42 objective days.'
  }
];
