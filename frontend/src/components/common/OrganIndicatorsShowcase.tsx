import React, { useState, useEffect } from 'react';
import {
  Activity,
  Maximize2,
  RotateCcw,
  Calendar,
  User,
  Clock,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck,
  Heart,
  Thermometer,
  Wind,
  CheckCircle2,
  AlertCircle,
  Eye
} from 'lucide-react';
import {
  RealisticLungsGraphic,
  RealisticBrainGraphic,
  RealisticHeartGraphic
} from './RealisticOrganGraphics';

export type OrganTab = 'lungs' | 'brain' | 'heart';

interface OrganIndicatorsShowcaseProps {
  compact?: boolean; // For login page split screen
  onExploreMore?: () => void;
}

interface HotspotDetail {
  title: string;
  reading: string;
  baseline: string;
  tolerance: string;
  description: string;
}

const HOTSPOT_DATA: Record<OrganTab, Record<string, HotspotDetail>> = {
  lungs: {
    trachea: {
      title: 'Carina & Main Tracheal Tree',
      reading: '1.2 cmH₂O/L/s Resistance',
      baseline: '1.18 cmH₂O/L/s (Earth Mean)',
      tolerance: 'Normal Range (1.0 - 1.8)',
      description: 'Laminar airway dynamics calibrated to normal atmospheric pressure and ambient humidity.'
    },
    right_lobe: {
      title: 'Right Superior Lobe',
      reading: '0.84 V/Q Ratio',
      baseline: '0.85 V/Q (Matched)',
      tolerance: 'Optimal Ventilation / Perfusion',
      description: 'Superior segment demonstrates balanced gravitational gas distribution.'
    },
    pulmonary_vessels: {
      title: 'Pulmonary Artery Pressure (mPAP)',
      reading: '14 mmHg',
      baseline: '13.8 mmHg (Earth Rest)',
      tolerance: 'Normal (< 20 mmHg)',
      description: 'No pulmonary hypertension or vascular congestion detected.'
    },
    left_lobe: {
      title: 'Left Inferior Lobe',
      reading: '98.5% Perfusion Index',
      baseline: '98.2% (Validated)',
      tolerance: 'Optimal Blood Oxygenation',
      description: 'Cardiac notch adjacent parenchyma exhibits healthy capillary microcirculation.'
    },
    base_bed: {
      title: 'Alveolar-Capillary Gas Exchange',
      reading: '28 mL/min/mmHg DLCO',
      baseline: '28.4 mL/min/mmHg (Baseline)',
      tolerance: 'Diffusion Capacity Intact',
      description: 'CO diffusing capacity across the respiratory membrane is normal.'
    }
  },
  brain: {
    frontal_lobe: {
      title: 'Prefrontal Cortex (Executive Function)',
      reading: '96% Cognitive Bandwidth',
      baseline: '95.5% (Earth Psychomotor)',
      tolerance: 'Flight Ready Level 1',
      description: 'Executive working memory and operational response latency within nominal bounds.'
    },
    parietal_lobe: {
      title: 'Parietal Lobe & Intracranial Pressure (ICP)',
      reading: '11.5 mmHg Estimated ICP',
      baseline: '11.0 mmHg (Supine Earth)',
      tolerance: 'Nominal Cephalad Fluid State',
      description: 'No severe cephalad fluid shift signs detected in initial baseline screening.'
    },
    occipital_lobe: {
      title: 'Occipital Lobe (SANS / Visual System)',
      reading: '98 ms Visual Evoked Potential',
      baseline: '97.5 ms (Pre-Flight Baseline)',
      tolerance: 'Optic Disc Margin Sharp',
      description: 'No papilledema or posterior globe flattening observed on high-resolution OCT.'
    },
    temporal_lobe: {
      title: 'Temporal Lobe & Hippocampus',
      reading: 'Theta/Alpha Ratio 1.15',
      baseline: '1.12 (Resting Awake)',
      tolerance: 'Normal Sleep-Wake Homeostasis',
      description: 'Auditory processing and spatial memory neural oscillations optimal.'
    },
    cerebellum: {
      title: 'Cerebellum (Vestibular System)',
      reading: '0.98 Postural Stability Index',
      baseline: '1.00 (Equilibrium Test)',
      tolerance: 'Vestibulo-Ocular Reflex Stable',
      description: 'Bilateral semicircular canal integration and otolith balance pathways calibrated.'
    }
  },
  heart: {
    aorta: {
      title: 'Ascending Aorta & Outflow Velocity',
      reading: '1.24 m/s Peak Velocity',
      baseline: '1.20 m/s (Earth Rest)',
      tolerance: 'Aortic Compliance Optimal',
      description: 'Normal elastic recoil with pulse wave velocity of 6.2 m/s.'
    },
    pulmonary_trunk: {
      title: 'Pulmonary Trunk & Valve',
      reading: '0.85 m/s Flow Velocity',
      baseline: '0.82 m/s (Resting Mean)',
      tolerance: 'No Regurgitation Detected',
      description: 'Low-resistance outflow to pulmonary vascular bed.'
    },
    right_atrium: {
      title: 'Right Atrium & Central Venous Pressure',
      reading: '4.8 mmHg CVP',
      baseline: '4.5 mmHg (Earth Baseline)',
      tolerance: 'Adequate Preload Volume',
      description: 'Normal venous return without jugular venous distention.'
    },
    left_ventricle: {
      title: 'Left Ventricle (LVEF & Stroke Volume)',
      reading: '62.5% Ejection Fraction',
      baseline: '63.0% (Echocardiogram)',
      tolerance: 'Systolic Function Robust',
      description: 'End-diastolic volume 120 mL, end-systolic volume 45 mL, stroke volume 75 mL.'
    },
    cardiac_apex: {
      title: 'Cardiac Apex & Myocardial Strain',
      reading: '-20.5% Global Longitudinal Strain',
      baseline: '-21.0% (Earth Speckle-Tracking)',
      tolerance: 'Normal Tissue Deformation',
      description: 'Uniform apical rotation and vigorous contraction symmetry.'
    }
  }
};

export const OrganIndicatorsShowcase: React.FC<OrganIndicatorsShowcaseProps> = ({
  compact = false,
  onExploreMore
}) => {
  const [activeTab, setActiveTab] = useState<OrganTab>('lungs');
  const [activeHotspot, setActiveHotspot] = useState<string | null>('trachea');
  const [viewMode, setViewMode] = useState<'card' | 'isometric'>('card');
  const [pulsePhase, setPulsePhase] = useState(0);

  // Live ECG & breathing heartbeat animation ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setPulsePhase(prev => (prev + 1) % 100);
    }, 80);
    return () => clearInterval(timer);
  }, []);

  // Update default active hotspot when tab changes
  useEffect(() => {
    if (activeTab === 'lungs') setActiveHotspot('trachea');
    else if (activeTab === 'brain') setActiveHotspot('frontal_lobe');
    else setActiveHotspot('left_ventricle');
  }, [activeTab]);

  const currentHotspotDetail =
    activeHotspot && HOTSPOT_DATA[activeTab][activeHotspot]
      ? HOTSPOT_DATA[activeTab][activeHotspot]
      : Object.values(HOTSPOT_DATA[activeTab])[0];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Controller Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-4">
        {/* Organ Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-border-subtle shadow-sm">
          <button
            onClick={() => setActiveTab('lungs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'lungs'
                ? 'bg-primary-blue text-white shadow-sm shadow-primary-blue/30'
                : 'text-secondary-text hover:text-deep-navy hover:bg-bg-subtle'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>Lungs Indicators</span>
          </button>

          <button
            onClick={() => setActiveTab('brain')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'brain'
                ? 'bg-primary-blue text-white shadow-sm shadow-primary-blue/30'
                : 'text-secondary-text hover:text-deep-navy hover:bg-bg-subtle'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Brain Indicators</span>
          </button>

          <button
            onClick={() => setActiveTab('heart')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'heart'
                ? 'bg-primary-blue text-white shadow-sm shadow-primary-blue/30'
                : 'text-secondary-text hover:text-deep-navy hover:bg-bg-subtle'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Heart Indicators</span>
          </button>
        </div>

        {/* View Mode Toggle: Interactive Card vs 3D Isometric Showcase */}
        {!compact && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-secondary-text hidden sm:inline">
              Perspective View:
            </span>
            <div className="flex items-center p-1 rounded-xl bg-white border border-border-subtle shadow-sm text-xs">
              <button
                onClick={() => setViewMode('card')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'card'
                    ? 'bg-deep-navy text-white shadow-sm'
                    : 'text-secondary-text hover:text-deep-navy'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Interactive Deck</span>
              </button>
              <button
                onClick={() => setViewMode('isometric')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'isometric'
                    ? 'bg-deep-navy text-white shadow-sm'
                    : 'text-secondary-text hover:text-deep-navy'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>3D Isometric Stack</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ISOMETRIC STACK VIEW (Faithful recreation of the user's uploaded mockup perspective) */}
      {viewMode === 'isometric' && !compact ? (
        <div className="w-full relative py-8 overflow-hidden rounded-3xl bg-gradient-to-b from-[#EDF2F8] to-[#F6F8FC] border border-border-subtle flex flex-col items-center">
          <div className="text-center mb-4">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-100 text-primary-blue border border-blue-200">
              Multi-Organ Layered Telemetry Stack
            </span>
            <p className="text-xs text-secondary-text mt-1">
              Interactive multi-card isometric visualization as captured in NORELIS Aerospace UI design system.
            </p>
          </div>

          {/* Perspective Container */}
          <div
            className="w-full max-w-5xl h-[620px] relative"
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Top Card: Lungs */}
            <div
              onClick={() => {
                setActiveTab('lungs');
                setViewMode('card');
              }}
              className="absolute left-6 top-0 w-[85%] cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:z-30 shadow-2xl rounded-3xl bg-white border border-blue-100 p-6"
              style={{
                transform: 'rotateX(18deg) rotateY(-8deg) rotateZ(3deg) translateY(-20px)',
                boxShadow: '0 25px 50px -12px rgba(28, 45, 67, 0.18)'
              }}
            >
              <MiniIndicatorCardHeader organ="Lungs" active={activeTab === 'lungs'} />
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-7 space-y-3">
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-[10px] font-bold text-primary-blue">120 mmHg</span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-[10px] font-bold text-primary-blue">16 br/min</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-[10px] font-bold text-status-success">98.5% SpO₂</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-bg-subtle border border-border-subtle text-[11px] text-secondary-text">
                    Trachea & Pulmonary capillary beds synchronized with Earth baseline.
                  </div>
                </div>
                <div className="col-span-5 h-36">
                  <RealisticLungsGraphic activeHotspot={null} />
                </div>
              </div>
            </div>

            {/* Middle Card: Brain (Prominent Center) */}
            <div
              onClick={() => {
                setActiveTab('brain');
                setViewMode('card');
              }}
              className="absolute left-16 top-36 w-[88%] cursor-pointer transition-all duration-500 hover:scale-[1.02] z-20 shadow-2xl rounded-3xl bg-white border-2 border-primary-blue/30 p-6"
              style={{
                transform: 'rotateX(18deg) rotateY(-8deg) rotateZ(3deg) translateY(40px)',
                boxShadow: '0 30px 60px -15px rgba(36, 87, 214, 0.22)'
              }}
            >
              <MiniIndicatorCardHeader organ="Brain" active={activeTab === 'brain'} />
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-7 space-y-3">
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 rounded bg-purple-50 text-[10px] font-bold text-violet-700">96% Cognitive</span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-[10px] font-bold text-primary-blue">11.5 mmHg ICP</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-[10px] font-bold text-status-success">SANS Margin Nominal</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-bg-subtle border border-border-subtle text-[11px] text-secondary-text">
                    Cerebral perfusion and visual evoked potentials verified.
                  </div>
                </div>
                <div className="col-span-5 h-40">
                  <RealisticBrainGraphic activeHotspot={null} />
                </div>
              </div>
            </div>

            {/* Bottom Card: Heart */}
            <div
              onClick={() => {
                setActiveTab('heart');
                setViewMode('card');
              }}
              className="absolute left-28 top-80 w-[85%] cursor-pointer transition-all duration-500 hover:scale-[1.02] z-10 shadow-2xl rounded-3xl bg-white border border-red-100 p-6"
              style={{
                transform: 'rotateX(18deg) rotateY(-8deg) rotateZ(3deg) translateY(90px)',
                boxShadow: '0 25px 50px -12px rgba(28, 45, 67, 0.16)'
              }}
            >
              <MiniIndicatorCardHeader organ="Heart" active={activeTab === 'heart'} />
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-7 space-y-3">
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 rounded bg-red-50 text-[10px] font-bold text-status-critical">68 bpm</span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-[10px] font-bold text-primary-blue">118/78 mmHg</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-[10px] font-bold text-status-success">62.5% LVEF</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-bg-subtle border border-border-subtle text-[11px] text-secondary-text">
                    Ascending aorta compliance and myocardial longitudinal strain calibrated.
                  </div>
                </div>
                <div className="col-span-5 h-36">
                  <RealisticHeartGraphic activeHotspot={null} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setViewMode('card')}
              className="px-6 py-2.5 rounded-xl bg-primary-blue text-white text-xs font-bold hover:bg-bright-blue transition-all shadow-md shadow-primary-blue/30 flex items-center gap-2 mx-auto"
            >
              <Eye className="w-4 h-4" />
              <span>Switch to Live Interactive Telemetry Console</span>
            </button>
          </div>
        </div>
      ) : (
        /* INTERACTIVE CARD DECK (The ultra-sleek medical card from the user's uploaded mockup) */
        <div className="w-full rounded-3xl bg-white border border-border-subtle shadow-card-hover p-4 sm:p-6 lg:p-8 transition-all relative overflow-hidden">
          {/* CARD TOP BAR */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
            {/* Title with Capsule Badge */}
            <div className="flex items-center gap-3">
              <div className="relative flex items-center">
                {/* Visual Pill with gradient backdrop and MRI icon */}
                <div className="w-12 h-10 rounded-xl bg-gradient-to-r from-blue-600 via-primary-blue to-teal-400 p-0.5 flex items-center justify-center shadow-md">
                  <div className="w-full h-full rounded-[10px] bg-deep-navy/85 flex items-center justify-center text-white">
                    {activeTab === 'lungs' && <Wind className="w-5 h-5 text-teal-300" />}
                    {activeTab === 'brain' && <Sparkles className="w-5 h-5 text-purple-300" />}
                    {activeTab === 'heart' && <Heart className="w-5 h-5 text-rose-300" />}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-deep-navy tracking-tight">
                  General indicators {activeTab === 'lungs' && 'of the Lungs'}
                  {activeTab === 'brain' && 'of the Brain'}
                  {activeTab === 'heart' && 'of the Heart'}
                </h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
                  <span className="text-[11px] font-semibold text-secondary-text">
                    Synchronized with Astronaut Baseline Telemetry (NORELIS AI)
                  </span>
                </div>
              </div>
            </div>

            {/* Top Navigation Pill (As shown in screenshot: Technology, Predict, About, Contact, Help) */}
            <div className="hidden lg:flex items-center gap-4 text-xs font-semibold text-secondary-text">
              <span className="hover:text-deep-navy cursor-pointer">Technology</span>
              <span className="hover:text-deep-navy cursor-pointer">Predict</span>
              <span className="hover:text-deep-navy cursor-pointer">About</span>
              <span className="hover:text-deep-navy cursor-pointer">Contact</span>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-primary-blue font-bold border border-blue-200">
                Help Desk
              </span>
            </div>
          </div>

          {/* MAIN CARD BODY: 3-COLUMN OR 2-COLUMN RESPONSIVE GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-start">
            {/* LEFT COLUMN: PARAMETERS & DIAGNOSTIC SCANS (5 COLS) */}
            <div className="lg:col-span-5 space-y-5">
              {/* My Basic Condition Pills */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-secondary-text uppercase tracking-wider">
                  My Basic Condition
                </span>
                <div className="grid grid-cols-4 gap-2">
                  <div className="p-2 rounded-xl bg-bg-subtle border border-border-subtle text-center">
                    <span className="block text-[10px] text-secondary-text">BP Systolic</span>
                    <strong className="text-xs font-mono font-bold text-deep-navy">118</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-bg-subtle border border-border-subtle text-center">
                    <span className="block text-[10px] text-secondary-text">Pulse Peak</span>
                    <strong className="text-xs font-mono font-bold text-deep-navy">115</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-bg-subtle border border-border-subtle text-center">
                    <span className="block text-[10px] text-secondary-text">SpO₂ Sat</span>
                    <strong className="text-xs font-mono font-bold text-status-success">98.5%</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-bg-subtle border border-border-subtle text-center">
                    <span className="block text-[10px] text-secondary-text">Core Temp</span>
                    <strong className="text-xs font-mono font-bold text-deep-navy">36.6°C</strong>
                  </div>
                </div>
              </div>

              {/* Physiological Parameters Panel */}
              <div className="p-4 rounded-2xl bg-bg-subtle/80 border border-border-subtle space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-deep-navy flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-primary-blue" />
                    Physiological Parameters
                  </span>
                  <span className="text-[10px] font-semibold text-primary-blue bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Nominal Earth Range
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 rounded-xl bg-white border border-border-subtle">
                    <span className="block text-[10px] text-secondary-text">Temperature</span>
                    <div className="flex items-baseline justify-between mt-0.5">
                      <span className="text-sm font-bold text-deep-navy font-mono">36.6°C</span>
                      <span className="text-[9px] font-bold text-status-success bg-emerald-50 px-1 rounded">Optimal</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-border-subtle">
                    <span className="block text-[10px] text-secondary-text">
                      {activeTab === 'lungs' ? 'Respiratory Rate' : activeTab === 'brain' ? 'Cognitive Load' : 'Heart Rate'}
                    </span>
                    <div className="flex items-baseline justify-between mt-0.5">
                      <span className="text-sm font-bold text-deep-navy font-mono">
                        {activeTab === 'lungs' ? '16 br/min' : activeTab === 'brain' ? '96.2%' : '68 bpm'}
                      </span>
                      <span className="text-[9px] font-bold text-primary-blue bg-blue-50 px-1 rounded">Resting</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-border-subtle">
                    <span className="block text-[10px] text-secondary-text">Blood Pressure</span>
                    <div className="flex items-baseline justify-between mt-0.5">
                      <span className="text-sm font-bold text-deep-navy font-mono">118 / 78</span>
                      <span className="text-[9px] text-secondary-text font-mono">mmHg</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-border-subtle">
                    <span className="block text-[10px] text-secondary-text">Oxygen Saturation</span>
                    <div className="flex items-baseline justify-between mt-0.5">
                      <span className="text-sm font-bold text-status-success font-mono">98.5%</span>
                      <span className="text-[9px] text-secondary-text font-mono">FiO₂ 21%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Diagnostic Scans & Cardiogram Row (From screenshot: X-ray, MRI, Cardiogram) */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-secondary-text uppercase tracking-wider">
                  Diagnostic Scans & Waveforms
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {/* Scan 1: Chest X-ray / High Res Scan */}
                  <div className="p-2.5 rounded-xl bg-white border border-border-subtle shadow-sm flex flex-col justify-between hover:border-primary-blue transition-colors">
                    <div>
                      <span className="text-[9px] font-bold text-secondary-text uppercase block">
                        {activeTab === 'lungs' ? 'Chest X-Ray' : activeTab === 'brain' ? 'Brain CT' : 'Echocardiogram'}
                      </span>
                      <span className="text-[10px] font-extrabold text-deep-navy">Clear / 0 Infiltrates</span>
                    </div>
                    {/* Simulated Medical Scan Graphic */}
                    <div className="w-full h-12 mt-1.5 rounded-lg bg-deep-navy flex items-center justify-center overflow-hidden relative">
                      <div className="absolute inset-0 bg-blue-950/80 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full border border-blue-400/40 opacity-70" />
                        <div className="w-4 h-4 rounded-full border border-blue-400/80" />
                      </div>
                      <span className="text-[8px] font-mono text-blue-200 z-10">T1-AXIAL</span>
                    </div>
                  </div>

                  {/* Scan 2: Full Organ MRI */}
                  <div className="p-2.5 rounded-xl bg-white border border-border-subtle shadow-sm flex flex-col justify-between hover:border-primary-blue transition-colors">
                    <div>
                      <span className="text-[9px] font-bold text-secondary-text uppercase block">
                        {activeTab === 'lungs' ? 'Lungs MRI' : activeTab === 'brain' ? 'Full MRI' : 'Angiogram'}
                      </span>
                      <span className="text-[10px] font-extrabold text-deep-navy">T2 Weighted 3T</span>
                    </div>
                    {/* MRI Grid thumbnail simulation */}
                    <div className="w-full h-12 mt-1.5 rounded-lg bg-deep-navy grid grid-cols-3 gap-0.5 p-0.5">
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="bg-slate-800 rounded-[2px] flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400/40" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scan 3: Live Waveform (Cardiogram / Pulmonology) */}
                  <div className="p-2.5 rounded-xl bg-white border border-border-subtle shadow-sm flex flex-col justify-between hover:border-primary-blue transition-colors">
                    <div>
                      <span className="text-[9px] font-bold text-secondary-text uppercase block">
                        {activeTab === 'lungs' ? 'Spirometry' : activeTab === 'brain' ? 'qEEG Wave' : 'Cardiogram'}
                      </span>
                      <span className="text-[10px] font-extrabold text-primary-blue">Live Telemetry</span>
                    </div>
                    {/* Live Animated SVG Rhythm Wave */}
                    <div className="w-full h-12 mt-1.5 rounded-lg bg-blue-50/60 border border-blue-100 flex items-center justify-center px-1 overflow-hidden">
                      <svg viewBox="0 0 100 30" className="w-full h-full" preserveAspectRatio="none">
                        <path
                          d={`M0 15 L20 15 L25 5 L30 25 L35 12 L40 18 L45 15 L70 15 L75 4 L80 26 L85 13 L90 17 L100 15`}
                          fill="none"
                          stroke="#2457D6"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            transform: `translateX(-${(pulsePhase % 50) * 0.4}px)`
                          }}
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Hotspot Telemetry Detail Callout */}
              {currentHotspotDetail && (
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-deep-navy flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-primary-blue" />
                      {currentHotspotDetail.title}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-primary-blue border border-blue-200">
                      {currentHotspotDetail.reading}
                    </span>
                  </div>
                  <p className="text-xs text-secondary-text leading-relaxed">
                    {currentHotspotDetail.description}
                  </p>
                  <div className="flex items-center justify-between text-[10px] pt-1 border-t border-blue-200/60 text-secondary-text">
                    <span>Baseline: <strong className="text-deep-navy">{currentHotspotDetail.baseline}</strong></span>
                    <span className="text-status-success font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {currentHotspotDetail.tolerance}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* CENTER COLUMN: REALISTIC ORGAN VISUAL WITH GLOWING RADAR HOTSPOTS (5 COLS) */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center min-h-[380px] sm:min-h-[440px]">
              {/* Subtle background radar circles */}
              <div className="w-full max-w-[400px] h-[380px] sm:h-[440px] flex items-center justify-center relative">
                {activeTab === 'lungs' && (
                  <RealisticLungsGraphic
                    activeHotspot={activeHotspot}
                    onHotspotClick={id => setActiveHotspot(id)}
                  />
                )}
                {activeTab === 'brain' && (
                  <RealisticBrainGraphic
                    activeHotspot={activeHotspot}
                    onHotspotClick={id => setActiveHotspot(id)}
                  />
                )}
                {activeTab === 'heart' && (
                  <RealisticHeartGraphic
                    activeHotspot={activeHotspot}
                    onHotspotClick={id => setActiveHotspot(id)}
                  />
                )}
              </div>

              <div className="text-center text-[11px] text-secondary-text mt-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary-blue animate-ping" />
                <span>Click any pulsing circular hotspot to inspect anatomical biomarker telemetry</span>
              </div>
            </div>

            {/* RIGHT COLUMN: PATIENT CARD & SCHEDULE WIDGET (2 COLS) */}
            <div className="lg:col-span-2 space-y-4">
              {/* Patient Profile Card (Matching top right pill in screenshot) */}
              <div className="p-3.5 rounded-2xl bg-bg-subtle/80 border border-border-subtle space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-blue text-white flex items-center justify-center font-bold text-xs">
                    SC
                  </div>
                  <div className="overflow-hidden">
                    <span className="block text-[11px] font-bold text-deep-navy truncate">
                      Cdr. Sarah Connor
                    </span>
                    <span className="block text-[10px] text-secondary-text font-mono truncate">
                      AG-001 • Artemis IV
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-border-subtle text-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-text">Status:</span>
                    <span className="font-bold text-status-success">Flight Ready</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-text">Baseline:</span>
                    <span className="font-bold text-primary-blue">Validated</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-text">Condition:</span>
                    <span className="font-bold text-deep-navy">Nominal</span>
                  </div>
                </div>
              </div>

              {/* My Schedule Widget (From screenshot right side: My Schedule, Dr. Marcus, Dr. Bishop) */}
              <div className="p-3.5 rounded-2xl bg-white border border-border-subtle shadow-sm space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-deep-navy flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-primary-blue" />
                    My Schedule
                  </span>
                  <span className="text-[9px] font-semibold text-secondary-text">UTC</span>
                </div>

                <div className="p-2 rounded-xl bg-blue-50/60 border border-blue-100 text-[10px] space-y-1">
                  <span className="font-bold text-deep-navy block">In-Flight Sync</span>
                  <div className="flex items-center gap-1 text-secondary-text">
                    <Clock className="w-3 h-3 text-primary-blue" />
                    <span>14:30 - 15:00 UTC</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1 text-[10px]">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-200 text-[9px] font-bold flex items-center justify-center text-slate-700">
                      MV
                    </div>
                    <div>
                      <span className="block font-bold text-deep-navy text-[10px]">Dr. Marcus Vance</span>
                      <span className="block text-[9px] text-secondary-text">Flight Surgeon</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-200 text-[9px] font-bold flex items-center justify-center text-slate-700">
                      CB
                    </div>
                    <div>
                      <span className="block font-bold text-deep-navy text-[10px]">Dr. Catherine Bishop</span>
                      <span className="block text-[9px] text-secondary-text">Cardiologist</span>
                    </div>
                  </div>
                </div>

                {onExploreMore ? (
                  <button
                    onClick={onExploreMore}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-primary-blue text-white text-[10px] font-bold hover:bg-bright-blue transition-colors flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span>Full Medical Report</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-component helper for isometric preview cards
const MiniIndicatorCardHeader: React.FC<{ organ: string; active: boolean }> = ({ organ, active }) => {
  return (
    <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-subtle">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-primary-blue p-0.5 flex items-center justify-center shadow-sm">
          <div className="w-full h-full rounded-[6px] bg-deep-navy flex items-center justify-center text-white">
            <Activity className="w-4 h-4 text-blue-300" />
          </div>
        </div>
        <h3 className="font-extrabold text-base text-deep-navy tracking-tight">
          General indicators of the {organ}
        </h3>
      </div>
      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-primary-blue border border-blue-200">
        Live Telemetry
      </span>
    </div>
  );
};
