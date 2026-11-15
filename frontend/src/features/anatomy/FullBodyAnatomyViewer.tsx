import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { OrganKey, AnatomicalModelType } from '../../types';
import { ORGAN_DEFINITIONS } from '../../constants/organs';
import {
  BrainComponent,
  HeartComponent,
  RightLungComponent,
  LeftLungComponent,
  LiverComponent,
  StomachComponent,
  KidneyComponent,
  IntestinesComponent,
  SkeletalSystemComponent,
  BloodVesselsComponent,
  BodyContourComponent
} from './proceduralOrgans';

interface FullBodyAnatomyViewerProps {
  profile: AnatomicalModelType;
  selectedOrgan: OrganKey | null;
  onSelectOrgan: (organ: OrganKey) => void;
  hoveredOrgan: OrganKey | null;
  onHoverOrgan: (organ: OrganKey | null) => void;
  enableScan?: boolean;
  interactive?: boolean;
}

// Scanning beam plane component
const ScanningBeam: React.FC<{ active: boolean; onHeightChange?: (h: number) => void }> = ({ active, onHeightChange }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const heightRef = useRef<number>(2.4);
  const directionRef = useRef<number>(-1);

  useFrame((_, delta) => {
    if (!active || !meshRef.current) return;

    heightRef.current += directionRef.current * delta * 0.95;

    if (heightRef.current < -2.3) {
      heightRef.current = 2.4;
    }

    meshRef.current.position.y = heightRef.current;
    if (glowRef.current) {
      glowRef.current.position.y = heightRef.current;
    }
    onHeightChange?.(heightRef.current);
  });

  if (!active) return null;

  return (
    <group>
      <mesh ref={meshRef} position={[0, 2.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.8, 1.2]} />
        <meshBasicMaterial
          color="#377DFF"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={glowRef} position={[0, 2.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.55, 0.65, 32]} />
        <meshBasicMaterial
          color="#13A6A6"
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// Scene content
const AnatomyScene: React.FC<{
  profile: AnatomicalModelType;
  selectedOrgan: OrganKey | null;
  hoveredOrgan: OrganKey | null;
  onSelectOrgan: (organ: OrganKey) => void;
  onHoverOrgan: (organ: OrganKey | null) => void;
  enableScan: boolean;
}> = ({ profile, selectedOrgan, hoveredOrgan, onSelectOrgan, onHoverOrgan, enableScan }) => {
  const [scanHeight, setScanHeight] = useState(2.3);

  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 5, 4]} intensity={1.2} />
      <directionalLight position={[-3, -2, -2]} intensity={0.4} color="#8064D8" />
      <directionalLight position={[0, 2, 5]} intensity={0.7} color="#EDF2F8" />

      <group position={[0, -0.2, 0]}>
        <BodyContourComponent profile={profile} />
        <SkeletalSystemComponent profile={profile} />
        <BloodVesselsComponent />

        <BrainComponent
          organKey="brain"
          isSelected={selectedOrgan === 'brain'}
          isHovered={hoveredOrgan === 'brain'}
          onClick={() => onSelectOrgan('brain')}
          onPointerOver={() => onHoverOrgan('brain')}
          onPointerOut={() => onHoverOrgan(null)}
        />

        <HeartComponent
          organKey="heart"
          isSelected={selectedOrgan === 'heart'}
          isHovered={hoveredOrgan === 'heart'}
          onClick={() => onSelectOrgan('heart')}
          onPointerOver={() => onHoverOrgan('heart')}
          onPointerOut={() => onHoverOrgan(null)}
        />

        <RightLungComponent
          organKey="right-lung"
          isSelected={selectedOrgan === 'right-lung'}
          isHovered={hoveredOrgan === 'right-lung'}
          onClick={() => onSelectOrgan('right-lung')}
          onPointerOver={() => onHoverOrgan('right-lung')}
          onPointerOut={() => onHoverOrgan(null)}
        />

        <LeftLungComponent
          organKey="left-lung"
          isSelected={selectedOrgan === 'left-lung'}
          isHovered={hoveredOrgan === 'left-lung'}
          onClick={() => onSelectOrgan('left-lung')}
          onPointerOver={() => onHoverOrgan('left-lung')}
          onPointerOut={() => onHoverOrgan(null)}
        />

        <LiverComponent
          organKey="liver"
          isSelected={selectedOrgan === 'liver'}
          isHovered={hoveredOrgan === 'liver'}
          onClick={() => onSelectOrgan('liver')}
          onPointerOver={() => onHoverOrgan('liver')}
          onPointerOut={() => onHoverOrgan(null)}
        />

        <StomachComponent
          organKey="stomach"
          isSelected={selectedOrgan === 'stomach'}
          isHovered={hoveredOrgan === 'stomach'}
          onClick={() => onSelectOrgan('stomach')}
          onPointerOver={() => onHoverOrgan('stomach')}
          onPointerOut={() => onHoverOrgan(null)}
        />

        <KidneyComponent
          organKey="right-kidney"
          side="right"
          isSelected={selectedOrgan === 'right-kidney'}
          isHovered={hoveredOrgan === 'right-kidney'}
          onClick={() => onSelectOrgan('right-kidney')}
          onPointerOver={() => onHoverOrgan('right-kidney')}
          onPointerOut={() => onHoverOrgan(null)}
        />

        <KidneyComponent
          organKey="left-kidney"
          side="left"
          isSelected={selectedOrgan === 'left-kidney'}
          isHovered={hoveredOrgan === 'left-kidney'}
          onClick={() => onSelectOrgan('left-kidney')}
          onPointerOver={() => onHoverOrgan('left-kidney')}
          onPointerOut={() => onHoverOrgan(null)}
        />

        <IntestinesComponent
          organKey="intestines"
          isSelected={selectedOrgan === 'intestines'}
          isHovered={hoveredOrgan === 'intestines'}
          onClick={() => onSelectOrgan('intestines')}
          onPointerOver={() => onHoverOrgan('intestines')}
          onPointerOut={() => onHoverOrgan(null)}
        />

        {enableScan && (
          <ScanningBeam active={enableScan} onHeightChange={setScanHeight} />
        )}
      </group>
    </>
  );
};

export const FullBodyAnatomyViewer: React.FC<FullBodyAnatomyViewerProps> = ({
  profile,
  selectedOrgan,
  onSelectOrgan,
  hoveredOrgan,
  onHoverOrgan,
  enableScan = true,
  interactive = true
}) => {
  const [viewStyle, setViewStyle] = useState<'real_cc0' | 'internal_3d'>('real_cc0');

  return (
    <div className="relative w-full h-full min-h-[520px] rounded-2xl bg-gradient-to-b from-[#FFFFFF] via-[#F6F8FC] to-[#EDF2F8] border border-border-subtle overflow-hidden shadow-card">
      {/* Status Badges Header */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-deep-navy border border-border-subtle shadow-sm backdrop-blur">
          <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
          {profile === 'female' ? 'Female Anatomical Model' : 'Male Anatomical Model'}
        </span>

        {/* View Mode Toggle: Real CC0 Model vs 3D Internal Scan */}
        <div className="flex items-center p-0.5 rounded-xl bg-white/95 border border-border-subtle shadow-sm text-xs">
          <button
            onClick={() => setViewStyle('real_cc0')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              viewStyle === 'real_cc0'
                ? 'bg-primary-blue text-white shadow-sm'
                : 'text-secondary-text hover:text-deep-navy'
            }`}
          >
            Real CC0 Anatomy
          </button>
          <button
            onClick={() => setViewStyle('internal_3d')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              viewStyle === 'internal_3d'
                ? 'bg-primary-blue text-white shadow-sm'
                : 'text-secondary-text hover:text-deep-navy'
            }`}
          >
            3D Internal Organs
          </button>
        </div>
      </div>

      {/* Hovered Organ Tooltip Pill */}
      {hoveredOrgan && ORGAN_DEFINITIONS[hoveredOrgan] && (
        <div className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-xl bg-deep-navy text-white text-xs font-medium shadow-elevated transition-all flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ORGAN_DEFINITIONS[hoveredOrgan].glowColor }} />
          <span>{ORGAN_DEFINITIONS[hoveredOrgan].name}</span>
          <span className="text-[10px] text-gray-400">Click to focus</span>
        </div>
      )}

      {/* MAIN VIEWPORT */}
      {viewStyle === 'real_cc0' ? (
        /* REAL ANATOMICAL CC0 3D MODEL VIEWPORT (From reference image) */
        <div className="w-full h-full min-h-[520px] flex flex-col items-center justify-center relative p-6 select-none">
          {/* Subtle Pedestal & Atmosphere */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-96 h-96 rounded-full bg-blue-300/20 blur-3xl" />
            <div className="w-72 h-4 rounded-full bg-blue-500/25 absolute bottom-12 blur-sm" />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center max-w-sm">
            <img
              src={profile === 'female' ? '/assets/female_anatomy_hd_trans.png' : '/assets/male_anatomy_hd_trans.png'}
              alt={profile === 'female' ? 'Real Female Anatomy Model' : 'Real Male Anatomy Model'}
              className="h-[440px] sm:h-[480px] w-auto object-contain filter drop-shadow-2xl transition-transform hover:scale-105 duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  profile === 'female' ? '/assets/female_anatomy_hd.png' : '/assets/male_anatomy_hd.png';
              }}
            />

            {/* Clickable Organ Hotspots Overlay over the real model */}
            <div
              onClick={() => onSelectOrgan('brain')}
              onMouseEnter={() => onHoverOrgan('brain')}
              onMouseLeave={() => onHoverOrgan(null)}
              className="absolute top-[8%] cursor-pointer group"
              title="Inspect Brain"
            >
              <div className="w-5 h-5 rounded-full bg-purple-500/30 animate-ping absolute" />
              <div className="w-5 h-5 rounded-full bg-white border-2 border-purple-600 flex items-center justify-center shadow-md group-hover:scale-125 transition-transform">
                <span className="w-2 h-2 rounded-full bg-purple-600" />
              </div>
            </div>

            <div
              onClick={() => onSelectOrgan('heart')}
              onMouseEnter={() => onHoverOrgan('heart')}
              onMouseLeave={() => onHoverOrgan(null)}
              className="absolute top-[28%] left-[45%] cursor-pointer group"
              title="Inspect Heart"
            >
              <div className="w-5 h-5 rounded-full bg-red-500/30 animate-ping absolute" />
              <div className="w-5 h-5 rounded-full bg-white border-2 border-red-600 flex items-center justify-center shadow-md group-hover:scale-125 transition-transform">
                <span className="w-2 h-2 rounded-full bg-red-600" />
              </div>
            </div>

            <div
              onClick={() => onSelectOrgan('right-lung')}
              onMouseEnter={() => onHoverOrgan('right-lung')}
              onMouseLeave={() => onHoverOrgan(null)}
              className="absolute top-[28%] right-[32%] cursor-pointer group"
              title="Inspect Lungs"
            >
              <div className="w-5 h-5 rounded-full bg-teal-500/30 animate-ping absolute" />
              <div className="w-5 h-5 rounded-full bg-white border-2 border-teal-600 flex items-center justify-center shadow-md group-hover:scale-125 transition-transform">
                <span className="w-2 h-2 rounded-full bg-teal-600" />
              </div>
            </div>

            <div
              onClick={() => onSelectOrgan('liver')}
              onMouseEnter={() => onHoverOrgan('liver')}
              onMouseLeave={() => onHoverOrgan(null)}
              className="absolute top-[38%] left-[42%] cursor-pointer group"
              title="Inspect Liver"
            >
              <div className="w-5 h-5 rounded-full bg-amber-500/30 animate-ping absolute" />
              <div className="w-5 h-5 rounded-full bg-white border-2 border-amber-600 flex items-center justify-center shadow-md group-hover:scale-125 transition-transform">
                <span className="w-2 h-2 rounded-full bg-amber-600" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none z-10">
            <span className="px-3.5 py-1 rounded-full text-[11px] font-bold bg-white/90 text-deep-navy border border-border-subtle shadow-sm backdrop-blur">
              Real CC0 Anatomical Render • Click organ nodes to open focused 360° view
            </span>
          </div>
        </div>
      ) : (
        /* 3D INTERNAL ORGANS CANVAS */
        <Canvas
          className="w-full h-full cursor-pointer"
          gl={{ antialias: true, alpha: true }}
        >
          <PerspectiveCamera makeDefault position={[0, 0.2, 4.4]} fov={42} />
          <AnatomyScene
            profile={profile}
            selectedOrgan={selectedOrgan}
            hoveredOrgan={hoveredOrgan}
            onSelectOrgan={onSelectOrgan}
            onHoverOrgan={onHoverOrgan}
            enableScan={enableScan}
          />
          {interactive && (
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={2.5}
              maxDistance={6.0}
              maxPolarAngle={Math.PI / 2 + 0.2}
              minPolarAngle={Math.PI / 3}
              dampingFactor={0.06}
              rotateSpeed={0.65}
            />
          )}
        </Canvas>
      )}
    </div>
  );
};
