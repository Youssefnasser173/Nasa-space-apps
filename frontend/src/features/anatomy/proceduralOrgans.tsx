import React, { useMemo } from 'react';
import * as THREE from 'three';
import { OrganKey, AnatomicalModelType } from '../../types';
import { ORGAN_DEFINITIONS } from '../../constants/organs';

interface OrganMeshProps {
  organKey: OrganKey;
  isSelected?: boolean;
  isHovered?: boolean;
  scanHeight?: number;
  scanActive?: boolean;
  onClick?: () => void;
  onPointerOver?: (e: any) => void;
  onPointerOut?: () => void;
}

// 1. BRAIN
export const BrainComponent: React.FC<OrganMeshProps & { scale?: number; position?: [number, number, number] }> = ({
  isSelected,
  isHovered,
  scale = 1,
  position = [0, 1.62, 0],
  onClick,
  onPointerOver,
  onPointerOut
}) => {
  const baseColor = ORGAN_DEFINITIONS.brain.anatomicalColor;

  return (
    <group
      position={position}
      scale={scale}
      onClick={e => { e.stopPropagation(); onClick?.(); }}
      onPointerOver={e => { e.stopPropagation(); onPointerOver?.(e); }}
      onPointerOut={e => { e.stopPropagation(); onPointerOut?.(); }}
    >
      {/* Left Hemisphere */}
      <mesh position={[-0.11, 0.05, 0]}>
        <sphereGeometry args={[0.22, 32, 24]} />
        <meshStandardMaterial
          color={isHovered ? '#B88484' : baseColor}
          roughness={0.65}
          metalness={0.1}
          bumpScale={0.05}
          emissive={isSelected ? '#8064D8' : (isHovered ? '#6044B8' : '#000000')}
          emissiveIntensity={isSelected ? 0.4 : (isHovered ? 0.25 : 0)}
        />
      </mesh>
      {/* Right Hemisphere */}
      <mesh position={[0.11, 0.05, 0]}>
        <sphereGeometry args={[0.22, 32, 24]} />
        <meshStandardMaterial
          color={isHovered ? '#B88484' : baseColor}
          roughness={0.65}
          metalness={0.1}
          bumpScale={0.05}
          emissive={isSelected ? '#8064D8' : (isHovered ? '#6044B8' : '#000000')}
          emissiveIntensity={isSelected ? 0.4 : (isHovered ? 0.25 : 0)}
        />
      </mesh>
      {/* Frontal Lobes */}
      <mesh position={[0, 0.08, 0.12]} scale={[1.1, 0.8, 0.9]}>
        <sphereGeometry args={[0.17, 24, 20]} />
        <meshStandardMaterial color={baseColor} roughness={0.7} />
      </mesh>
      {/* Cerebellum */}
      <mesh position={[0, -0.15, -0.11]} scale={[1.3, 0.8, 1.0]}>
        <sphereGeometry args={[0.14, 24, 18]} />
        <meshStandardMaterial color="#C28A8A" roughness={0.75} />
      </mesh>
      {/* Brainstem / Medulla */}
      <mesh position={[0, -0.26, -0.05]}>
        <cylinderGeometry args={[0.05, 0.04, 0.18, 16]} />
        <meshStandardMaterial color="#DEC0C0" roughness={0.6} />
      </mesh>
    </group>
  );
};

// 2. HEART
export const HeartComponent: React.FC<OrganMeshProps & { scale?: number; position?: [number, number, number] }> = ({
  isSelected,
  isHovered,
  scale = 1,
  position = [0.03, 0.78, 0.08],
  onClick,
  onPointerOver,
  onPointerOut
}) => {
  const baseColor = ORGAN_DEFINITIONS.heart.anatomicalColor;

  return (
    <group
      position={position}
      scale={scale}
      rotation={[0.1, 0.2, -0.15]}
      onClick={e => { e.stopPropagation(); onClick?.(); }}
      onPointerOver={e => { e.stopPropagation(); onPointerOver?.(e); }}
      onPointerOut={e => { e.stopPropagation(); onPointerOut?.(); }}
    >
      {/* Left & Right Ventricles (Muscular apex) */}
      <mesh position={[0, -0.06, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.19, 0.34, 24]} />
        <meshStandardMaterial
          color={isHovered ? '#B52828' : baseColor}
          roughness={0.45}
          metalness={0.15}
          emissive={isSelected ? '#EE7068' : (isHovered ? '#AA3333' : '#000000')}
          emissiveIntensity={isSelected ? 0.45 : (isHovered ? 0.3 : 0)}
        />
      </mesh>
      {/* Atria base */}
      <mesh position={[-0.07, 0.12, 0.01]} scale={[1.1, 0.85, 1.0]}>
        <sphereGeometry args={[0.13, 20, 16]} />
        <meshStandardMaterial color="#881E1E" roughness={0.5} />
      </mesh>
      <mesh position={[0.07, 0.12, 0.01]} scale={[1.0, 0.85, 1.0]}>
        <sphereGeometry args={[0.12, 20, 16]} />
        <meshStandardMaterial color="#881E1E" roughness={0.5} />
      </mesh>
      {/* Aortic Arch */}
      <mesh position={[-0.02, 0.24, -0.02]} rotation={[0.4, -0.3, 0.2]}>
        <torusGeometry args={[0.09, 0.038, 16, 24, Math.PI * 0.9]} />
        <meshStandardMaterial color="#E63946" roughness={0.35} metalness={0.2} />
      </mesh>
      {/* Superior Vena Cava */}
      <mesh position={[0.1, 0.22, -0.04]} rotation={[0, 0, -0.1]}>
        <cylinderGeometry args={[0.032, 0.035, 0.16, 16]} />
        <meshStandardMaterial color="#1D3557" roughness={0.4} />
      </mesh>
      {/* Pulmonary Trunk */}
      <mesh position={[-0.04, 0.18, 0.09]} rotation={[0.3, 0.2, 0.1]}>
        <cylinderGeometry args={[0.035, 0.038, 0.12, 16]} />
        <meshStandardMaterial color="#3B82F6" roughness={0.4} />
      </mesh>
    </group>
  );
};

// 3. RIGHT LUNG
export const RightLungComponent: React.FC<OrganMeshProps & { scale?: number; position?: [number, number, number] }> = ({
  isSelected,
  isHovered,
  scale = 1,
  position = [-0.22, 0.77, 0.02],
  onClick,
  onPointerOver,
  onPointerOut
}) => {
  const baseColor = ORGAN_DEFINITIONS['right-lung'].anatomicalColor;

  return (
    <group
      position={position}
      scale={scale}
      onClick={e => { e.stopPropagation(); onClick?.(); }}
      onPointerOver={e => { e.stopPropagation(); onPointerOver?.(e); }}
      onPointerOut={e => { e.stopPropagation(); onPointerOut?.(); }}
    >
      {/* Superior Lobe */}
      <mesh position={[0, 0.15, 0]} scale={[1.0, 1.25, 0.85]}>
        <coneGeometry args={[0.16, 0.35, 20]} />
        <meshStandardMaterial
          color={isHovered ? '#F0A59E' : baseColor}
          roughness={0.55}
          emissive={isSelected ? '#13A6A6' : (isHovered ? '#0E7A7A' : '#000000')}
          emissiveIntensity={isSelected ? 0.45 : (isHovered ? 0.25 : 0)}
        />
      </mesh>
      {/* Middle Lobe */}
      <mesh position={[0.02, -0.02, 0.03]} scale={[1.1, 0.75, 0.9]}>
        <sphereGeometry args={[0.16, 20, 16]} />
        <meshStandardMaterial color={baseColor} roughness={0.55} />
      </mesh>
      {/* Inferior Lobe */}
      <mesh position={[-0.01, -0.18, -0.02]} scale={[1.15, 0.95, 0.95]}>
        <sphereGeometry args={[0.18, 20, 16]} />
        <meshStandardMaterial color="#D8827A" roughness={0.6} />
      </mesh>
    </group>
  );
};

// 4. LEFT LUNG
export const LeftLungComponent: React.FC<OrganMeshProps & { scale?: number; position?: [number, number, number] }> = ({
  isSelected,
  isHovered,
  scale = 1,
  position = [0.24, 0.77, 0.02],
  onClick,
  onPointerOver,
  onPointerOut
}) => {
  const baseColor = ORGAN_DEFINITIONS['left-lung'].anatomicalColor;

  return (
    <group
      position={position}
      scale={scale}
      onClick={e => { e.stopPropagation(); onClick?.(); }}
      onPointerOver={e => { e.stopPropagation(); onPointerOver?.(e); }}
      onPointerOut={e => { e.stopPropagation(); onPointerOut?.(); }}
    >
      {/* Superior Lobe with cardiac notch */}
      <mesh position={[-0.02, 0.14, 0]} scale={[0.95, 1.25, 0.85]}>
        <coneGeometry args={[0.15, 0.35, 20]} />
        <meshStandardMaterial
          color={isHovered ? '#F0A59E' : baseColor}
          roughness={0.55}
          emissive={isSelected ? '#13A6A6' : (isHovered ? '#0E7A7A' : '#000000')}
          emissiveIntensity={isSelected ? 0.45 : (isHovered ? 0.25 : 0)}
        />
      </mesh>
      {/* Inferior Lobe */}
      <mesh position={[0.02, -0.16, -0.02]} scale={[1.05, 1.0, 0.95]}>
        <sphereGeometry args={[0.18, 20, 16]} />
        <meshStandardMaterial color="#D8827A" roughness={0.6} />
      </mesh>
    </group>
  );
};

// 5. LIVER
export const LiverComponent: React.FC<OrganMeshProps & { scale?: number; position?: [number, number, number] }> = ({
  isSelected,
  isHovered,
  scale = 1,
  position = [-0.12, 0.44, 0.06],
  onClick,
  onPointerOver,
  onPointerOut
}) => {
  const baseColor = ORGAN_DEFINITIONS.liver.anatomicalColor;

  return (
    <group
      position={position}
      scale={scale}
      rotation={[-0.1, 0.15, -0.1]}
      onClick={e => { e.stopPropagation(); onClick?.(); }}
      onPointerOver={e => { e.stopPropagation(); onPointerOver?.(e); }}
      onPointerOut={e => { e.stopPropagation(); onPointerOut?.(); }}
    >
      {/* Right large lobe */}
      <mesh position={[-0.08, 0, 0]} scale={[1.4, 0.85, 0.95]}>
        <sphereGeometry args={[0.22, 24, 18]} />
        <meshStandardMaterial
          color={isHovered ? '#A44230' : baseColor}
          roughness={0.5}
          emissive={isSelected ? '#E9A33B' : (isHovered ? '#8A3220' : '#000000')}
          emissiveIntensity={isSelected ? 0.45 : (isHovered ? 0.25 : 0)}
        />
      </mesh>
      {/* Left tapering lobe */}
      <mesh position={[0.14, 0.02, 0.01]} scale={[1.1, 0.6, 0.8]}>
        <sphereGeometry args={[0.15, 20, 16]} />
        <meshStandardMaterial color={baseColor} roughness={0.5} />
      </mesh>
    </group>
  );
};

// 6. STOMACH
export const StomachComponent: React.FC<OrganMeshProps & { scale?: number; position?: [number, number, number] }> = ({
  isSelected,
  isHovered,
  scale = 1,
  position = [0.14, 0.42, 0.08],
  onClick,
  onPointerOver,
  onPointerOut
}) => {
  const baseColor = ORGAN_DEFINITIONS.stomach.anatomicalColor;

  return (
    <group
      position={position}
      scale={scale}
      rotation={[0.1, -0.2, 0.25]}
      onClick={e => { e.stopPropagation(); onClick?.(); }}
      onPointerOver={e => { e.stopPropagation(); onPointerOver?.(e); }}
      onPointerOut={e => { e.stopPropagation(); onPointerOut?.(); }}
    >
      {/* Gastric Fundus / Body (J-curve) */}
      <mesh position={[0, 0.05, 0]} scale={[1.0, 1.3, 0.85]}>
        <sphereGeometry args={[0.18, 20, 18]} />
        <meshStandardMaterial
          color={isHovered ? '#E8ACA4' : baseColor}
          roughness={0.55}
          emissive={isSelected ? '#EE7068' : (isHovered ? '#AA4440' : '#000000')}
          emissiveIntensity={isSelected ? 0.45 : (isHovered ? 0.25 : 0)}
        />
      </mesh>
      {/* Pylorus duct */}
      <mesh position={[-0.12, -0.1, 0.02]} rotation={[0, 0, -0.6]}>
        <cylinderGeometry args={[0.06, 0.05, 0.16, 16]} />
        <meshStandardMaterial color="#D88A82" roughness={0.6} />
      </mesh>
    </group>
  );
};

// 7. KIDNEYS
export const KidneyComponent: React.FC<OrganMeshProps & { side: 'right' | 'left'; scale?: number; position?: [number, number, number] }> = ({
  side,
  isSelected,
  isHovered,
  scale = 1,
  position = side === 'right' ? [-0.18, 0.32, -0.06] : [0.18, 0.35, -0.06],
  onClick,
  onPointerOver,
  onPointerOut
}) => {
  const baseColor = ORGAN_DEFINITIONS['right-kidney'].anatomicalColor;

  return (
    <group
      position={position}
      scale={scale}
      rotation={[0, side === 'right' ? 0.2 : -0.2, side === 'right' ? -0.15 : 0.15]}
      onClick={e => { e.stopPropagation(); onClick?.(); }}
      onPointerOver={e => { e.stopPropagation(); onPointerOver?.(e); }}
      onPointerOut={e => { e.stopPropagation(); onPointerOut?.(); }}
    >
      {/* Bean shape */}
      <mesh scale={[0.75, 1.35, 0.7]}>
        <sphereGeometry args={[0.12, 20, 18]} />
        <meshStandardMaterial
          color={isHovered ? '#92362A' : baseColor}
          roughness={0.45}
          emissive={isSelected ? '#E9A33B' : (isHovered ? '#72281E' : '#000000')}
          emissiveIntensity={isSelected ? 0.45 : (isHovered ? 0.25 : 0)}
        />
      </mesh>
      {/* Renal pelvis / vessels */}
      <mesh position={[side === 'right' ? 0.06 : -0.06, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.03, 0.08, 12]} />
        <meshStandardMaterial color="#A03020" roughness={0.4} />
      </mesh>
    </group>
  );
};

// 8. INTESTINES
export const IntestinesComponent: React.FC<OrganMeshProps & { scale?: number; position?: [number, number, number] }> = ({
  isSelected,
  isHovered,
  scale = 1,
  position = [0, 0.15, 0.08],
  onClick,
  onPointerOver,
  onPointerOut
}) => {
  const baseColor = ORGAN_DEFINITIONS.intestines.anatomicalColor;

  return (
    <group
      position={position}
      scale={scale}
      onClick={e => { e.stopPropagation(); onClick?.(); }}
      onPointerOver={e => { e.stopPropagation(); onPointerOver?.(e); }}
      onPointerOut={e => { e.stopPropagation(); onPointerOut?.(); }}
    >
      {/* Coiled loops representation */}
      <mesh scale={[1.35, 0.95, 0.85]}>
        <sphereGeometry args={[0.22, 24, 20]} />
        <meshStandardMaterial
          color={isHovered ? '#F0B8B0' : baseColor}
          roughness={0.65}
          emissive={isSelected ? '#159B73' : (isHovered ? '#107556' : '#000000')}
          emissiveIntensity={isSelected ? 0.45 : (isHovered ? 0.25 : 0)}
        />
      </mesh>
      {/* Colon Frame */}
      <mesh position={[0, 0.14, 0.02]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.38, 16]} />
        <meshStandardMaterial color="#D89286" roughness={0.7} />
      </mesh>
      <mesh position={[-0.19, -0.05, 0.01]}>
        <cylinderGeometry args={[0.06, 0.06, 0.32, 16]} />
        <meshStandardMaterial color="#D89286" roughness={0.7} />
      </mesh>
      <mesh position={[0.19, -0.05, 0.01]}>
        <cylinderGeometry args={[0.06, 0.06, 0.32, 16]} />
        <meshStandardMaterial color="#D89286" roughness={0.7} />
      </mesh>
    </group>
  );
};

// 9. SKELETAL SYSTEM (Skull, Spine, Ribs, Pelvis, Limbs)
export const SkeletalSystemComponent: React.FC<{
  profile: AnatomicalModelType;
  isSelected?: boolean;
  isHovered?: boolean;
  onClick?: () => void;
}> = ({ profile, isSelected, isHovered, onClick }) => {
  const boneColor = '#F4EFE6';
  const shoulderWidth = profile === 'female' ? 0.48 : 0.58;
  const hipWidth = profile === 'female' ? 0.34 : 0.30;

  return (
    <group onClick={e => { e.stopPropagation(); onClick?.(); }}>
      {/* Cranium Skull */}
      <mesh position={[0, 1.62, 0]} scale={[0.88, 1.1, 1.0]}>
        <sphereGeometry args={[0.26, 24, 20]} />
        <meshStandardMaterial
          color={boneColor}
          roughness={0.75}
          metalness={0.05}
          emissive={isSelected ? '#377DFF' : '#000000'}
          emissiveIntensity={isSelected ? 0.3 : 0}
        />
      </mesh>
      {/* Jaw Mandible */}
      <mesh position={[0, 1.44, 0.12]} scale={[0.8, 0.7, 0.8]}>
        <boxGeometry args={[0.22, 0.12, 0.18]} />
        <meshStandardMaterial color={boneColor} roughness={0.8} />
      </mesh>

      {/* Cervical & Thoracic & Lumbar Spine */}
      <mesh position={[0, 0.7, -0.08]}>
        <cylinderGeometry args={[0.045, 0.055, 1.45, 16]} />
        <meshStandardMaterial color={boneColor} roughness={0.8} />
      </mesh>

      {/* Rib Cage (Sternum + Curved Ribs) */}
      <group position={[0, 0.75, 0]}>
        {/* Sternum */}
        <mesh position={[0, 0.05, 0.18]} scale={[1, 1, 0.5]}>
          <boxGeometry args={[0.07, 0.34, 0.04]} />
          <meshStandardMaterial color={boneColor} roughness={0.7} />
        </mesh>
        {/* 6 Rib Bands */}
        {[-0.14, -0.08, -0.02, 0.04, 0.10, 0.16].map((y, idx) => (
          <mesh key={idx} position={[0, y, 0]} rotation={[0.2, 0, 0]}>
            <torusGeometry args={[0.26 + (0.02 * (3 - Math.abs(idx - 3))), 0.018, 12, 28, Math.PI * 1.85]} />
            <meshStandardMaterial color={boneColor} roughness={0.75} />
          </mesh>
        ))}
      </group>

      {/* Clavicles */}
      <mesh position={[-shoulderWidth * 0.45, 1.25, 0.04]} rotation={[0, 0, -0.15]}>
        <cylinderGeometry args={[0.025, 0.025, shoulderWidth * 0.7, 12]} />
        <meshStandardMaterial color={boneColor} roughness={0.75} />
      </mesh>
      <mesh position={[shoulderWidth * 0.45, 1.25, 0.04]} rotation={[0, 0, 0.15]}>
        <cylinderGeometry args={[0.025, 0.025, shoulderWidth * 0.7, 12]} />
        <meshStandardMaterial color={boneColor} roughness={0.75} />
      </mesh>

      {/* Pelvic Girdle */}
      <mesh position={[0, -0.15, -0.02]} scale={[hipWidth * 2.8, 1.1, 1.2]}>
        <torusGeometry args={[0.15, 0.05, 16, 24, Math.PI * 1.9]} />
        <meshStandardMaterial color={boneColor} roughness={0.75} />
      </mesh>

      {/* Upper Limbs (Humerus, Forearm) */}
      {/* Left Arm */}
      <mesh position={[-shoulderWidth, 0.85, 0]} rotation={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.038, 0.032, 0.58, 14]} />
        <meshStandardMaterial color={boneColor} roughness={0.8} />
      </mesh>
      <mesh position={[-shoulderWidth - 0.03, 0.32, 0]} rotation={[0, 0, 0.08]}>
        <cylinderGeometry args={[0.03, 0.026, 0.52, 14]} />
        <meshStandardMaterial color={boneColor} roughness={0.8} />
      </mesh>
      {/* Right Arm */}
      <mesh position={[shoulderWidth, 0.85, 0]} rotation={[0, 0, -0.1]}>
        <cylinderGeometry args={[0.038, 0.032, 0.58, 14]} />
        <meshStandardMaterial color={boneColor} roughness={0.8} />
      </mesh>
      <mesh position={[shoulderWidth + 0.03, 0.32, 0]} rotation={[0, 0, -0.08]}>
        <cylinderGeometry args={[0.03, 0.026, 0.52, 14]} />
        <meshStandardMaterial color={boneColor} roughness={0.8} />
      </mesh>

      {/* Lower Limbs (Femurs, Tibias) */}
      {/* Left Leg */}
      <mesh position={[-hipWidth * 0.7, -0.65, 0]} rotation={[0, 0, 0.04]}>
        <cylinderGeometry args={[0.058, 0.048, 0.85, 16]} />
        <meshStandardMaterial color={boneColor} roughness={0.8} />
      </mesh>
      <mesh position={[-hipWidth * 0.7, -1.48, 0]} rotation={[0, 0, 0.02]}>
        <cylinderGeometry args={[0.045, 0.038, 0.82, 16]} />
        <meshStandardMaterial color={boneColor} roughness={0.8} />
      </mesh>
      {/* Right Leg */}
      <mesh position={[hipWidth * 0.7, -0.65, 0]} rotation={[0, 0, -0.04]}>
        <cylinderGeometry args={[0.058, 0.048, 0.85, 16]} />
        <meshStandardMaterial color={boneColor} roughness={0.8} />
      </mesh>
      <mesh position={[hipWidth * 0.7, -1.48, 0]} rotation={[0, 0, -0.02]}>
        <cylinderGeometry args={[0.045, 0.038, 0.82, 16]} />
        <meshStandardMaterial color={boneColor} roughness={0.8} />
      </mesh>
    </group>
  );
};

// 10. MAJOR BLOOD VESSELS (Aorta & Vena Cava)
export const BloodVesselsComponent: React.FC = () => {
  return (
    <group>
      {/* Descending Aorta (Red) */}
      <mesh position={[-0.03, 0.42, -0.04]}>
        <cylinderGeometry args={[0.032, 0.028, 0.95, 16]} />
        <meshStandardMaterial color="#E63946" roughness={0.35} metalness={0.2} />
      </mesh>
      {/* Inferior Vena Cava (Blue) */}
      <mesh position={[0.04, 0.42, -0.04]}>
        <cylinderGeometry args={[0.034, 0.03, 0.95, 16]} />
        <meshStandardMaterial color="#1D3557" roughness={0.4} metalness={0.15} />
      </mesh>
      {/* Left/Right Iliac vessels */}
      <mesh position={[-0.08, -0.16, -0.04]} rotation={[0, 0, 0.35]}>
        <cylinderGeometry args={[0.024, 0.022, 0.32, 12]} />
        <meshStandardMaterial color="#E63946" roughness={0.4} />
      </mesh>
      <mesh position={[0.08, -0.16, -0.04]} rotation={[0, 0, -0.35]}>
        <cylinderGeometry args={[0.024, 0.022, 0.32, 12]} />
        <meshStandardMaterial color="#1D3557" roughness={0.4} />
      </mesh>
    </group>
  );
};

// 11. MUSCULAR SHEEN / BODY CONTOUR
export const BodyContourComponent: React.FC<{ profile: AnatomicalModelType }> = ({ profile }) => {
  const shoulderWidth = profile === 'female' ? 0.48 : 0.58;
  const chestScale: [number, number, number] = profile === 'female' ? [0.95, 1.0, 0.9] : [1.08, 1.05, 0.95];

  return (
    <group>
      {/* Torso muscular shell */}
      <mesh position={[0, 0.65, 0]} scale={chestScale}>
        <cylinderGeometry args={[shoulderWidth * 0.85, 0.32, 1.35, 24]} />
        <meshStandardMaterial
          color="#EE8278"
          roughness={0.7}
          transparent
          opacity={0.16}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Pelvic / Thigh contour */}
      <mesh position={[0, -0.85, 0]}>
        <cylinderGeometry args={[0.36, 0.28, 1.5, 20]} />
        <meshStandardMaterial
          color="#EE8278"
          roughness={0.7}
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};
