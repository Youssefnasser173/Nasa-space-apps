import { OrganKey } from '../types';

export interface OrganDefinition {
  key: OrganKey;
  name: string;
  system: string;
  latinName: string;
  description: string;
  anatomicalColor: string; // Real biological tissue color as required by section 17
  glowColor: string;
  cameraPosition: [number, number, number];
  targetPosition: [number, number, number];
  defaultMonitoringStatus: 'Normal' | 'Observation' | 'Elevated Attention';
  criticalMetrics: string[];
}

export const ORGAN_DEFINITIONS: Record<OrganKey, OrganDefinition> = {
  brain: {
    key: 'brain',
    name: 'Brain & Central Nervous System',
    system: 'Neurological & Cognitive',
    latinName: 'Encephalon',
    description: 'Coordinates motor output, cognitive performance, executive functions, and autonomic regulation. Highly sensitive to intracranial fluid shifts (SANS) and cosmic radiation in deep space.',
    anatomicalColor: '#D8A4A4', // Pinkish-gray
    glowColor: '#8064D8',
    cameraPosition: [0, 0, 3.8],
    targetPosition: [0, 0, 0],
    defaultMonitoringStatus: 'Normal',
    criticalMetrics: ['Sleep Duration', 'Sleep Efficiency', 'Cognitive Speed', 'Reaction Time', 'Attention Index', 'Intracranial Fluid Metric']
  },
  heart: {
    key: 'heart',
    name: 'Heart & Cardiovascular System',
    system: 'Cardiovascular',
    latinName: 'Cor',
    description: 'Four-chambered muscular organ providing systemic and pulmonary perfusion. In microgravity, cephalad fluid shift leads to baroreceptor resetting, stroke volume changes, and myocardial deconditioning.',
    anatomicalColor: '#9E2424', // Deep red and burgundy
    glowColor: '#EE7068',
    cameraPosition: [0, 0, 3.6],
    targetPosition: [0, 0, 0],
    defaultMonitoringStatus: 'Normal',
    criticalMetrics: ['Resting Heart Rate', 'HRV (RMSSD)', 'Systolic BP', 'Diastolic BP', 'Cardiac Output', 'Vascular Tone']
  },
  'right-lung': {
    key: 'right-lung',
    name: 'Right Lung (Pulmonary)',
    system: 'Respiratory',
    latinName: 'Pulmo Dexter',
    description: 'Three-lobed primary respiratory organ ensuring alveolar gas exchange. Monitored for ventilation-perfusion matching, altered thoracic compliance in microgravity, and spacecraft particulate exposure.',
    anatomicalColor: '#E89088', // Salmon-pink
    glowColor: '#13A6A6',
    cameraPosition: [0, 0, 3.7],
    targetPosition: [0, 0, 0],
    defaultMonitoringStatus: 'Normal',
    criticalMetrics: ['SpO2 Oxygen Saturation', 'Respiratory Rate', 'FEV1 Pulmonary Flow', 'FVC Vital Capacity', 'Thoracic Compliance']
  },
  'left-lung': {
    key: 'left-lung',
    name: 'Left Lung (Pulmonary)',
    system: 'Respiratory',
    latinName: 'Pulmo Sinister',
    description: 'Two-lobed respiratory organ with cardiac notch providing pulmonary oxygenation and carbon dioxide clearance in closed-loop spacecraft cabin environments.',
    anatomicalColor: '#E89088', // Salmon-pink
    glowColor: '#13A6A6',
    cameraPosition: [0, 0, 3.7],
    targetPosition: [0, 0, 0],
    defaultMonitoringStatus: 'Normal',
    criticalMetrics: ['SpO2 Oxygen Saturation', 'Respiratory Rate', 'FEV1 Pulmonary Flow', 'FVC Vital Capacity', 'Alveolar Gas Exchange']
  },
  liver: {
    key: 'liver',
    name: 'Liver (Hepatic System)',
    system: 'Metabolic & Detoxification',
    latinName: 'Hepar',
    description: 'Largest internal gland responsible for hepatic metabolism, protein synthesis, glucose homeostasis, xenobiotic detoxification, and drug pharmacokinetics during long-duration flight.',
    anatomicalColor: '#8C3829', // Reddish-brown
    glowColor: '#E9A33B',
    cameraPosition: [0, 0, 3.8],
    targetPosition: [0, 0, 0],
    defaultMonitoringStatus: 'Normal',
    criticalMetrics: ['Alanine Aminotransferase (ALT)', 'Aspartate Aminotransferase (AST)', 'Total Bilirubin', 'Albumin', 'Hepatic Perfusion']
  },
  'right-kidney': {
    key: 'right-kidney',
    name: 'Right Kidney (Renal System)',
    system: 'Urinary & Fluid Homeostasis',
    latinName: 'Ren Dexter',
    description: 'Essential for fluid-electrolyte balance, erythropoietin secretion, systemic blood pressure regulation (RAAS), and monitoring spaceflight nephrolithiasis risk due to bone resorption.',
    anatomicalColor: '#782C22', // Natural reddish-brown
    glowColor: '#E9A33B',
    cameraPosition: [0, 0, 3.5],
    targetPosition: [0, 0, 0],
    defaultMonitoringStatus: 'Normal',
    criticalMetrics: ['Serum Creatinine', 'eGFR Filtration Rate', 'Urinary Calcium Excretion', 'Electrolyte Balance (Na/K)', 'Hydration Index']
  },
  'left-kidney': {
    key: 'left-kidney',
    name: 'Left Kidney (Renal System)',
    system: 'Urinary & Fluid Homeostasis',
    latinName: 'Ren Sinister',
    description: 'Regulates plasma osmolality, acid-base equilibrium, and filtration. Monitored for hypercalciuria and renal stone crystallization risk during microgravity skeleton unloading.',
    anatomicalColor: '#782C22', // Natural reddish-brown
    glowColor: '#E9A33B',
    cameraPosition: [0, 0, 3.5],
    targetPosition: [0, 0, 0],
    defaultMonitoringStatus: 'Normal',
    criticalMetrics: ['Serum Creatinine', 'eGFR Filtration Rate', 'Urinary Calcium Excretion', 'Electrolyte Balance (Na/K)', 'Hydration Index']
  },
  stomach: {
    key: 'stomach',
    name: 'Stomach & Upper GI',
    system: 'Gastrointestinal',
    latinName: 'Gaster',
    description: 'Primary muscular digestive reservoir. Susceptible to space motion sickness (SMS) during early neurovestibular adaptation and delayed gastric emptying.',
    anatomicalColor: '#E09890', // Muted pink
    glowColor: '#EE7068',
    cameraPosition: [0, 0, 3.6],
    targetPosition: [0, 0, 0],
    defaultMonitoringStatus: 'Normal',
    criticalMetrics: ['Gastric Motility Index', 'Appetite & Caloric Intake', 'Neurovestibular Adaptation', 'SMS Score']
  },
  intestines: {
    key: 'intestines',
    name: 'Intestines & Microbiome',
    system: 'Gastrointestinal & Mucosal Immunity',
    latinName: 'Intestinum',
    description: 'Small and large intestinal tracts providing nutrient absorption and mucosal immunity. Monitored for microbiome dysbiosis and altered barrier integrity under spaceflight stress.',
    anatomicalColor: '#E6A398', // Soft salmon-pink
    glowColor: '#159B73',
    cameraPosition: [0, 0, 3.8],
    targetPosition: [0, 0, 0],
    defaultMonitoringStatus: 'Normal',
    criticalMetrics: ['Microbial Diversity Index', 'Bowel Transit Time', 'Gut Barrier Integrity', 'Nutrient Absorption Rate']
  },
  musculoskeletal: {
    key: 'musculoskeletal',
    name: 'Musculoskeletal & Skeletal Framework',
    system: 'Structural & Locomotor',
    latinName: 'Systema Musculoskeletale',
    description: 'Load-bearing axial skeleton, trabecular bone matrix, and antigravity postural muscles (soleus, gastrocnemius, spinal erectors). Monitored for bone mineral density loss and muscle atrophy.',
    anatomicalColor: '#F3EFE0', // Ivory and cream skeleton with reddish muscle tone
    glowColor: '#377DFF',
    cameraPosition: [0, 0, 4.2],
    targetPosition: [0, 0, 0],
    defaultMonitoringStatus: 'Observation',
    criticalMetrics: ['DXA Bone Mineral Density (BMD)', 'Grip Strength', 'Isometric Peak Torque', 'Physical Endurance (VO2 max)', 'Postural Control']
  }
};
