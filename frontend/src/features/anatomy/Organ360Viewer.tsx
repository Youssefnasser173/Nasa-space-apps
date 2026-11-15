import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { RotateCw, ZoomIn, ZoomOut, RefreshCw, Eye, Sparkles } from 'lucide-react';
import { OrganKey } from '../../types';
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
  SkeletalSystemComponent
} from './proceduralOrgans';

interface Organ360ViewerProps {
  organKey: OrganKey;
  onBackToBody?: () => void;
}

export const Organ360Viewer: React.FC<Organ360ViewerProps> = ({ organKey, onBackToBody }) => {
  const organ = ORGAN_DEFINITIONS[organKey] || ORGAN_DEFINITIONS.heart;
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handleZoom = (delta: number) => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;
      const factor = delta > 0 ? 0.85 : 1.15;
      camera.position.multiplyScalar(factor);
      controlsRef.current.update();
    }
  };

  return (
    <div className="relative w-full h-[460px] md:h-[540px] rounded-2xl bg-gradient-to-b from-white via-[#F6F8FC] to-[#EDF2F8] border border-border-subtle shadow-card overflow-hidden flex flex-col">
      {/* Top Controls Overlay */}
      <div className="absolute top-4 inset-x-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <span
            className="w-3.5 h-3.5 rounded-full shadow-sm"
            style={{ backgroundColor: organ.glowColor }}
          />
          <div>
            <h3 className="text-sm font-bold text-deep-navy">{organ.name}</h3>
            <p className="text-[11px] text-secondary-text italic font-serif">{organ.latinName}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto bg-white/90 p-1 rounded-xl border border-border-subtle shadow-sm backdrop-blur">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            title={autoRotate ? 'Pause 360° Auto-Rotation' : 'Start 360° Auto-Rotation'}
            className={`p-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
              autoRotate ? 'bg-blue-50 text-primary-blue' : 'text-secondary-text hover:bg-gray-100'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span className="hidden sm:inline text-[11px]">{autoRotate ? 'Rotating' : 'Auto-Rotate'}</span>
          </button>

          <button
            onClick={() => handleZoom(1)}
            title="Zoom In"
            className="p-1.5 text-secondary-text hover:text-deep-navy hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => handleZoom(-1)}
            title="Zoom Out"
            className="p-1.5 text-secondary-text hover:text-deep-navy hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleResetCamera}
            title="Reset Camera Angle"
            className="p-1.5 text-secondary-text hover:text-deep-navy hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="w-full flex-1 cursor-grab active:cursor-grabbing">
        <Canvas gl={{ antialias: true, alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 3.4]} fov={40} />
          
          <ambientLight intensity={0.9} />
          <directionalLight position={[4, 5, 4]} intensity={1.3} />
          <directionalLight position={[-4, -3, -2]} intensity={0.5} color={organ.glowColor} />
          <pointLight position={[0, 0, 2.5]} intensity={0.6} color="#FFFFFF" />

          {/* Centered Large Organ Model */}
          <group position={[0, 0, 0]} scale={2.8}>
            {organKey === 'brain' && (
              <BrainComponent organKey="brain" position={[0, 0, 0]} isSelected={true} />
            )}
            {organKey === 'heart' && (
              <HeartComponent organKey="heart" position={[0, 0, 0]} isSelected={true} />
            )}
            {organKey === 'right-lung' && (
              <RightLungComponent organKey="right-lung" position={[0, 0, 0]} isSelected={true} />
            )}
            {organKey === 'left-lung' && (
              <LeftLungComponent organKey="left-lung" position={[0, 0, 0]} isSelected={true} />
            )}
            {organKey === 'liver' && (
              <LiverComponent organKey="liver" position={[0, 0, 0]} isSelected={true} />
            )}
            {organKey === 'stomach' && (
              <StomachComponent organKey="stomach" position={[0, 0, 0]} isSelected={true} />
            )}
            {(organKey === 'right-kidney' || organKey === 'left-kidney') && (
              <KidneyComponent
                side={organKey === 'right-kidney' ? 'right' : 'left'}
                organKey={organKey}
                position={[0, 0, 0]}
                isSelected={true}
              />
            )}
            {organKey === 'intestines' && (
              <IntestinesComponent organKey="intestines" position={[0, 0, 0]} isSelected={true} />
            )}
            {organKey === 'musculoskeletal' && (
              <SkeletalSystemComponent profile="female" isSelected={true} />
            )}
          </group>

          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableZoom={true}
            minDistance={1.8}
            maxDistance={5.5}
            dampingFactor={0.06}
            autoRotate={autoRotate}
            autoRotateSpeed={1.8}
            rotateSpeed={0.8}
          />
        </Canvas>
      </div>

      {/* Bottom Info Bar */}
      <div className="p-3 bg-white/95 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-secondary-text">
          <Eye className="w-3.5 h-3.5 text-primary-blue" />
          <span>True 360° Multi-Axis Free Orbit: Drag to inspect surface • Scroll to zoom</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[11px] font-mono">
            {organ.system}
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-50 text-status-success font-medium text-[11px]">
            Real Biological Tissue Shader
          </span>
        </div>
      </div>
    </div>
  );
};
