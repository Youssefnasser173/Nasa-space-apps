import React from 'react';

// Highly detailed realistic anatomical SVG graphics inspired by medical 3D renders

export const RealisticLungsGraphic: React.FC<{
  className?: string;
  activeHotspot?: string | null;
  onHotspotClick?: (id: string) => void;
}> = ({ className = "w-full h-full", activeHotspot, onHotspotClick }) => {
  return (
    <svg
      viewBox="0 0 500 500"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Lungs Gradient: Rich Salmon, Rose, Tissue Red, and Depth Shadows */}
        <linearGradient id="lungLeftGrad" x1="140" y1="120" x2="240" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DF7B72" />
          <stop offset="35%" stopColor="#C95950" />
          <stop offset="70%" stopColor="#A83E36" />
          <stop offset="100%" stopColor="#7E2822" />
        </linearGradient>

        <linearGradient id="lungRightGrad" x1="360" y1="120" x2="260" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E58880" />
          <stop offset="35%" stopColor="#CE6259" />
          <stop offset="70%" stopColor="#B0433B" />
          <stop offset="100%" stopColor="#822C26" />
        </linearGradient>

        {/* Trachea Cartilage Rings Gradient */}
        <linearGradient id="tracheaGrad" x1="230" y1="20" x2="270" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="50%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>

        {/* Pulmonary Artery Blue/Purple */}
        <linearGradient id="pulmonaryArtery" x1="220" y1="180" x2="280" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#377DFF" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>

        {/* Soft Drop Shadow for Organ Depth */}
        <filter id="organShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#1C2D43" floodOpacity="0.18" />
        </filter>

        {/* Tissue Micro-texture Pattern */}
        <pattern id="alveoliPattern" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1.2" fill="#FFFFFF" opacity="0.08" />
          <circle cx="12" cy="12" r="1.5" fill="#581A16" opacity="0.12" />
          <circle cx="12" cy="4" r="0.8" fill="#FFFFFF" opacity="0.06" />
          <circle cx="4" cy="12" r="1" fill="#581A16" opacity="0.1" />
        </pattern>
      </defs>

      {/* Background Target Radar Rings */}
      <circle cx="250" cy="260" r="190" stroke="#377DFF" strokeWidth="1" strokeDasharray="4 6" opacity="0.15" />
      <circle cx="250" cy="260" r="140" stroke="#377DFF" strokeWidth="1" opacity="0.2" />
      <circle cx="250" cy="260" r="80" stroke="#377DFF" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.25" />

      {/* Trachea & Main Bronchi */}
      <g filter="url(#organShadow)">
        {/* Main Trachea Tube */}
        <path
          d="M236 30 L236 170 Q236 186 220 205 L190 225 L202 242 L234 218 Q248 206 252 206 Q256 206 270 218 L302 242 L314 225 L284 205 Q268 186 268 170 L268 30 Z"
          fill="url(#tracheaGrad)"
          stroke="#94A3B8"
          strokeWidth="1.5"
        />

        {/* Trachea Cartilage Ridges */}
        {[45, 60, 75, 90, 105, 120, 135, 150, 165].map((y, i) => (
          <ellipse
            key={i}
            cx="252"
            cy={y}
            rx="15"
            ry="4.5"
            fill="none"
            stroke="#64748B"
            strokeWidth="2"
            opacity="0.65"
          />
        ))}

        {/* Pulmonary Arteries at Hilum */}
        <ellipse cx="230" cy="210" rx="14" ry="10" fill="url(#pulmonaryArtery)" opacity="0.85" />
        <ellipse cx="274" cy="210" rx="14" ry="10" fill="url(#pulmonaryArtery)" opacity="0.85" />

        {/* RIGHT LUNG (Viewer's Left) */}
        <g id="rightLung">
          <path
            d="M228 178
               C215 150 185 110 160 115
               C135 120 115 145 102 185
               C88 230 80 280 82 335
               C84 380 102 415 145 410
               C175 406 205 385 224 350
               C238 325 240 285 236 240
               C234 210 232 195 228 178 Z"
            fill="url(#lungLeftGrad)"
            stroke="#7E2822"
            strokeWidth="1.5"
          />
          {/* Tissue overlay */}
          <path
            d="M228 178 C215 150 185 110 160 115 C135 120 115 145 102 185 C88 230 80 280 82 335 C84 380 102 415 145 410 C175 406 205 385 224 350 C238 325 240 285 236 240 C234 210 232 195 228 178 Z"
            fill="url(#alveoliPattern)"
          />
          {/* Fissure lines (Superior, Middle, Inferior lobes) */}
          <path
            d="M102 245 C135 255 185 260 234 242"
            stroke="#5A1A15"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.75"
          />
          <path
            d="M110 320 C150 318 190 328 225 348"
            stroke="#5A1A15"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
          {/* Highlight reflex */}
          <path
            d="M150 135 C130 145 118 170 110 205"
            stroke="#FFAEA6"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.4"
          />
        </g>

        {/* LEFT LUNG (Viewer's Right - with Cardiac Notch) */}
        <g id="leftLung">
          <path
            d="M276 178
               C289 150 319 110 344 115
               C369 120 389 145 402 185
               C416 230 424 280 422 335
               C420 380 402 415 359 410
               C330 406 304 385 288 360
               C268 330 262 295 264 260
               C266 230 272 200 276 178 Z"
            fill="url(#lungRightGrad)"
            stroke="#822C26"
            strokeWidth="1.5"
          />
          {/* Tissue overlay */}
          <path
            d="M276 178 C289 150 319 110 344 115 C369 120 389 145 402 185 C416 230 424 280 422 335 C420 380 402 415 359 410 C330 406 304 385 288 360 C268 330 262 295 264 260 C266 230 272 200 276 178 Z"
            fill="url(#alveoliPattern)"
          />
          {/* Oblique Fissure (Left Lung has 2 lobes) */}
          <path
            d="M398 230 C365 255 320 285 272 310"
            stroke="#5A1A15"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* Highlight reflex */}
          <path
            d="M354 135 C374 145 386 170 394 205"
            stroke="#FFB4AC"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.4"
          />
        </g>
      </g>

      {/* Interactive Glowing Radar Hotspots */}
      {/* Hotspot 1: Trachea / Main Airway */}
      <HotspotNode
        x={252}
        y={110}
        id="trachea"
        label="Carina & Trachea"
        active={activeHotspot === 'trachea'}
        onClick={() => onHotspotClick && onHotspotClick('trachea')}
      />

      {/* Hotspot 2: Right Superior Lobe */}
      <HotspotNode
        x={165}
        y={200}
        id="right_lobe"
        label="Right Superior Lobe"
        active={activeHotspot === 'right_lobe'}
        onClick={() => onHotspotClick && onHotspotClick('right_lobe')}
      />

      {/* Hotspot 3: Pulmonary Artery / Hilum */}
      <HotspotNode
        x={232}
        y={215}
        id="pulmonary_vessels"
        label="Pulmonary Artery"
        active={activeHotspot === 'pulmonary_vessels'}
        onClick={() => onHotspotClick && onHotspotClick('pulmonary_vessels')}
      />

      {/* Hotspot 4: Left Inferior Lobe */}
      <HotspotNode
        x={350}
        y={300}
        id="left_lobe"
        label="Left Inferior Lobe"
        active={activeHotspot === 'left_lobe'}
        onClick={() => onHotspotClick && onHotspotClick('left_lobe')}
      />

      {/* Hotspot 5: Base Alveolar Capillary Bed */}
      <HotspotNode
        x={150}
        y={350}
        id="base_bed"
        label="Alveolar Gas Exchange"
        active={activeHotspot === 'base_bed'}
        onClick={() => onHotspotClick && onHotspotClick('base_bed')}
      />
    </svg>
  );
};

export const RealisticBrainGraphic: React.FC<{
  className?: string;
  activeHotspot?: string | null;
  onHotspotClick?: (id: string) => void;
}> = ({ className = "w-full h-full", activeHotspot, onHotspotClick }) => {
  return (
    <svg
      viewBox="0 0 500 500"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cortexGrad" x1="120" y1="120" x2="380" y2="340" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F4A5A5" />
          <stop offset="35%" stopColor="#DF7E82" />
          <stop offset="70%" stopColor="#BA545C" />
          <stop offset="100%" stopColor="#872935" />
        </linearGradient>

        <linearGradient id="cerebellumGrad" x1="300" y1="310" x2="420" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#CF6B72" />
          <stop offset="100%" stopColor="#75222E" />
        </linearGradient>

        <linearGradient id="brainstemGrad" x1="260" y1="340" x2="310" y2="440" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="50%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>

        <filter id="brainShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#1C2D43" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Target Radar Rings */}
      <circle cx="260" cy="250" r="190" stroke="#8064D8" strokeWidth="1" strokeDasharray="4 6" opacity="0.15" />
      <circle cx="260" cy="250" r="140" stroke="#8064D8" strokeWidth="1" opacity="0.2" />

      <g filter="url(#brainShadow)">
        {/* Brainstem (Pons & Medulla) */}
        <path
          d="M260 330 C255 360 250 395 245 435 L285 435 C288 395 292 360 290 330 Z"
          fill="url(#brainstemGrad)"
          stroke="#64748B"
          strokeWidth="1.5"
        />
        {/* Horizontal Brainstem Striae */}
        {[355, 375, 395, 415].map((y, i) => (
          <line key={i} x1="250" y1={y} x2="286" y2={y} stroke="#64748B" strokeWidth="1.2" opacity="0.5" />
        ))}

        {/* Cerebellum with horizontal folia lines */}
        <path
          d="M285 320 C320 310 380 320 405 350 C418 368 412 395 385 410 C350 422 305 405 285 380 Z"
          fill="url(#cerebellumGrad)"
          stroke="#75222E"
          strokeWidth="1.5"
        />
        {/* Folia striations */}
        {[335, 350, 365, 380, 395].map((y, i) => (
          <path
            key={i}
            d={`M${295 + i * 3} ${y} Q${350 + i * 5} ${y + 5} ${395 - i * 4} ${y - 4}`}
            stroke="#FFA6B0"
            strokeWidth="1.2"
            opacity="0.45"
            fill="none"
          />
        ))}

        {/* Cerebrum Main Hemisphere (Frontal, Parietal, Occipital, Temporal Lobes) */}
        <path
          d="M120 270
             C95 250 90 200 115 155
             C145 105 200 85 270 90
             C340 95 395 125 415 175
             C430 215 425 265 395 300
             C375 325 340 330 310 325
             C280 320 265 310 245 320
             C215 335 185 335 160 315
             C135 295 125 280 120 270 Z"
          fill="url(#cortexGrad)"
          stroke="#872935"
          strokeWidth="2"
        />

        {/* Deep Cerebral Sulci & Gyri (Brain Folds) */}
        <path
          d="M140 180 Q190 195 220 170 Q260 145 300 175 Q340 200 390 180"
          stroke="#681923"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        />
        <path
          d="M130 220 Q170 230 205 205 Q245 185 275 220 Q310 250 360 225 Q395 210 410 240"
          stroke="#681923"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        />
        <path
          d="M145 260 Q180 270 215 250 Q255 235 285 265 Q315 290 355 275"
          stroke="#681923"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M175 130 Q220 145 250 125 Q285 110 325 130 Q360 145 385 135"
          stroke="#681923"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        {/* Temporal lobe sulcus */}
        <path
          d="M165 290 Q200 305 230 290 Q260 280 285 295"
          stroke="#681923"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.65"
        />

        {/* Cortical Highlight Reflexes */}
        <path
          d="M160 115 C210 98 270 102 330 112"
          stroke="#FFCBD2"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.5"
          fill="none"
        />
      </g>

      {/* Hotspots */}
      <HotspotNode
        x={140}
        y={190}
        id="frontal_lobe"
        label="Prefrontal Cortex"
        active={activeHotspot === 'frontal_lobe'}
        onClick={() => onHotspotClick && onHotspotClick('frontal_lobe')}
      />

      <HotspotNode
        x={270}
        y={150}
        id="parietal_lobe"
        label="Parietal Cortex (ICP)"
        active={activeHotspot === 'parietal_lobe'}
        onClick={() => onHotspotClick && onHotspotClick('parietal_lobe')}
      />

      <HotspotNode
        x={390}
        y={230}
        id="occipital_lobe"
        label="Occipital Lobe (SANS)"
        active={activeHotspot === 'occipital_lobe'}
        onClick={() => onHotspotClick && onHotspotClick('occipital_lobe')}
      />

      <HotspotNode
        x={220}
        y={275}
        id="temporal_lobe"
        label="Temporal Lobe & Hippocampus"
        active={activeHotspot === 'temporal_lobe'}
        onClick={() => onHotspotClick && onHotspotClick('temporal_lobe')}
      />

      <HotspotNode
        x={350}
        y={360}
        id="cerebellum"
        label="Cerebellum (Vestibular)"
        active={activeHotspot === 'cerebellum'}
        onClick={() => onHotspotClick && onHotspotClick('cerebellum')}
      />
    </svg>
  );
};

export const RealisticHeartGraphic: React.FC<{
  className?: string;
  activeHotspot?: string | null;
  onHotspotClick?: (id: string) => void;
}> = ({ className = "w-full h-full", activeHotspot, onHotspotClick }) => {
  return (
    <svg
      viewBox="0 0 500 500"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Myocardium Gradient */}
        <linearGradient id="heartMuscleGrad" x1="180" y1="120" x2="320" y2="440" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E06256" />
          <stop offset="30%" stopColor="#C63E34" />
          <stop offset="65%" stopColor="#9C241D" />
          <stop offset="100%" stopColor="#6E1510" />
        </linearGradient>

        {/* Aorta Red-Orange Gradient */}
        <linearGradient id="aortaGrad" x1="220" y1="50" x2="310" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="50%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>

        {/* Superior Vena Cava / Pulmonary Artery Blue */}
        <linearGradient id="vesselsBlue" x1="170" y1="50" x2="250" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>

        <filter id="heartShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#1C2D43" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Target Radar Rings */}
      <circle cx="260" cy="270" r="190" stroke="#EE7068" strokeWidth="1" strokeDasharray="4 6" opacity="0.15" />
      <circle cx="260" cy="270" r="140" stroke="#EE7068" strokeWidth="1" opacity="0.2" />

      <g filter="url(#heartShadow)">
        {/* Superior Vena Cava */}
        <path
          d="M190 70 L190 160 L220 160 L220 70 Z"
          fill="url(#vesselsBlue)"
          stroke="#1E40AF"
          strokeWidth="1.5"
        />

        {/* Pulmonary Artery Trunk */}
        <path
          d="M235 150 Q260 120 300 130 L320 150 L280 180 Q250 170 235 150 Z"
          fill="url(#vesselsBlue)"
          stroke="#1E40AF"
          strokeWidth="1.5"
        />

        {/* Aortic Arch & Brachiocephalic Branches */}
        <path
          d="M230 160
             C225 110 245 55 295 60
             C330 65 345 100 335 150
             L310 155
             C315 115 305 90 285 88
             C260 85 245 115 248 160 Z"
          fill="url(#aortaGrad)"
          stroke="#991B1B"
          strokeWidth="1.5"
        />
        {/* 3 Aortic Branches */}
        <rect x="260" y="38" width="10" height="28" rx="4" fill="url(#aortaGrad)" stroke="#991B1B" />
        <rect x="280" y="34" width="10" height="32" rx="4" fill="url(#aortaGrad)" stroke="#991B1B" />
        <rect x="302" y="42" width="9" height="26" rx="4" fill="url(#aortaGrad)" stroke="#991B1B" />

        {/* Right Atrium */}
        <path
          d="M175 160 C155 190 160 240 185 260 L210 230 C200 190 195 170 175 160 Z"
          fill="#B93830"
          stroke="#8A1F18"
          strokeWidth="1.5"
        />

        {/* Ventricles (Main Cardiac Muscle Cone) */}
        <path
          d="M205 200
             C180 230 175 280 200 340
             C220 390 260 440 280 448
             C295 448 325 390 350 330
             C375 270 365 210 325 180
             C290 155 240 170 205 200 Z"
          fill="url(#heartMuscleGrad)"
          stroke="#6E1510"
          strokeWidth="2"
        />

        {/* Anterior Interventricular Sulcus with Coronary Artery and Vein */}
        <path
          d="M265 190
             C255 230 260 270 250 320
             C242 360 250 400 275 442"
          stroke="#EF4444"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Coronary Vein companion */}
        <path
          d="M268 195
             C258 235 263 275 253 325
             C245 365 253 405 277 442"
          stroke="#3B82F6"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />

        {/* Branching Coronary Arterioles */}
        <path d="M255 240 Q235 260 215 265" stroke="#FCA5A5" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M256 280 Q285 295 315 290" stroke="#FCA5A5" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M248 340 Q230 360 220 380" stroke="#FCA5A5" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M252 370 Q275 385 295 380" stroke="#FCA5A5" strokeWidth="1.2" strokeLinecap="round" fill="none" />

        {/* Muscular Highlight Reflex */}
        <path
          d="M205 260 C195 290 205 340 225 380"
          stroke="#FFA59E"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.45"
          fill="none"
        />
      </g>

      {/* Hotspots */}
      <HotspotNode
        x={280}
        y={80}
        id="aorta"
        label="Ascending Aorta (1.2 m/s)"
        active={activeHotspot === 'aorta'}
        onClick={() => onHotspotClick && onHotspotClick('aorta')}
      />

      <HotspotNode
        x={280}
        y={150}
        id="pulmonary_trunk"
        label="Pulmonary Trunk"
        active={activeHotspot === 'pulmonary_trunk'}
        onClick={() => onHotspotClick && onHotspotClick('pulmonary_trunk')}
      />

      <HotspotNode
        x={185}
        y={210}
        id="right_atrium"
        label="Right Atrium & CVP"
        active={activeHotspot === 'right_atrium'}
        onClick={() => onHotspotClick && onHotspotClick('right_atrium')}
      />

      <HotspotNode
        x={295}
        y={300}
        id="left_ventricle"
        label="Left Ventricle (LVEF 62%)"
        active={activeHotspot === 'left_ventricle'}
        onClick={() => onHotspotClick && onHotspotClick('left_ventricle')}
      />

      <HotspotNode
        x={275}
        y={425}
        id="cardiac_apex"
        label="Cardiac Apex"
        active={activeHotspot === 'cardiac_apex'}
        onClick={() => onHotspotClick && onHotspotClick('cardiac_apex')}
      />
    </svg>
  );
};

// Reusable Pulsing Hotspot Node Component
const HotspotNode: React.FC<{
  x: number;
  y: number;
  id: string;
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ x, y, id, label, active, onClick }) => {
  return (
    <g
      className="cursor-pointer group"
      onClick={e => {
        e.stopPropagation();
        onClick();
      }}
    >
      {/* Expanding Ripple Ring */}
      <circle
        cx={x}
        cy={y}
        r={active ? 18 : 12}
        fill="#377DFF"
        fillOpacity={active ? "0.35" : "0.2"}
        className="animate-ping"
        style={{ animationDuration: active ? '1.5s' : '2.5s' }}
      />
      {/* Solid Backdrop Ring */}
      <circle
        cx={x}
        cy={y}
        r="10"
        fill="#FFFFFF"
        stroke={active ? "#2457D6" : "#377DFF"}
        strokeWidth="2.5"
        className="filter drop-shadow-md transition-all group-hover:scale-110"
      />
      {/* Inner Glowing Center Dot */}
      <circle
        cx={x}
        cy={y}
        r="4.5"
        fill={active ? "#2457D6" : "#377DFF"}
        className="transition-all"
      />

      {/* Quick Label on Hover / Active */}
      {active && (
        <g transform={`translate(${x > 250 ? x - 130 : x + 16}, ${y - 12})`}>
          <rect
            width="125"
            height="26"
            rx="6"
            fill="#1C2D43"
            opacity="0.92"
            className="shadow-lg"
          />
          <text
            x="62"
            y="17"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="10"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            {label}
          </text>
        </g>
      )}
    </g>
  );
};
