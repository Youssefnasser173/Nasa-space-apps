import React, { useState } from 'react';
import { Shield, Activity, Lock, RotateCw, ZoomIn, ZoomOut, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { AnatomicalModelType } from '@/types';

interface MaleFemaleModelSelectorProps {
  selectedModel: AnatomicalModelType;
  onSelectModel: (model: AnatomicalModelType) => void;
  onBeginBaseline?: () => void;
  onExploreNorelis?: () => void;
}

export const MaleFemaleModelSelector: React.FC<MaleFemaleModelSelectorProps> = ({
  selectedModel,
  onSelectModel,
  onBeginBaseline,
  onExploreNorelis
}) => {
  // Interactive 3D rotation and zoom states for each model
  const [maleRot, setMaleRot] = useState(0);
  const [maleZoom, setMaleZoom] = useState(1);
  const [isDraggingMale, setIsDraggingMale] = useState(false);
  const [maleStartX, setMaleStartX] = useState(0);

  const [femaleRot, setFemaleRot] = useState(0);
  const [femaleZoom, setFemaleZoom] = useState(1);
  const [isDraggingFemale, setIsDraggingFemale] = useState(false);
  const [femaleStartX, setFemaleStartX] = useState(0);

  // Mouse drag handlers for Male
  const handleMaleMouseDown = (e: React.MouseEvent) => {
    setIsDraggingMale(true);
    setMaleStartX(e.clientX);
  };
  const handleMaleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingMale) return;
    const delta = e.clientX - maleStartX;
    setMaleRot(prev => prev + delta * 0.5);
    setMaleStartX(e.clientX);
  };
  const handleMaleMouseUp = () => setIsDraggingMale(false);

  // Mouse drag handlers for Female
  const handleFemaleMouseDown = (e: React.MouseEvent) => {
    setIsDraggingFemale(true);
    setFemaleStartX(e.clientX);
  };
  const handleFemaleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingFemale) return;
    const delta = e.clientX - femaleStartX;
    setFemaleRot(prev => prev + delta * 0.5);
    setFemaleStartX(e.clientX);
  };
  const handleFemaleMouseUp = () => setIsDraggingFemale(false);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      {/* Top Action Bar & Value Pillars (Matching uploaded screenshot top) */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onBeginBaseline && onBeginBaseline()}
            className="px-6 py-2.5 rounded-xl bg-primary-blue text-white text-xs font-bold hover:bg-bright-blue transition-all flex items-center gap-2 shadow-md shadow-primary-blue/30"
          >
            <span>Begin your baseline</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onExploreNorelis && onExploreNorelis()}
            className="px-5 py-2.5 rounded-xl bg-white border border-border-subtle text-deep-navy text-xs font-semibold hover:bg-bg-subtle transition-all shadow-sm"
          >
            Explore NORELIS
          </button>
        </div>

        {/* Trust & Methodology Badges */}
        <div className="flex items-center gap-4 text-xs font-semibold text-secondary-text">
          <span className="flex items-center gap-1.5 hover:text-deep-navy transition-colors">
            <Shield className="w-3.5 h-3.5 text-primary-blue" />
            <span>Privacy by design</span>
          </span>
          <span className="flex items-center gap-1.5 hover:text-deep-navy transition-colors">
            <Activity className="w-3.5 h-3.5 text-status-success" />
            <span>Baseline-first</span>
          </span>
          <span className="flex items-center gap-1.5 hover:text-deep-navy transition-colors">
            <Lock className="w-3.5 h-3.5 text-primary-blue" />
            <span>Decision support</span>
          </span>
        </div>
      </div>

      {/* Main Medical Showcase Card (Faithful recreation of the user's uploaded mockup) */}
      <div className="w-full rounded-3xl bg-gradient-to-b from-[#F2F6FB] via-[#EDF3F9] to-[#E5EDF6] border border-blue-200/80 shadow-card-hover p-6 sm:p-8 relative overflow-hidden">
        {/* Card Header Row */}
        <div className="flex items-center justify-between pb-4 border-b border-blue-200/60 mb-6">
          <div className="flex items-center gap-2 text-xs font-extrabold tracking-wider text-slate-700 uppercase font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50" />
            <span>IMAGING SYSTEM · DEMO</span>
          </div>

          <span className="text-xs font-mono font-bold text-slate-500">
            01 / 02
          </span>
        </div>

        {/* 3D Anatomical Humanoid Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* MALE MODEL VIEWPORT (5 cols on md) */}
          <div
            onClick={() => onSelectModel('male')}
            onMouseDown={handleMaleMouseDown}
            onMouseMove={handleMaleMouseMove}
            onMouseUp={handleMaleMouseUp}
            onMouseLeave={handleMaleMouseUp}
            className={`md:col-span-5 p-6 rounded-2xl cursor-pointer transition-all flex flex-col items-center justify-between relative group select-none ${
              selectedModel === 'male'
                ? 'bg-white/85 border-2 border-primary-blue shadow-xl ring-4 ring-primary-blue/20 scale-[1.01]'
                : 'bg-white/40 border border-slate-200/80 hover:bg-white/60 hover:border-slate-300'
            }`}
          >
            {/* Model Top Tags */}
            <div className="w-full flex items-center justify-between text-[10px] font-mono font-bold text-slate-600 mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>3D ANATOMY · CC0</span>
              </span>
              <span className="text-slate-400">LOCAL MODEL</span>
            </div>

            {/* Selected Badge */}
            {selectedModel === 'male' && (
              <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-primary-blue text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                <CheckCircle2 className="w-3 h-3" />
                <span>Selected</span>
              </div>
            )}

            {/* Real 3D Anatomical Male Render */}
            <div className="w-full h-80 flex items-center justify-center relative overflow-hidden py-4">
              {/* Radial backdrop pedestal glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-52 h-52 rounded-full bg-blue-400/20 blur-2xl" />
                <div className="w-48 h-3 rounded-full bg-blue-500/25 absolute bottom-4 blur-[2px]" />
              </div>

              {/* Real Anatomical Image with Interactive 3D CSS Rotation & Zoom */}
              <div
                className="transition-transform duration-75 cursor-grab active:cursor-grabbing flex items-center justify-center"
                style={{
                  transform: `scale(${maleZoom}) rotateY(${maleRot}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <img
                  src="/assets/male_anatomy_hd_trans.png"
                  alt="Real Male Anatomical 3D Model"
                  className="max-h-72 w-auto object-contain filter drop-shadow-lg pointer-events-none"
                  onError={(e) => {
                    // Fallback to non-transparent if needed
                    (e.target as HTMLImageElement).src = '/assets/male_anatomy_hd.png';
                  }}
                />
              </div>
            </div>

            {/* Model Bottom Controls & Subtitle */}
            <div className="w-full pt-4 border-t border-slate-200/80 flex flex-col items-center text-center">
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-extrabold text-deep-navy tracking-wider uppercase">
                  MALE MODEL
                </h3>
                {selectedModel === 'male' && (
                  <span className="w-2 h-2 rounded-full bg-primary-blue animate-pulse" />
                )}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Drag to rotate • scroll or buttons to zoom
              </p>

              {/* Interactive Tool Buttons */}
              <div className="flex items-center gap-2 mt-3" onClick={e => e.stopPropagation()}>
                <button
                  type="button"
                  title="Reset 3D Rotation"
                  onClick={() => setMaleRot(0)}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-primary-blue hover:text-primary-blue text-slate-600 transition-colors shadow-sm"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Zoom In"
                  onClick={() => setMaleZoom(prev => Math.min(prev + 0.15, 1.6))}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-primary-blue hover:text-primary-blue text-slate-600 transition-colors shadow-sm"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Zoom Out"
                  onClick={() => setMaleZoom(prev => Math.max(prev - 0.15, 0.7))}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-primary-blue hover:text-primary-blue text-slate-600 transition-colors shadow-sm"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* CENTER DIVIDER BRAND GLYPH: N+ (1 col on md) */}
          <div className="hidden md:flex md:col-span-1 flex-col items-center justify-center">
            <span className="font-mono font-black text-2xl text-blue-500 tracking-tighter opacity-80">
              N+
            </span>
          </div>

          {/* FEMALE MODEL VIEWPORT (5 cols on md) */}
          <div
            onClick={() => onSelectModel('female')}
            onMouseDown={handleFemaleMouseDown}
            onMouseMove={handleFemaleMouseMove}
            onMouseUp={handleFemaleMouseUp}
            onMouseLeave={handleFemaleMouseUp}
            className={`md:col-span-5 p-6 rounded-2xl cursor-pointer transition-all flex flex-col items-center justify-between relative group select-none ${
              selectedModel === 'female'
                ? 'bg-white/85 border-2 border-primary-blue shadow-xl ring-4 ring-primary-blue/20 scale-[1.01]'
                : 'bg-white/40 border border-slate-200/80 hover:bg-white/60 hover:border-slate-300'
            }`}
          >
            {/* Model Top Tags */}
            <div className="w-full flex items-center justify-between text-[10px] font-mono font-bold text-slate-600 mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>3D ANATOMY · CC0</span>
              </span>
              <span className="text-slate-400">LOCAL MODEL</span>
            </div>

            {/* Selected Badge */}
            {selectedModel === 'female' && (
              <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-primary-blue text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                <CheckCircle2 className="w-3 h-3" />
                <span>Selected</span>
              </div>
            )}

            {/* Real 3D Anatomical Female Render */}
            <div className="w-full h-80 flex items-center justify-center relative overflow-hidden py-4">
              {/* Radial backdrop pedestal glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-52 h-52 rounded-full bg-blue-400/20 blur-2xl" />
                <div className="w-48 h-3 rounded-full bg-blue-500/25 absolute bottom-4 blur-[2px]" />
              </div>

              {/* Real Anatomical Image with Interactive 3D CSS Rotation & Zoom */}
              <div
                className="transition-transform duration-75 cursor-grab active:cursor-grabbing flex items-center justify-center"
                style={{
                  transform: `scale(${femaleZoom}) rotateY(${femaleRot}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <img
                  src="/assets/female_anatomy_hd_trans.png"
                  alt="Real Female Anatomical 3D Model"
                  className="max-h-72 w-auto object-contain filter drop-shadow-lg pointer-events-none"
                  onError={(e) => {
                    // Fallback to non-transparent if needed
                    (e.target as HTMLImageElement).src = '/assets/female_anatomy_hd.png';
                  }}
                />
              </div>
            </div>

            {/* Model Bottom Controls & Subtitle */}
            <div className="w-full pt-4 border-t border-slate-200/80 flex flex-col items-center text-center">
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-extrabold text-deep-navy tracking-wider uppercase">
                  FEMALE MODEL
                </h3>
                {selectedModel === 'female' && (
                  <span className="w-2 h-2 rounded-full bg-primary-blue animate-pulse" />
                )}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Drag to rotate • scroll or buttons to zoom
              </p>

              {/* Interactive Tool Buttons */}
              <div className="flex items-center gap-2 mt-3" onClick={e => e.stopPropagation()}>
                <button
                  type="button"
                  title="Reset 3D Rotation"
                  onClick={() => setFemaleRot(0)}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-primary-blue hover:text-primary-blue text-slate-600 transition-colors shadow-sm"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Zoom In"
                  onClick={() => setFemaleZoom(prev => Math.min(prev + 0.15, 1.6))}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-primary-blue hover:text-primary-blue text-slate-600 transition-colors shadow-sm"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Zoom Out"
                  onClick={() => setFemaleZoom(prev => Math.max(prev - 0.15, 0.7))}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-primary-blue hover:text-primary-blue text-slate-600 transition-colors shadow-sm"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer Row */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-blue-200/60 text-[11px] font-mono text-slate-500">
          <span>LOCAL CC0 BODY MODELS</span>
          <span>3D scan overlay demo</span>
        </div>
      </div>
    </div>
  );
};
