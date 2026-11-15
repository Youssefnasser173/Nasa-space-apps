import React from 'react';

export const FemaleAnatomyIllustration: React.FC<{ className?: string; isSelected?: boolean }> = ({
  className = "w-32 h-64",
  isSelected = false
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background Ambient Radial Pedestal */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`w-36 h-36 rounded-full blur-xl transition-all ${
            isSelected ? 'bg-primary-blue/30 scale-110' : 'bg-blue-300/15'
          }`}
        />
        <div className="w-32 h-2.5 rounded-full bg-blue-500/20 absolute bottom-2 blur-[2px]" />
      </div>

      {/* Real Female Anatomical HD Image */}
      <img
        src="/assets/female_anatomy_hd_trans.png"
        alt="Real Female Anatomical 3D Model"
        className={`h-full w-auto object-contain transition-all duration-300 filter drop-shadow-md relative z-10 ${
          isSelected ? 'scale-105 brightness-105' : 'opacity-90 hover:opacity-100'
        }`}
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/assets/female_anatomy_hd.png';
        }}
      />

      {/* Selection Tag */}
      {isSelected && (
        <div className="absolute bottom-1 px-2 py-0.5 rounded-full bg-primary-blue text-white text-[9px] font-bold z-20 shadow-sm">
          Selected
        </div>
      )}
    </div>
  );
};

export const MaleAnatomyIllustration: React.FC<{ className?: string; isSelected?: boolean }> = ({
  className = "w-32 h-64",
  isSelected = false
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background Ambient Radial Pedestal */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`w-36 h-36 rounded-full blur-xl transition-all ${
            isSelected ? 'bg-primary-blue/30 scale-110' : 'bg-blue-300/15'
          }`}
        />
        <div className="w-32 h-2.5 rounded-full bg-blue-500/20 absolute bottom-2 blur-[2px]" />
      </div>

      {/* Real Male Anatomical HD Image */}
      <img
        src="/assets/male_anatomy_hd_trans.png"
        alt="Real Male Anatomical 3D Model"
        className={`h-full w-auto object-contain transition-all duration-300 filter drop-shadow-md relative z-10 ${
          isSelected ? 'scale-105 brightness-105' : 'opacity-90 hover:opacity-100'
        }`}
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/assets/male_anatomy_hd.png';
        }}
      />

      {/* Selection Tag */}
      {isSelected && (
        <div className="absolute bottom-1 px-2 py-0.5 rounded-full bg-primary-blue text-white text-[9px] font-bold z-20 shadow-sm">
          Selected
        </div>
      )}
    </div>
  );
};
