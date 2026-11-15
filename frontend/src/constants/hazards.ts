import { FiveHazard } from '../types';

export const NASA_FIVE_HAZARDS: FiveHazard[] = [
  {
    id: 'hazard-1',
    key: 'radiation',
    title: 'Space Radiation',
    subtitle: 'Galactic Cosmic Rays (GCR) & Solar Particle Events (SPE)',
    nasaUrl: 'https://www.nasa.gov/hrp/hazard-space-radiation/',
    description: 'Beyond Earth’s protective magnetosphere and atmosphere, astronauts face acute and chronic ionizing radiation from trapped particles, SPEs, and GCRs consisting of high-energy protons and HZE nuclei.',
    primarySystems: ['Central Nervous System', 'Immune & Hematopoietic', 'Cardiovascular Endothelium', 'DNA Integrity'],
    variables: ['radiation_absorbed_dose', 'radiation_dose_equivalent', 'wbc', 'lymphocyte_count', 'dna_strand_breaks'],
    physiologicalImpact: 'Elevated lifetime excess cancer risk, accelerated vascular endothelial stiffening, potential neurocognitive deficits, acute radiation syndrome (SPE events), and immune cell apoptosis.',
    operationalContext: 'Requires active vehicle storm shelters, passive polyethylene/water shielding, personal dosimeters, real-time spaceweather monitoring, and mission-phase radiation budgeting.',
    currentStatus: 'Within mission nominal dosage threshold (< 0.5 mSv/day)',
    statusColor: 'success'
  },
  {
    id: 'hazard-2',
    key: 'isolation',
    title: 'Isolation and Confinement',
    subtitle: 'Psychosocial Stress, Circadian Disruption & Small Team Dynamics',
    nasaUrl: 'https://www.nasa.gov/hrp/hazard-isolation-and-confinement/',
    description: 'Extended stays in confined living volumes with fixed crews, away from family and familiar sensory inputs, disrupt sleep-wake cycles and elevate psychological tension over time.',
    primarySystems: ['Brain & Behavioral Health', 'Neuroendocrine (Cortisol)', 'Sleep Architecture', 'Team Cohesion'],
    variables: ['sleep_total_h', 'sleep_efficiency', 'circadian_phase_delay', 'electrodermal_activity', 'cognitive_speed', 'mood_valence'],
    physiologicalImpact: 'Circadian desynchrony, chronic sleep debt, reduced alertness, mood disturbances, changes in autonomic tone (elevated resting sympathetic tone), and interpersonal conflict.',
    operationalContext: 'Mitigated by dynamic lighting schedules (460nm blue-enriched circadian morning lighting), scheduled Earth communication, private crew quarters, and routine objective cognitive checks.',
    currentStatus: 'Circadian phase locked; sleep efficiency 84%',
    statusColor: 'success'
  },
  {
    id: 'hazard-3',
    key: 'distance',
    title: 'Distance from Earth',
    subtitle: 'Communication Delays, Remote Autonomy & Resource Constraints',
    nasaUrl: 'https://www.nasa.gov/hrp/hazard-distance-from-earth/',
    description: 'As exploration missions journey beyond LEO toward the Moon (1.3 light-seconds) and Mars (up to 22 minutes one-way), immediate medical evacuation and real-time mission control guidance become physically impossible.',
    primarySystems: ['Clinical Decision Support', 'Emergency Medical Readiness', 'Autonomous Monitoring', 'Pharmaceutical Shelf-Life'],
    variables: ['comms_latency_sec', 'onboard_medical_inventory', 'diagnostic_confidence_index', 'autonomous_resolution_rate'],
    physiologicalImpact: 'Psychological burden of remote self-reliance; heightened severity of acute medical events due to absence of definitive surgical/intensive care infrastructure.',
    operationalContext: 'Demands autonomous onboard health intelligence platforms like NORELIS capable of offline baseline anomaly detection, algorithmic triage, and self-guided countermeasure protocols.',
    currentStatus: 'Simulated round-trip latency: 4.8 seconds (Cislunar gateway reference)',
    statusColor: 'warning'
  },
  {
    id: 'hazard-4',
    key: 'gravity',
    title: 'Gravity Fields',
    subtitle: 'Microgravity, Lunar (1/6g), Martian (3/8g) & Hyper-G Transitions',
    nasaUrl: 'https://www.nasa.gov/hrp/hazard-gravity-fields/',
    description: 'Shifting between 1g on Earth, weightlessness in transit, and partial gravity on celestial bodies causes profound fluid redistribution, sensorimotor discordance, and musculoskeletal unloading.',
    primarySystems: ['Cardiovascular Hemodynamics', 'Musculoskeletal Skeleton & Muscles', 'Neurovestibular', 'Fluid Distribution'],
    variables: ['bone_density_bmd', 'grip_strength', 'resting_heart_rate', 'bp_systolic', 'bp_diastolic', 'plasma_volume_reduction'],
    physiologicalImpact: 'Immediate cephalad fluid shift, space motion sickness (first 48-72h), progressive bone mineral density loss (approx. 1% per month in trabecular bone), antigravity muscle fiber atrophy, post-flight orthostatic intolerance.',
    operationalContext: 'Daily 2-hour countermeasure regimen (ARED resistive exercise, T2 treadmill, cycle ergometer), lower-body negative pressure (LBNP), and dietary sodium/protein monitoring.',
    currentStatus: 'Exercise compliance: 98.2%; BMD preservation on trajectory',
    statusColor: 'warning'
  },
  {
    id: 'hazard-5',
    key: 'environment',
    title: 'Hostile / Closed Environments',
    subtitle: 'Habitability, Toxicants, Acoustics, Microbiome & Atmospheric Quality',
    nasaUrl: 'https://www.nasa.gov/hrp/hazard-hostile-closed-environments/',
    description: 'Spacecraft are closed ecological systems where every breath, droplet, and surface must be artificially conditioned, scrubbed, and filtered without natural atmospheric dilution.',
    primarySystems: ['Respiratory Mucosa', 'Skin & Barrier Integrity', 'Auditory System', 'Microbial Flora'],
    variables: ['pp_co2_mmhg', 'cabin_pressure_psi', 'particulate_matter_pm25', 'acoustic_noise_db', 'skin_temp', 'wbc'],
    physiologicalImpact: 'Elevated cabin CO2 (risk of hypercapnic headaches above 3 mmHg), dry mucous membranes, altered immune responsiveness, airborne particulate irritation, and bacterial virulence shifts in microgravity.',
    operationalContext: 'Continuous environmental scrubbers, trace contaminant control, HEPA filtration, acoustic dampeners, weekly antimicrobial surface wipe-downs, and potable water testing.',
    currentStatus: 'Cabin CO2: 2.1 mmHg (Nominal); Acoustic level: 56 dBA',
    statusColor: 'success'
  }
];
