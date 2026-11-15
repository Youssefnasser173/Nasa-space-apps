import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, ClipboardList, User, Heart, Wind, Brain, Dumbbell, ShieldAlert, Smile, Database } from 'lucide-react';
import { useHealth } from '../../../contexts/HealthContext';
import { PARAMETER_REGISTRY } from '../../../constants/parameters';
import { HealthCategory } from '../../../types';

interface HealthAssessmentWizardProps {
  onComplete: () => void;
}

const STEPS = [
  { id: 1, title: 'Personal Profile', icon: User, category: 'personal' },
  { id: 2, title: 'Medical History', icon: ClipboardList, category: 'medical_history' },
  { id: 3, title: 'Cardiovascular', icon: Heart, category: 'cardiovascular' },
  { id: 4, title: 'Respiratory', icon: Wind, category: 'respiratory' },
  { id: 5, title: 'Brain & Neurological', icon: Brain, category: 'brain_neurological' },
  { id: 6, title: 'Musculoskeletal', icon: Dumbbell, category: 'musculoskeletal' },
  { id: 7, title: 'Immune & Radiation', icon: ShieldAlert, category: 'immune' },
  { id: 8, title: 'Behavioral Health', icon: Smile, category: 'behavioral' },
  { id: 9, title: 'Data Provenance', icon: Database, category: 'provenance' }
];

export const HealthAssessmentWizard: React.FC<HealthAssessmentWizardProps> = ({ onComplete }) => {
  const { activeAssessment, updatePersonalInfo, updateMedicalHistory, addManualParameter, updateParameter } = useHealth();
  const [currentStep, setCurrentStep] = useState(1);

  // Local form state for parameters in progress
  const [formData, setFormData] = useState<Record<string, { value: string; unit: string; source: any }>>(() => {
    const map: Record<string, any> = {};
    activeAssessment.parameters.forEach(p => {
      map[p.key] = { value: String(p.value ?? ''), unit: p.unit || '', source: p.source };
    });
    return map;
  });

  const handleParamChange = (key: string, value: string, defaultUnit: string, source = 'manual') => {
    setFormData(prev => ({
      ...prev,
      [key]: { value, unit: defaultUnit, source }
    }));
  };

  const saveCurrentStepParams = (categoryKey: string) => {
    const paramsInCat = Object.values(PARAMETER_REGISTRY).filter(p => p.category === categoryKey);
    paramsInCat.forEach(p => {
      const entry = formData[p.key];
      if (entry && entry.value.trim() !== '') {
        const num = parseFloat(entry.value);
        const existing = activeAssessment.parameters.find(ap => ap.key === p.key);
        if (existing) {
          updateParameter(existing.id, {
            value: !isNaN(num) ? num : entry.value,
            unit: entry.unit || p.unit,
            source: entry.source || 'manual',
            verificationStatus: 'verified'
          });
        } else {
          addManualParameter({
            key: p.key,
            name: p.name,
            category: p.category,
            value: !isNaN(num) ? num : entry.value,
            unit: entry.unit || p.unit,
            measuredAt: new Date().toISOString().split('T')[0],
            source: entry.source || 'manual',
            sourceDocument: 'Manual Questionnaire Entry',
            verificationStatus: 'verified',
            availability: 'available',
            normalRange: p.normalRange
          });
        }
      }
    });
  };

  const handleNext = () => {
    const stepObj = STEPS[currentStep - 1];
    if (stepObj && stepObj.category !== 'personal' && stepObj.category !== 'medical_history' && stepObj.category !== 'provenance') {
      saveCurrentStepParams(stepObj.category);
    }

    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercent = Math.round((currentStep / STEPS.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Step Progress Header */}
      <div className="bg-white p-6 rounded-2xl border border-border-subtle shadow-card">
        <div className="flex items-center justify-between text-xs font-semibold text-secondary-text mb-2">
          <span>STEP {currentStep} OF {STEPS.length}: {STEPS[currentStep - 1].title.toUpperCase()}</span>
          <span className="text-primary-blue">{progressPercent}% COMPLETED</span>
        </div>
        <div className="w-full h-2 rounded-full bg-bg-subtle overflow-hidden">
          <div
            className="h-full bg-primary-blue transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step Icons Pill Bar */}
        <div className="flex items-center justify-between mt-4 overflow-x-auto pb-1 gap-2">
          {STEPS.map(s => {
            const Icon = s.icon;
            const isDone = s.id < currentStep;
            const isCurrent = s.id === currentStep;

            return (
              <button
                key={s.id}
                onClick={() => setCurrentStep(s.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 ${
                  isCurrent
                    ? 'bg-primary-blue text-white shadow-sm'
                    : isDone
                    ? 'bg-blue-50 text-primary-blue border border-blue-200'
                    : 'bg-bg-subtle text-secondary-text hover:bg-gray-200'
                }`}
              >
                {isDone ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                <span className="hidden md:inline">{s.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Questionnaire Form Card */}
      <div className="norelis-card p-8">
        {/* STEP 1: PERSONAL PROFILE */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-deep-navy mb-1">Step 1 — Personal & Anthropometric Profile</h3>
              <p className="text-xs text-secondary-text">
                Enter your individual physiological identification parameters used for baseline normalization.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-deep-navy mb-1">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Sarah Chen"
                  value={activeAssessment.personalInformation.fullName}
                  onChange={e => updatePersonalInfo({ fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle bg-bg-subtle text-xs text-deep-navy focus:bg-white focus:outline-none focus:border-primary-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-deep-navy mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={activeAssessment.personalInformation.dob}
                  onChange={e => updatePersonalInfo({ dob: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle bg-bg-subtle text-xs text-deep-navy focus:bg-white focus:outline-none focus:border-primary-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-deep-navy mb-1">Age</label>
                <input
                  type="number"
                  placeholder="38"
                  value={activeAssessment.personalInformation.age}
                  onChange={e => updatePersonalInfo({ age: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle bg-bg-subtle text-xs text-deep-navy focus:bg-white focus:outline-none focus:border-primary-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-deep-navy mb-1">Biological Sex (Medical Baseline)</label>
                <select
                  value={activeAssessment.personalInformation.biologicalSex}
                  onChange={e => updatePersonalInfo({ biologicalSex: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle bg-bg-subtle text-xs text-deep-navy focus:bg-white focus:outline-none focus:border-primary-blue"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-deep-navy mb-1">Height (cm)</label>
                <input
                  type="number"
                  placeholder="168"
                  value={activeAssessment.personalInformation.heightCm}
                  onChange={e => updatePersonalInfo({ heightCm: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle bg-bg-subtle text-xs text-deep-navy focus:bg-white focus:outline-none focus:border-primary-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-deep-navy mb-1">Weight / Body Mass (kg)</label>
                <input
                  type="number"
                  placeholder="62"
                  value={activeAssessment.personalInformation.weightKg}
                  onChange={e => updatePersonalInfo({ weightKg: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle bg-bg-subtle text-xs text-deep-navy focus:bg-white focus:outline-none focus:border-primary-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-deep-navy mb-1">Nationality</label>
                <input
                  type="text"
                  placeholder="United States"
                  value={activeAssessment.personalInformation.nationality || ''}
                  onChange={e => updatePersonalInfo({ nationality: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle bg-bg-subtle text-xs text-deep-navy focus:bg-white focus:outline-none focus:border-primary-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-deep-navy mb-1">Mission Assignment</label>
                <select
                  value={activeAssessment.personalInformation.missionStatus || 'pre_mission'}
                  onChange={e => updatePersonalInfo({ missionStatus: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle bg-bg-subtle text-xs text-deep-navy focus:bg-white focus:outline-none focus:border-primary-blue"
                >
                  <option value="pre_mission">Pre-Mission Baseline Calibration</option>
                  <option value="in_flight">Active Flight / Exploration Mission</option>
                  <option value="lunar_orbit">Lunar Orbit / Gateway</option>
                  <option value="post_mission">Post-Flight Re-adaptation</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: MEDICAL HISTORY */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-deep-navy mb-1">Step 2 — Medical & Clinical History</h3>
              <p className="text-xs text-secondary-text">
                Document relevant prior clinical diagnoses, surgical interventions, and pharmacological regimens.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-deep-navy mb-1">Cardiovascular History</label>
                <textarea
                  rows={2}
                  value={activeAssessment.medicalHistory.cardiovascularHistory}
                  onChange={e => updateMedicalHistory({ cardiovascularHistory: e.target.value })}
                  placeholder="e.g. Endurance athlete; no arrhythmias or murmurs."
                  className="w-full p-3 rounded-xl border border-border-subtle bg-bg-subtle text-xs text-deep-navy focus:bg-white focus:outline-none focus:border-primary-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-deep-navy mb-1">Respiratory History</label>
                <textarea
                  rows={2}
                  value={activeAssessment.medicalHistory.respiratoryHistory}
                  onChange={e => updateMedicalHistory({ respiratoryHistory: e.target.value })}
                  placeholder="e.g. No asthma, non-smoker, normal spirometry."
                  className="w-full p-3 rounded-xl border border-border-subtle bg-bg-subtle text-xs text-deep-navy focus:bg-white focus:outline-none focus:border-primary-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-deep-navy mb-1">Neurological History</label>
                <textarea
                  rows={2}
                  value={activeAssessment.medicalHistory.neurologicalHistory}
                  onChange={e => updateMedicalHistory({ neurologicalHistory: e.target.value })}
                  placeholder="e.g. No seizure disorders, migraines, or head trauma."
                  className="w-full p-3 rounded-xl border border-border-subtle bg-bg-subtle text-xs text-deep-navy focus:bg-white focus:outline-none focus:border-primary-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-deep-navy mb-1">Prior Surgeries</label>
                <textarea
                  rows={2}
                  value={activeAssessment.medicalHistory.previousSurgeries}
                  onChange={e => updateMedicalHistory({ previousSurgeries: e.target.value })}
                  placeholder="e.g. None or appendectomy (2018)."
                  className="w-full p-3 rounded-xl border border-border-subtle bg-bg-subtle text-xs text-deep-navy focus:bg-white focus:outline-none focus:border-primary-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-deep-navy mb-1">Allergies</label>
                <input
                  type="text"
                  value={activeAssessment.medicalHistory.allergies}
                  onChange={e => updateMedicalHistory({ allergies: e.target.value })}
                  placeholder="e.g. NKDA (No known drug allergies)"
                  className="w-full p-3 rounded-xl border border-border-subtle bg-bg-subtle text-xs text-deep-navy focus:bg-white focus:outline-none focus:border-primary-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-deep-navy mb-1">Current Prescribed Medications</label>
                <input
                  type="text"
                  value={activeAssessment.medicalHistory.currentMedications}
                  onChange={e => updateMedicalHistory({ currentMedications: e.target.value })}
                  placeholder="e.g. None or daily multivitamin"
                  className="w-full p-3 rounded-xl border border-border-subtle bg-bg-subtle text-xs text-deep-navy focus:bg-white focus:outline-none focus:border-primary-blue"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEPS 3 to 8: PARAMETER CATEGORIES */}
        {currentStep >= 3 && currentStep <= 8 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-deep-navy mb-1">
                Step {currentStep} — {STEPS[currentStep - 1].title} Measurements
              </h3>
              <p className="text-xs text-secondary-text">
                Enter your typical Earth-based objective measurements. Leave fields blank if unmeasured.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.values(PARAMETER_REGISTRY)
                .filter(p => p.category === STEPS[currentStep - 1].category)
                .map(param => (
                  <div key={param.key} className="p-4 rounded-xl bg-bg-subtle border border-border-subtle space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-deep-navy">{param.name}</span>
                      <span className="text-[10px] text-secondary-text font-mono">
                        Ref: {param.normalRange[0]} - {param.normalRange[1]} {param.unit}
                      </span>
                    </div>

                    <p className="text-[11px] text-secondary-text">{param.description}</p>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        placeholder={`e.g. ${param.normalRange[0]}`}
                        value={formData[param.key]?.value || ''}
                        onChange={e => handleParamChange(param.key, e.target.value, param.unit)}
                        className="w-28 px-3 py-1.5 rounded-lg border border-border-subtle bg-white text-xs font-semibold text-deep-navy focus:outline-none focus:border-primary-blue"
                      />
                      <span className="text-xs text-secondary-text font-medium">{param.unit}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* STEP 9: DATA PROVENANCE */}
        {currentStep === 9 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-deep-navy mb-1">Step 9 — Measurement Provenance Tagging</h3>
              <p className="text-xs text-secondary-text">
                Identify the primary source devices and measurement methods for entered values.
              </p>
            </div>

            <div className="space-y-3">
              {Object.values(PARAMETER_REGISTRY).slice(0, 8).map(param => (
                <div key={param.key} className="p-3 rounded-xl bg-bg-subtle border border-border-subtle flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-deep-navy">{param.name}</span>
                    <p className="text-[10px] text-secondary-text">Default device category</p>
                  </div>

                  <select
                    value={formData[param.key]?.source || 'device'}
                    onChange={e => handleParamChange(param.key, formData[param.key]?.value || '', param.unit, e.target.value)}
                    className="px-3 py-1 rounded-lg border border-border-subtle bg-white text-xs font-medium text-deep-navy focus:outline-none"
                  >
                    <option value="wearable">Wearable Biosensor</option>
                    <option value="device">Approved Medical Device</option>
                    <option value="laboratory">Clinical Laboratory</option>
                    <option value="manual">Manual Self-Report</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-8 border-t border-border-subtle mt-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-5 py-2.5 rounded-xl border border-border-subtle bg-white text-deep-navy text-xs font-semibold hover:bg-bg-subtle disabled:opacity-40 transition-colors flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-primary-blue text-white text-xs font-semibold hover:bg-bright-blue transition-colors flex items-center gap-1.5 shadow-sm"
          >
            {currentStep === STEPS.length ? 'Proceed to Unified Review' : 'Save & Continue'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
