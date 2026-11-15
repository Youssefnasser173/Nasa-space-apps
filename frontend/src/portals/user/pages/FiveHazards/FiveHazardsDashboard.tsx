import React, { useState } from 'react';
import { NASA_FIVE_HAZARDS } from '../../../../constants/hazards';
import { FiveHazard } from '../../../../types';
import {
  ShieldAlert,
  Radio,
  Users,
  Compass,
  RotateCcw,
  Wind,
  ExternalLink,
  ChevronRight,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const FiveHazardsDashboard: React.FC = () => {
  const [selectedHazardId, setSelectedHazardId] = useState<string>('hazard-1');
  const activeHazard = NASA_FIVE_HAZARDS.find(h => h.id === selectedHazardId) || NASA_FIVE_HAZARDS[0];

  const getHazardIcon = (key: string) => {
    switch (key) {
      case 'radiation': return <Radio className="w-5 h-5 text-purple-600" />;
      case 'isolation': return <Users className="w-5 h-5 text-amber-600" />;
      case 'distance': return <Compass className="w-5 h-5 text-blue-600" />;
      case 'gravity': return <RotateCcw className="w-5 h-5 text-emerald-600" />;
      case 'environment': return <Wind className="w-5 h-5 text-teal-600" />;
      default: return <ShieldAlert className="w-5 h-5 text-primary-blue" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border-subtle">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-deep-navy tracking-tight">
              NASA FIVE HAZARDS OF HUMAN SPACEFLIGHT
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-primary-blue border border-blue-200">
              NASA HRP Framework
            </span>
          </div>
          <p className="text-xs sm:text-sm text-secondary-text mt-1">
            Understanding environmental stressors, operational constraints, and physiological interactions across deep-space missions.
          </p>
        </div>

        <a
          href="https://www.nasa.gov/hrp/hazards/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-primary-blue hover:underline flex items-center gap-1.5"
        >
          <span>NASA HRP Hazards Reference</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 5 Interactive Hazard Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {NASA_FIVE_HAZARDS.map(hazard => {
          const isSelected = selectedHazardId === hazard.id;

          return (
            <div
              key={hazard.id}
              onClick={() => setSelectedHazardId(hazard.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-primary-blue bg-blue-50/40 shadow-card-hover scale-[1.02]'
                  : 'border-border-subtle bg-white hover:border-gray-300'
              }`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-bg-subtle flex items-center justify-center mb-3">
                  {getHazardIcon(hazard.key)}
                </div>
                <h4 className="text-sm font-bold text-deep-navy mb-1 leading-snug">{hazard.title}</h4>
                <p className="text-[11px] text-secondary-text line-clamp-2">{hazard.subtitle}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between">
                <span className="text-[10px] font-bold text-primary-blue">
                  {isSelected ? 'Active Selection' : 'Inspect'}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-secondary-text" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Hazard Deep-Dive Details */}
      <div className="norelis-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-border-subtle">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-bg-subtle flex items-center justify-center">
              {getHazardIcon(activeHazard.key)}
            </div>
            <div>
              <span className="text-[11px] font-bold text-primary-blue uppercase tracking-wider">Hazard Category</span>
              <h2 className="text-xl sm:text-2xl font-black text-deep-navy">{activeHazard.title}</h2>
              <p className="text-xs text-secondary-text">{activeHazard.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-status-success border border-emerald-200">
              {activeHazard.currentStatus}
            </span>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-deep-navy uppercase tracking-wider">Hazard Characterization</h4>
          <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
            {activeHazard.description}
          </p>
        </div>

        {/* Grid: Physiological Impacts vs Operational Countermeasures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-bg-subtle border border-border-subtle space-y-2">
            <h5 className="text-xs font-bold text-deep-navy uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-status-critical" />
              Physiological Adaptation & Risks
            </h5>
            <p className="text-xs text-secondary-text leading-relaxed">
              {activeHazard.physiologicalImpact}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-bg-subtle border border-border-subtle space-y-2">
            <h5 className="text-xs font-bold text-deep-navy uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-primary-blue" />
              Operational Protocols & Countermeasures
            </h5>
            <p className="text-xs text-secondary-text leading-relaxed">
              {activeHazard.operationalContext}
            </p>
          </div>
        </div>

        {/* Associated Anatomical & Physiological Systems */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-deep-navy uppercase tracking-wider">
            Interacting Human Health Systems
          </h4>
          <div className="flex flex-wrap gap-2">
            {activeHazard.primarySystems.map((sys, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-white border border-border-subtle text-deep-navy shadow-sm"
              >
                {sys}
              </span>
            ))}
          </div>
        </div>

        {/* Mapped Variables */}
        <div className="space-y-2 pt-2 border-t border-border-subtle">
          <span className="text-[11px] font-semibold text-secondary-text block">
            Monitored Physiological Telemetry Variables in NORELIS:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activeHazard.variables.map((v, idx) => (
              <span key={idx} className="px-2.5 py-0.5 rounded font-mono text-[11px] bg-blue-50 text-primary-blue border border-blue-200">
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hazard Interaction Diagram (Section 22) */}
      <div className="norelis-card p-6 sm:p-8 space-y-4">
        <div>
          <h3 className="text-base font-bold text-deep-navy">Spaceflight Multi-Hazard Interaction Map</h3>
          <p className="text-xs text-secondary-text mt-0.5">
            Illustrating operational synergy: hazards do not act in isolation but interact synergistically on human physiology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/30 space-y-2">
            <span className="text-xs font-bold text-purple-900 block">Radiation × Closed Environment</span>
            <p className="text-[11px] text-secondary-text leading-relaxed">
              GCR exposure coupled with closed-cabin microbial shifts can trigger latent herpesvirus reactivation and altered phagocytic function.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/30 space-y-2">
            <span className="text-xs font-bold text-amber-900 block">Isolation × Distance from Earth</span>
            <p className="text-[11px] text-secondary-text leading-relaxed">
              Comms latency (up to 22 min) magnifies psychological isolation, demanding autonomous algorithmic medical decision support.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-2">
            <span className="text-xs font-bold text-emerald-900 block">Gravity Fields × Confinement</span>
            <p className="text-[11px] text-secondary-text leading-relaxed">
              Cephalad fluid redistribution and microgravity unloading accelerate trabecular bone resorption and spinal muscle deconditioning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
