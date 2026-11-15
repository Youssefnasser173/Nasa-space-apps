import React, { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { useHealth } from '../../../../contexts/HealthContext';
import { User, ShieldCheck, CheckCircle2, Stethoscope, Layers, AlertCircle, Edit, Calendar } from 'lucide-react';
import { FemaleAnatomyIllustration, MaleAnatomyIllustration } from '@/components/common/AnatomicalIllustrations';
import { MaleFemaleModelSelector } from '@/components/common/MaleFemaleModelSelector';

export const ProfilePage: React.FC = () => {
  const { currentUser, selectedAnatomicalProfile, setAnatomicalProfile } = useAuth();
  const { earthBaselines, activeAssessment } = useHealth();
  const [showFull3DSelector, setShowFull3DSelector] = useState(false);

  const astro = currentUser || {
    id: 'AG-001',
    name: 'Dr. Sarah Chen',
    age: 38,
    sex: 'female',
    heightCm: 168,
    massKg: 62,
    missionName: 'Artemis IV Lunar Surface Habitat',
    missionDays: 45,
    baselineStatus: 'validated',
    medicalHistorySummary: 'Endurance triathlete; no prior cardiovascular or respiratory diagnoses.'
  };

  const baseline = earthBaselines[astro.id] || earthBaselines['AG-001'];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="pb-2 border-b border-border-subtle">
        <h1 className="text-2xl sm:text-3xl font-black text-deep-navy tracking-tight">
          ASTRONAUT PROFILE & VISUALIZATION SETTINGS
        </h1>
        <p className="text-xs sm:text-sm text-secondary-text mt-1">
          Manage your personal astronaut identity, mission parameters, and 3D anatomical visualization preference.
        </p>
      </div>

      {/* Main Profile Info Card */}
      <div className="norelis-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-primary-blue font-black text-xl flex items-center justify-center">
              {astro.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-deep-navy">{astro.name}</h2>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-blue-50 text-primary-blue border border-blue-200">
                  {astro.id}
                </span>
              </div>
              <p className="text-xs text-secondary-text mt-0.5">{astro.missionName}</p>
            </div>
          </div>

          <div className="text-right">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-status-success border border-emerald-200 inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {astro.baselineStatus.toUpperCase()} BASELINE
            </span>
          </div>
        </div>

        {/* Anatomical Model Preference Switcher (Section 7) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-deep-navy uppercase tracking-wider flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-primary-blue" />
              Anatomical Visualization Model
            </h4>
            <button
              onClick={() => setShowFull3DSelector(!showFull3DSelector)}
              className="text-xs text-primary-blue font-bold hover:underline"
            >
              {showFull3DSelector ? 'Hide 3D Viewer' : 'Open 3D Model Explorer (CC0)'}
            </button>
          </div>

          {showFull3DSelector ? (
            <div className="p-4 rounded-2xl bg-bg-subtle border border-border-subtle">
              <MaleFemaleModelSelector
                selectedModel={selectedAnatomicalProfile}
                onSelectModel={setAnatomicalProfile}
                onExploreNorelis={() => window.location.href = '/vitals'}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setAnatomicalProfile('female')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between group ${
                  selectedAnatomicalProfile === 'female'
                    ? 'border-primary-blue bg-blue-50/40 shadow-sm'
                    : 'border-border-subtle bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-20 flex items-center justify-center">
                    <FemaleAnatomyIllustration className="h-full w-auto" isSelected={selectedAnatomicalProfile === 'female'} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-deep-navy">Female Anatomical Model</p>
                    <p className="text-[11px] text-secondary-text">Pelvic & thoracic calibrated female meshes</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                  selectedAnatomicalProfile === 'female' ? 'bg-primary-blue text-white' : 'bg-bg-subtle text-gray-600'
                }`}>
                  {selectedAnatomicalProfile === 'female' ? 'Active' : 'Select'}
                </span>
              </div>

              <div
                onClick={() => setAnatomicalProfile('male')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between group ${
                  selectedAnatomicalProfile === 'male'
                    ? 'border-primary-blue bg-blue-50/40 shadow-sm'
                    : 'border-border-subtle bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-20 flex items-center justify-center">
                    <MaleAnatomyIllustration className="h-full w-auto" isSelected={selectedAnatomicalProfile === 'male'} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-deep-navy">Male Anatomical Model</p>
                    <p className="text-[11px] text-secondary-text">Shoulder & lumbar calibrated male meshes</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                  selectedAnatomicalProfile === 'male' ? 'bg-primary-blue text-white' : 'bg-bg-subtle text-gray-600'
                }`}>
                  {selectedAnatomicalProfile === 'male' ? 'Active' : 'Select'}
                </span>
              </div>
            </div>
          )}
          <p className="text-[11px] text-secondary-text italic">
            Note: This choice serves strictly as a 3D visualization preference and does not alter clinical interpretation.
          </p>
        </div>

        {/* Biometrics Summary */}
        <div className="pt-4 border-t border-border-subtle">
          <h4 className="text-xs font-bold text-deep-navy uppercase tracking-wider mb-3">
            Anthropometrics & Clinical History Summary
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-bg-subtle border border-border-subtle">
              <span className="text-secondary-text block text-[11px]">Biological Sex</span>
              <strong className="text-deep-navy capitalize">{astro.sex}</strong>
            </div>
            <div className="p-3 rounded-xl bg-bg-subtle border border-border-subtle">
              <span className="text-secondary-text block text-[11px]">Age</span>
              <strong className="text-deep-navy">{astro.age} years</strong>
            </div>
            <div className="p-3 rounded-xl bg-bg-subtle border border-border-subtle">
              <span className="text-secondary-text block text-[11px]">Height</span>
              <strong className="text-deep-navy">{astro.heightCm} cm</strong>
            </div>
            <div className="p-3 rounded-xl bg-bg-subtle border border-border-subtle">
              <span className="text-secondary-text block text-[11px]">Weight</span>
              <strong className="text-deep-navy">{astro.massKg} kg</strong>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-bg-subtle border border-border-subtle text-xs">
            <span className="text-secondary-text block font-semibold mb-1">Medical Background:</span>
            <p className="text-deep-navy leading-relaxed">
              {astro.medicalHistorySummary || 'No significant pre-flight chronic or acute medical history.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
