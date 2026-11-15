import React, { useState, useEffect, useRef } from 'react';
import {
  Activity,
  Heart,
  Wind,
  Brain,
  Shield,
  Layers,
  Sparkles,
  Zap,
  Info,
  CheckCircle2,
  Maximize2,
  RotateCcw,
  Sliders
} from 'lucide-react';
import { AnatomicalModelType } from '@/types';

interface FuturisticDualBodyScannerProps {
  initialModel?: AnatomicalModelType;
  onModelChange?: (model: AnatomicalModelType) => void;
  onSelectOrgan?: (organId: string) => void;
  className?: string;
}

interface OrganInfo {
  id: string;
  name: string;
  latinName: string;
  system: string;
  yMin: number; // percentage from top (0-100)
  yMax: number;
  reading: string;
  status: string;
  color: string;
  description: string;
}

const COMMON_ORGANS: Record<string, OrganInfo> = {
  brain: {
    id: 'brain',
    name: 'Brain & Cerebral Cortex',
    latinName: 'Encephalon',
    system: 'Central Nervous System',
    yMin: 5,
    yMax: 16,
    reading: 'ICP 11.2 mmHg • 96% Cognitive Bandwidth',
    status: 'Nominal Cephalad Perfusion',
    color: '#A855F7',
    description: 'Bilateral cerebral hemispheres with detailed frontal, parietal, temporal, and occipital sulci.'
  },
  skeleton: {
    id: 'skeleton',
    name: 'Skeletal Framework & Bone Matrix',
    latinName: 'Systema Skeletale',
    system: 'Musculoskeletal System',
    yMin: 6,
    yMax: 95,
    reading: 'BMD T-Score +0.4 • Cortical Integrity 99%',
    status: 'High Density Matrix',
    color: '#E2E8F0',
    description: 'Skull cranium, spine column, clavicles, rib cage, pelvic girdle, and bilateral limbs.'
  },
  lungs: {
    id: 'lungs',
    name: 'Bilateral Lungs & Bronchial Tree',
    latinName: 'Pulmones',
    system: 'Respiratory System',
    yMin: 22,
    yMax: 37,
    reading: 'SpO₂ 98.4% • V/Q Ratio 0.85',
    status: 'Optimal Alveolar Gas Exchange',
    color: '#06B6D4',
    description: 'Left and right lung lobes with arborized bronchial tree and pulmonary capillary microvasculature.'
  },
  heart: {
    id: 'heart',
    name: 'Heart & Great Vessels',
    latinName: 'Cor & Aorta',
    system: 'Cardiovascular System',
    yMin: 25,
    yMax: 34,
    reading: '68 BPM • LVEF 63% • BP 118/76 mmHg',
    status: 'Robust Myocardial Strain',
    color: '#EF4444',
    description: 'Myocardial cone with ascending aorta arch, pulmonary trunk, coronary arteries, and ventricles.'
  },
  liver: {
    id: 'liver',
    name: 'Liver & Hepatic Biliary Tree',
    latinName: 'Hepar',
    system: 'Metabolic & Digestive',
    yMin: 34,
    yMax: 43,
    reading: 'Enzyme Profile ALT 22 U/L • AST 19 U/L',
    status: 'Optimal Hepatic Perfusion',
    color: '#F59E0B',
    description: 'Dominant right and left lobes filtering metabolic waste and synthesizing transport proteins.'
  },
  stomach: {
    id: 'stomach',
    name: 'Stomach & Gastric Fundus',
    latinName: 'Gaster',
    system: 'Digestive System',
    yMin: 35,
    yMax: 42,
    reading: 'Motility Index 100% • pH 1.8',
    status: 'Nominal Gastric Emptying',
    color: '#F97316',
    description: 'J-shaped gastric body and fundus regulating nutrient breakdown.'
  },
  pancreas: {
    id: 'pancreas',
    name: 'Pancreas',
    latinName: 'Pancreas',
    system: 'Endocrine & Exocrine',
    yMin: 39,
    yMax: 44,
    reading: 'Blood Glucose 92 mg/dL • Insulin Nominal',
    status: 'Endocrine Homeostasis',
    color: '#EAB308',
    description: 'Transverse glandular organ producing digestive enzymes and endocrine hormones.'
  },
  kidneys: {
    id: 'kidneys',
    name: 'Bilateral Kidneys & Adrenals',
    latinName: 'Renes',
    system: 'Renal & Fluid Balance',
    yMin: 39,
    yMax: 47,
    reading: 'eGFR > 115 mL/min • Fluid Balance Nominal',
    status: 'Electrolyte Equilibrium',
    color: '#D97706',
    description: 'Bilateral bean-shaped renal filters governing blood volume and plasma osmolality.'
  },
  intestines: {
    id: 'intestines',
    name: 'Small & Large Intestines',
    latinName: 'Intestinum Tenue & Crassum',
    system: 'Gastrointestinal System',
    yMin: 43,
    yMax: 55,
    reading: 'Transit Velocity 4.2 cm/min • Microbiome Stable',
    status: 'Active Peristalsis',
    color: '#10B981',
    description: 'Coiled mesenteric jejunum/ileum bordered by ascending, transverse, and descending colon.'
  },
  bladder: {
    id: 'bladder',
    name: 'Urinary Bladder',
    latinName: 'Vesica Urinaria',
    system: 'Urological System',
    yMin: 55,
    yMax: 60,
    reading: 'Volume 180 mL • Urodynamic Pressure Low',
    status: 'Normal Detrusor Tone',
    color: '#3B82F6',
    description: 'Muscular pelvic reservoir regulating fluid excretion.'
  }
};

const FEMALE_SPECIFIC_ORGANS: Record<string, OrganInfo> = {
  uterus: {
    id: 'uterus',
    name: 'Uterus & Endometrial Cavity',
    latinName: 'Uterus',
    system: 'Female Reproductive System',
    yMin: 53,
    yMax: 59,
    reading: 'Endometrial Thickness 6.5 mm • Myometrial Tone Intact',
    status: 'Anatomically Calibrated Female Matrix',
    color: '#EC4899',
    description: 'Pear-shaped muscular organ positioned in the female pelvic cavity between bladder and rectum.'
  },
  ovaries: {
    id: 'ovaries',
    name: 'Bilateral Ovaries & Fallopian Tubes',
    latinName: 'Ovaria & Tubae Uterinae',
    system: 'Female Endocrine & Reproductive',
    yMin: 54,
    yMax: 58,
    reading: 'Estradiol 110 pg/mL • Follicular State Nominal',
    status: 'Endocrine Calibrated',
    color: '#F43F5E',
    description: 'Paired female gonads producing ova and endocrine reproductive hormones (estrogen, progesterone).'
  }
};

const MALE_SPECIFIC_ORGANS: Record<string, OrganInfo> = {
  prostate: {
    id: 'prostate',
    name: 'Prostate Gland & Seminal Vesicles',
    latinName: 'Prostata',
    system: 'Male Reproductive & Urological',
    yMin: 58,
    yMax: 62,
    reading: 'PSA 0.8 ng/mL • Volume 18 cm³ (Normal)',
    status: 'Anatomically Calibrated Male Matrix',
    color: '#6366F1',
    description: 'Firm muscular-glandular organ encircling the urethra directly inferior to the urinary bladder.'
  },
  testes: {
    id: 'testes',
    name: 'Testes & Scrotal Parenchyma',
    latinName: 'Testes',
    system: 'Male Endocrine & Reproductive',
    yMin: 60,
    yMax: 65,
    reading: 'Total Testosterone 620 ng/dL • Microcirculation Intact',
    status: 'Endocrine Calibrated',
    color: '#38BDF8',
    description: 'Paired male gonads producing spermatozoa and primary androgenic hormones.'
  }
};

export const FuturisticDualBodyScanner: React.FC<FuturisticDualBodyScannerProps> = ({
  initialModel = 'female',
  onModelChange,
  onSelectOrgan,
  className = ''
}) => {
  const [activeModel, setActiveModel] = useState<AnatomicalModelType>(initialModel);
  const [selectedOrganId, setSelectedOrganId] = useState<string | null>('heart');
  const [hoveredOrganId, setHoveredOrganId] = useState<string | null>(null);

  // Continuous Automatic Vertical Scanning State (0 to 100%)
  const [scanProgress, setScanProgress] = useState(0); // 0 = head, 100 = feet
  const [isCycleComplete, setIsCycleComplete] = useState(false);
  const [heartPulse, setHeartPulse] = useState(1);

  // Sync with prop
  useEffect(() => {
    setActiveModel(initialModel);
  }, [initialModel]);

  const handleModelSwitch = (model: AnatomicalModelType) => {
    setActiveModel(model);
    onModelChange?.(model);
    setSelectedOrganId(model === 'female' ? 'uterus' : 'prostate');
  };

  // Live Continuous Scanning Beam Animation Loop (60 FPS smoothly via requestAnimationFrame)
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    const cycleDurationMs = 7000; // 7 seconds per full scan sweep

    const tick = (currentTime: number) => {
      const elapsed = currentTime - lastTime;
      const progressIncrement = (elapsed / cycleDurationMs) * 100;

      setScanProgress(prev => {
        const next = prev + progressIncrement;
        if (next >= 100) {
          setIsCycleComplete(true);
          // Pause momentarily at 100% to show full revealed body, then loop seamlessly back to 0
          if (next >= 115) {
            setIsCycleComplete(false);
            return 0;
          }
          return next;
        }
        return next;
      });

      lastTime = currentTime;
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Continuous subtle biological heartbeat pulse ticker
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setHeartPulse(prev => (prev === 1 ? 1.08 : 1));
    }, 850);
    return () => clearInterval(pulseInterval);
  }, []);

  // Determine current active organ from beam position or user hover/select
  const currentBeamOrgan = (() => {
    const allOrgans = {
      ...COMMON_ORGANS,
      ...(activeModel === 'female' ? FEMALE_SPECIFIC_ORGANS : MALE_SPECIFIC_ORGANS)
    };
    return (
      Object.values(allOrgans).find(
        org => scanProgress >= org.yMin && scanProgress <= org.yMax
      ) || null
    );
  })();

  const activeDisplayOrgan =
    (hoveredOrganId &&
      ({ ...COMMON_ORGANS, ...FEMALE_SPECIFIC_ORGANS, ...MALE_SPECIFIC_ORGANS }[hoveredOrganId])) ||
    (selectedOrganId &&
      ({ ...COMMON_ORGANS, ...FEMALE_SPECIFIC_ORGANS, ...MALE_SPECIFIC_ORGANS }[selectedOrganId])) ||
    currentBeamOrgan ||
    COMMON_ORGANS.heart;

  return (
    <div className={`w-full flex flex-col items-center select-none ${className}`}>
      {/* SCANNER CONTROL BAR: MODEL SWITCHER TABS & REAL-TIME SCANNER STATUS */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        {/* Model Switcher Tabs (Female Scanner vs Male Scanner) */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-lg shadow-cyan-950/40 backdrop-blur">
          <button
            type="button"
            onClick={() => handleModelSwitch('female')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black tracking-wider transition-all flex items-center gap-2.5 ${
              activeModel === 'female'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30 ring-2 ring-cyan-400/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span className="text-sm">♀</span>
            <span>FEMALE BODY SCANNER</span>
          </button>

          <button
            type="button"
            onClick={() => handleModelSwitch('male')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black tracking-wider transition-all flex items-center gap-2.5 ${
              activeModel === 'male'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30 ring-2 ring-cyan-400/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span className="text-sm">♂</span>
            <span>MALE BODY SCANNER</span>
          </button>
        </div>

        {/* Live Scanner Telemetry Badges */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-[11px] font-mono text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-bold">SCAN: {Math.min(100, Math.round(scanProgress))}%</span>
          </div>

          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 text-[11px] font-mono text-slate-300">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span>142.8 GHz VOLUMETRIC MRI</span>
          </div>
        </div>
      </div>

      {/* MAIN FUTURISTIC SCANNER CHAMBER (Black background, neon electric cyan body, real-time scanning beam) */}
      <div className="w-full relative rounded-3xl bg-[#020612] border-2 border-cyan-500/40 shadow-2xl shadow-cyan-950/60 overflow-hidden p-4 sm:p-6 lg:p-8">
        {/* Futuristic Background Medical Grid & Holographic Reticles */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, #00F0FF 1px, transparent 1px),
              linear-gradient(to bottom, #00F0FF 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px'
          }}
        />

        {/* Vertical Metric Height Coordinates on Left Edge */}
        <div className="absolute left-3 sm:left-6 top-8 bottom-8 flex flex-col justify-between font-mono text-[9px] text-cyan-400/60 pointer-events-none select-none z-10">
          <span>+185 cm [CRANIAL]</span>
          <span>+150 cm [CERVICAL]</span>
          <span>+120 cm [THORACIC]</span>
          <span>+095 cm [LUMBAR]</span>
          <span>+075 cm [PELVIC]</span>
          <span>+045 cm [FEMORAL]</span>
          <span>+015 cm [TIBIAL]</span>
          <span>+000 cm [PODIAL]</span>
        </div>

        {/* Top Chamber Header HUD */}
        <div className="relative z-10 flex items-center justify-between pb-4 border-b border-cyan-500/20 text-xs font-mono text-cyan-400">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-[10px] font-bold text-cyan-300">
              SYSTEM 01
            </span>
            <span className="font-extrabold tracking-wider uppercase">
              NORELIS FULL-BODY REVEAL · {activeModel.toUpperCase()} ANATOMY
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="hidden sm:inline">REAL-TIME TISSUE EXCITATION</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* MAIN BODY DISPLAY GRID: SCANNER VIEWPORT (CENTER) & TELEMETRY CARD (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-6 relative z-10">
          {/* CENTER VIEWPORT: THE ANATOMICAL BODY WITH PROGRESSIVE SCANNING REVEAL (8 cols) */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center relative min-h-[580px] sm:min-h-[660px]">
            {/* Holographic Target Rings Behind Body */}
            <div className="absolute w-[360px] h-[360px] rounded-full border border-cyan-500/20 animate-spin-slow pointer-events-none opacity-40" />
            <div className="absolute w-[480px] h-[480px] rounded-full border border-blue-500/15 pointer-events-none opacity-30" />

            {/* THE HUMAN BODY SVG CONTAINER */}
            <div className="relative w-full max-w-[380px] h-[560px] sm:h-[640px] flex items-center justify-center">
              <svg
                viewBox="0 0 400 800"
                className="w-full h-full filter drop-shadow-[0_0_25px_rgba(0,240,255,0.25)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Glowing Electric Cyan Rim Shader Gradients */}
                  <linearGradient id="bodyOuterGlow" x1="0" y1="0" x2="400" y2="800" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.85" />
                    <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.8" />
                  </linearGradient>

                  <linearGradient id="bodyTranslucentFill" x1="200" y1="40" x2="200" y2="760" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#0369A1" stopOpacity="0.18" />
                    <stop offset="50%" stopColor="#0284C7" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#0C4A6E" stopOpacity="0.16" />
                  </linearGradient>

                  {/* Organ Excitation Shaders */}
                  <linearGradient id="brainNeonGrad" x1="160" y1="60" x2="240" y2="120" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#C084FC" />
                    <stop offset="60%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#7E22CE" />
                  </linearGradient>

                  <linearGradient id="lungsNeonGrad" x1="120" y1="180" x2="280" y2="300" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#22D3EE" />
                    <stop offset="50%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#0891B2" />
                  </linearGradient>

                  <linearGradient id="heartNeonGrad" x1="180" y1="210" x2="235" y2="280" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#F87171" />
                    <stop offset="50%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#B91C1C" />
                  </linearGradient>

                  <linearGradient id="liverNeonGrad" x1="140" y1="280" x2="230" y2="340" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#B45309" />
                  </linearGradient>

                  <linearGradient id="stomachNeonGrad" x1="200" y1="290" x2="255" y2="350" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FB923C" />
                    <stop offset="100%" stopColor="#C2410C" />
                  </linearGradient>

                  <linearGradient id="pancreasNeonGrad" x1="170" y1="320" x2="240" y2="350" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FACC15" />
                    <stop offset="100%" stopColor="#A16207" />
                  </linearGradient>

                  <linearGradient id="kidneyNeonGrad" x1="140" y1="330" x2="260" y2="385" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#92400E" />
                  </linearGradient>

                  <linearGradient id="intestinesNeonGrad" x1="140" y1="360" x2="260" y2="445" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="50%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>

                  <linearGradient id="uterusNeonGrad" x1="180" y1="430" x2="220" y2="475" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#F472B6" />
                    <stop offset="50%" stopColor="#EC4899" />
                    <stop offset="100%" stopColor="#BE185D" />
                  </linearGradient>

                  <linearGradient id="prostateNeonGrad" x1="185" y1="465" x2="215" y2="495" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#818CF8" />
                    <stop offset="100%" stopColor="#4338CA" />
                  </linearGradient>

                  {/* Horizontal Laser Scanning Beam Gradient */}
                  <linearGradient id="laserBeamGrad" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#00F0FF" stopOpacity="0" />
                    <stop offset="20%" stopColor="#00F0FF" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                    <stop offset="80%" stopColor="#00F0FF" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
                  </linearGradient>

                  <filter id="laserGlow" x="-20%" y="-100%" width="140%" height="300%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* LAYER 1: SKELETAL SYSTEM (Reveals progressively) */}
                <g opacity={getOrganOpacity(COMMON_ORGANS.skeleton.yMin, scanProgress, isCycleComplete)}>
                  <SkeletalGraphic profile={activeModel} />
                </g>

                {/* LAYER 2: TRANSLUCENT HUMAN BODY CONTOUR (X-RAY CYBERNETIC SILHOUETTE) */}
                <g>
                  {activeModel === 'female' ? (
                    <path
                      d="M200 45
                         C178 45 164 62 164 88
                         C164 108 172 122 182 132
                         C170 142 148 156 138 178
                         C128 202 118 238 106 280
                         C94 322 80 368 62 408
                         C58 416 68 424 76 416
                         C98 380 114 340 124 308
                         C124 350 128 388 138 422
                         C148 450 146 484 138 528
                         C130 580 122 642 126 706
                         C128 750 134 786 142 798
                         C146 804 156 802 160 790
                         C168 750 172 682 176 612
                         C180 536 188 492 200 492
                         C212 492 220 536 224 612
                         C228 682 232 750 240 790
                         C244 802 254 804 258 798
                         C266 786 272 750 274 706
                         C278 642 270 580 262 528
                         C254 484 252 450 262 422
                         C272 388 276 350 276 308
                         C286 340 302 380 324 416
                         C332 424 342 416 338 408
                         C320 368 306 322 294 280
                         C282 238 272 202 262 178
                         C252 156 230 142 218 132
                         C228 122 236 108 236 88
                         C236 62 222 45 200 45 Z"
                      fill="url(#bodyTranslucentFill)"
                      stroke="url(#bodyOuterGlow)"
                      strokeWidth="2.5"
                    />
                  ) : (
                    <path
                      d="M200 42
                         C176 42 160 60 160 88
                         C160 110 170 124 180 135
                         C162 146 138 162 126 186
                         C114 212 104 252 92 296
                         C80 340 68 385 50 422
                         C46 430 56 438 64 430
                         C86 392 102 352 112 318
                         C114 362 118 404 126 440
                         C134 476 132 512 126 554
                         C118 604 112 662 116 720
                         C118 760 124 792 132 802
                         C136 808 146 806 150 794
                         C158 756 162 690 168 620
                         C174 544 186 498 200 498
                         C214 498 226 544 232 620
                         C238 690 242 756 250 794
                         C254 806 264 808 268 802
                         C276 792 282 760 284 720
                         C288 662 282 604 274 554
                         C268 512 266 476 274 440
                         C282 404 286 362 288 318
                         C298 352 314 392 336 430
                         C344 438 354 430 350 422
                         C332 385 320 340 308 296
                         C296 252 286 212 274 186
                         C262 162 238 146 220 135
                         C230 124 240 110 240 88
                         C240 60 224 42 200 42 Z"
                      fill="url(#bodyTranslucentFill)"
                      stroke="url(#bodyOuterGlow)"
                      strokeWidth="2.5"
                    />
                  )}
                </g>

                {/* LAYER 3: DETAILED INTERNAL ORGANS (Progressively illuminated by scanning beam) */}

                {/* 1. BRAIN */}
                <g
                  onClick={() => setSelectedOrganId('brain')}
                  className="cursor-pointer"
                  opacity={getOrganOpacity(COMMON_ORGANS.brain.yMin, scanProgress, isCycleComplete)}
                >
                  <path
                    d="M175 92 C168 76 178 56 200 56 C222 56 232 76 225 92 C230 102 220 114 200 114 C180 114 170 102 175 92 Z"
                    fill="url(#brainNeonGrad)"
                    stroke="#C084FC"
                    strokeWidth="1.5"
                  />
                  {/* Cerebral Sulci Folds */}
                  <path d="M185 75 Q200 82 215 75" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" fill="none" />
                  <path d="M180 88 Q200 95 220 88" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" fill="none" />
                  <path d="M190 100 Q200 105 210 100" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" fill="none" />
                </g>

                {/* 2. LUNGS */}
                <g
                  onClick={() => setSelectedOrganId('lungs')}
                  className="cursor-pointer"
                  opacity={getOrganOpacity(COMMON_ORGANS.lungs.yMin, scanProgress, isCycleComplete)}
                >
                  {/* Trachea */}
                  <rect x="196" y="145" width="8" height="42" rx="2" fill="#38BDF8" opacity="0.8" />
                  {/* Left & Right Bronchi */}
                  <path d="M200 186 L175 205 M200 186 L225 205" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
                  {/* Right Lung (Viewer's Left) */}
                  <path
                    d="M190 196 C176 172 152 176 142 208 C132 242 130 282 144 294 C158 304 186 288 190 252 Z"
                    fill="url(#lungsNeonGrad)"
                    stroke="#22D3EE"
                    strokeWidth="1.5"
                  />
                  {/* Left Lung (Viewer's Right with Cardiac Notch) */}
                  <path
                    d="M210 196 C224 172 248 176 258 208 C268 242 270 282 256 294 C242 304 220 284 216 252 Z"
                    fill="url(#lungsNeonGrad)"
                    stroke="#22D3EE"
                    strokeWidth="1.5"
                  />
                </g>

                {/* 3. HEART (With active continuous biological pulse) */}
                <g
                  onClick={() => setSelectedOrganId('heart')}
                  className="cursor-pointer transition-transform duration-300"
                  style={{
                    transformOrigin: '200px 240px',
                    transform: `scale(${heartPulse})`
                  }}
                  opacity={getOrganOpacity(COMMON_ORGANS.heart.yMin, scanProgress, isCycleComplete)}
                >
                  {/* Aortic Arch */}
                  <path
                    d="M196 215 C192 195 205 188 214 195 C222 200 220 216 216 225"
                    stroke="#EF4444"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Myocardium */}
                  <path
                    d="M188 224 C175 238 180 262 200 282 C214 262 224 238 212 224 C202 214 194 214 188 224 Z"
                    fill="url(#heartNeonGrad)"
                    stroke="#F87171"
                    strokeWidth="2"
                  />
                  {/* Coronary Vasculature */}
                  <path d="M198 228 Q194 250 204 275" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.7" fill="none" />
                </g>

                {/* 4. LIVER */}
                <g
                  onClick={() => setSelectedOrganId('liver')}
                  className="cursor-pointer"
                  opacity={getOrganOpacity(COMMON_ORGANS.liver.yMin, scanProgress, isCycleComplete)}
                >
                  <path
                    d="M152 284 C175 274 215 276 230 288 C232 312 215 338 185 338 C160 338 145 316 152 284 Z"
                    fill="url(#liverNeonGrad)"
                    stroke="#FBBF24"
                    strokeWidth="1.5"
                  />
                </g>

                {/* 5. STOMACH */}
                <g
                  onClick={() => setSelectedOrganId('stomach')}
                  className="cursor-pointer"
                  opacity={getOrganOpacity(COMMON_ORGANS.stomach.yMin, scanProgress, isCycleComplete)}
                >
                  <path
                    d="M212 288 C234 286 248 300 244 322 C240 342 220 348 206 336 C202 320 206 300 212 288 Z"
                    fill="url(#stomachNeonGrad)"
                    stroke="#FB923C"
                    strokeWidth="1.5"
                  />
                </g>

                {/* 6. PANCREAS */}
                <g
                  onClick={() => setSelectedOrganId('pancreas')}
                  className="cursor-pointer"
                  opacity={getOrganOpacity(COMMON_ORGANS.pancreas.yMin, scanProgress, isCycleComplete)}
                >
                  <path
                    d="M178 326 C195 320 225 324 236 334 C225 340 195 338 178 326 Z"
                    fill="url(#pancreasNeonGrad)"
                    stroke="#FACC15"
                    strokeWidth="1.2"
                  />
                </g>

                {/* 7. BILATERAL KIDNEYS */}
                <g
                  onClick={() => setSelectedOrganId('kidneys')}
                  className="cursor-pointer"
                  opacity={getOrganOpacity(COMMON_ORGANS.kidneys.yMin, scanProgress, isCycleComplete)}
                >
                  {/* Right Kidney */}
                  <ellipse cx="166" cy="342" rx="11" ry="17" fill="url(#kidneyNeonGrad)" stroke="#F59E0B" strokeWidth="1.5" />
                  {/* Left Kidney */}
                  <ellipse cx="234" cy="342" rx="11" ry="17" fill="url(#kidneyNeonGrad)" stroke="#F59E0B" strokeWidth="1.5" />
                </g>

                {/* 8. INTESTINES */}
                <g
                  onClick={() => setSelectedOrganId('intestines')}
                  className="cursor-pointer"
                  opacity={getOrganOpacity(COMMON_ORGANS.intestines.yMin, scanProgress, isCycleComplete)}
                >
                  {/* Colon Frame */}
                  <rect x="162" y="360" width="76" height="58" rx="10" stroke="#10B981" strokeWidth="2.5" fill="none" opacity="0.75" />
                  {/* Coiled Small Intestines */}
                  <path
                    d="M174 374 Q190 366 200 374 Q210 382 226 374
                       Q210 392 200 384 Q190 376 174 394
                       Q190 404 200 398 Q210 408 226 402"
                    stroke="#34D399"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>

                {/* 9. BLADDER */}
                <g
                  onClick={() => setSelectedOrganId('bladder')}
                  className="cursor-pointer"
                  opacity={getOrganOpacity(COMMON_ORGANS.bladder.yMin, scanProgress, isCycleComplete)}
                >
                  <ellipse cx="200" cy="452" rx="14" ry="11" fill="#3B82F6" stroke="#60A5FA" strokeWidth="1.5" opacity="0.85" />
                </g>

                {/* 10. REPRODUCTIVE SYSTEMS (ANATOMICALLY DISTINCT FOR MALE & FEMALE) */}
                {activeModel === 'female' ? (
                  /* FEMALE REPRODUCTIVE ANATOMY: UTERUS & OVARIES */
                  <g
                    onClick={() => setSelectedOrganId('uterus')}
                    className="cursor-pointer"
                    opacity={getOrganOpacity(FEMALE_SPECIFIC_ORGANS.uterus.yMin, scanProgress, isCycleComplete)}
                  >
                    {/* Uterine Body */}
                    <path
                      d="M192 436 C186 422 214 422 208 436 L204 456 L196 456 Z"
                      fill="url(#uterusNeonGrad)"
                      stroke="#EC4899"
                      strokeWidth="1.8"
                    />
                    {/* Left & Right Fallopian Tubes */}
                    <path d="M192 426 C176 420 168 430 164 434" stroke="#F472B6" strokeWidth="1.5" fill="none" />
                    <path d="M208 426 C224 420 232 430 236 434" stroke="#F472B6" strokeWidth="1.5" fill="none" />
                    {/* Left & Right Ovaries */}
                    <circle cx="162" cy="436" r="5.5" fill="url(#uterusNeonGrad)" stroke="#F43F5E" strokeWidth="1.5" />
                    <circle cx="238" cy="436" r="5.5" fill="url(#uterusNeonGrad)" stroke="#F43F5E" strokeWidth="1.5" />
                  </g>
                ) : (
                  /* MALE REPRODUCTIVE ANATOMY: PROSTATE GLAND & TESTES */
                  <g
                    onClick={() => setSelectedOrganId('prostate')}
                    className="cursor-pointer"
                    opacity={getOrganOpacity(MALE_SPECIFIC_ORGANS.prostate.yMin, scanProgress, isCycleComplete)}
                  >
                    {/* Prostate Gland (Directly inferior to bladder) */}
                    <path
                      d="M191 465 C190 460 210 460 209 465 L206 480 C204 484 196 484 194 480 Z"
                      fill="url(#prostateNeonGrad)"
                      stroke="#818CF8"
                      strokeWidth="1.8"
                    />
                    {/* Male Testes (Scrotal sac anatomy) */}
                    <ellipse cx="194" cy="498" rx="6" ry="8.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
                    <ellipse cx="206" cy="498" rx="6" ry="8.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
                  </g>
                )}

                {/* LAYER 4: THE CONTINUOUS AUTOMATIC NEON-BLUE SCANNING BEAM */}
                <g filter="url(#laserGlow)" style={{ transform: `translateY(${(scanProgress / 100) * 760}px)` }}>
                  {/* Broad Luminous Beam Flare */}
                  <rect x="20" y="25" width="360" height="28" fill="#00F0FF" opacity="0.18" />
                  {/* Concentrated Intense Laser Core */}
                  <line x1="20" y1="39" x2="380" y2="39" stroke="url(#laserBeamGrad)" strokeWidth="3.5" />
                  {/* Lateral Emitter Heads */}
                  <polygon points="18,34 32,39 18,44" fill="#00F0FF" />
                  <polygon points="382,34 368,39 382,44" fill="#00F0FF" />
                </g>
              </svg>
            </div>

            {/* Bottom Scan Stage Tracker */}
            <div className="w-full flex items-center justify-between text-[11px] font-mono text-cyan-400/80 pt-4 border-t border-cyan-500/20 max-w-[420px]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>CYCLE STATUS: {isCycleComplete ? 'FULL REVEAL' : 'SCANNING ACTIVE'}</span>
              </span>
              <span>LOOP: INFINITE</span>
            </div>
          </div>

          {/* RIGHT COLUMN: REAL-TIME ANATOMICAL TELEMETRY HUD CARD (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Active Organ Readout Card */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  {activeDisplayOrgan.system.toUpperCase()}
                </span>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeDisplayOrgan.color }} />
              </div>

              <div>
                <h3 className="text-lg font-black text-white tracking-tight">
                  {activeDisplayOrgan.name}
                </h3>
                <p className="text-xs font-mono text-cyan-400 italic">
                  {activeDisplayOrgan.latinName}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#030712] border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Telemetric Biomarker
                </span>
                <strong className="text-xs font-mono text-white block">
                  {activeDisplayOrgan.reading}
                </strong>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 pt-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {activeDisplayOrgan.status}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {activeDisplayOrgan.description}
              </p>
            </div>

            {/* Quick Organ Focus Buttons */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Quick Anatomical Focus
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['brain', 'heart', 'lungs', 'liver', 'kidneys', activeModel === 'female' ? 'uterus' : 'prostate'].map(id => {
                  const allOrgans = { ...COMMON_ORGANS, ...FEMALE_SPECIFIC_ORGANS, ...MALE_SPECIFIC_ORGANS };
                  const org = allOrgans[id];
                  if (!org) return null;
                  const isSelected = selectedOrganId === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSelectedOrganId(id)}
                      onMouseEnter={() => setHoveredOrganId(id)}
                      onMouseLeave={() => setHoveredOrganId(null)}
                      className={`p-2 rounded-xl text-left font-bold transition-all border ${
                        isSelected
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                          : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <span className="block text-[11px] truncate">{org.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hardware & Calibration Specs */}
            <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-[10px] font-mono text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>BEAM SPECTRUM:</span>
                <span className="text-cyan-400">460-485 nm ELECTRIC BLUE</span>
              </div>
              <div className="flex justify-between">
                <span>RECONSTRUCTION:</span>
                <span className="text-cyan-400">ISOTROPIC 0.25 mm VOXELS</span>
              </div>
              <div className="flex justify-between">
                <span>ORGAN REVEAL:</span>
                <span className="text-emerald-400">PROGRESSIVE EXCITATION</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal Helper: Calculate progressive organ opacity and illumination based on scanning beam position
function getOrganOpacity(organYMin: number, scanY: number, cycleComplete: boolean): number {
  if (cycleComplete) return 1.0; // Once cycle reaches bottom, entire body is illuminated

  // If beam has passed the organ, it stays illuminated
  if (scanY >= organYMin) {
    // If the beam is directly over the organ (within 8%), highlight it brightly
    if (Math.abs(scanY - organYMin) < 8) {
      return 1.0;
    }
    return 0.88;
  }

  // If beam has not reached this organ yet, faint transparent preview
  return 0.12;
}

// Sub-component: Skeletal System Vector Mesh (Bones)
const SkeletalGraphic: React.FC<{ profile: AnatomicalModelType }> = ({ profile }) => {
  const isFemale = profile === 'female';
  const shoulderSpan = isFemale ? 172 : 184;
  const pelvisWidth = isFemale ? 66 : 56;

  return (
    <g stroke="#CBD5E1" strokeWidth="1.5" opacity="0.65" fill="none">
      {/* Cranium & Jaw */}
      <circle cx="200" cy="85" r="26" fill="#F8FAFC" fillOpacity="0.1" />
      <path d="M190 110 L200 118 L210 110" />

      {/* Cervical & Thoracic Spine */}
      <line x1="200" y1="120" x2="200" y2="440" strokeWidth="3" strokeDasharray="3 3" />

      {/* Clavicles */}
      <line x1={200 - shoulderSpan / 2} y1="150" x2={200 + shoulderSpan / 2} y2="150" strokeWidth="2.5" />

      {/* Rib Cage Bands */}
      {[175, 195, 215, 235, 255, 275].map((y, idx) => (
        <path
          key={idx}
          d={`M${200 - (38 - idx * 2)} ${y} Q200 ${y + 12} ${200 + (38 - idx * 2)} ${y}`}
          strokeWidth="1.8"
        />
      ))}

      {/* Sternum */}
      <line x1="200" y1="170" x2="200" y2="280" strokeWidth="3" />

      {/* Pelvis Ring (Females have wider oval pelvic inlet) */}
      <ellipse cx="200" cy="442" rx={pelvisWidth / 2} ry="18" strokeWidth="2.5" />

      {/* Bilateral Femurs */}
      <line x1={200 - pelvisWidth / 2 + 5} y1="455" x2="160" y2="600" strokeWidth="3" />
      <line x1={200 + pelvisWidth / 2 - 5} y1="455" x2="240" y2="600" strokeWidth="3" />

      {/* Patellas */}
      <circle cx="160" cy="600" r="4" fill="#E2E8F0" />
      <circle cx="240" cy="600" r="4" fill="#E2E8F0" />

      {/* Tibia & Fibula */}
      <line x1="160" y1="604" x2="150" y2="760" strokeWidth="2.5" />
      <line x1="240" y1="604" x2="250" y2="760" strokeWidth="2.5" />

      {/* Arms (Humerus, Radius, Ulna) */}
      <line x1={200 - shoulderSpan / 2} y1="150" x2="110" y2="280" strokeWidth="2.5" />
      <line x1="110" y1="280" x2="68" y2="400" strokeWidth="2" />

      <line x1={200 + shoulderSpan / 2} y1="150" x2="290" y2="280" strokeWidth="2.5" />
      <line x1="290" y1="280" x2="332" y2="400" strokeWidth="2" />
    </g>
  );
};
