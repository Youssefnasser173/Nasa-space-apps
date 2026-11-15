import React from 'react';
import { CheckCircle2, AlertCircle, Edit, ShieldAlert, Award, FileText, ArrowRight, UserCheck } from 'lucide-react';
import { useHealth } from '../../../contexts/HealthContext';
import { PARAMETER_REGISTRY } from '../../../constants/parameters';
import { HealthCategory } from '../../../types';

interface UnifiedHealthProfileProps {
  onConfirm: () => void;
  onEditSection?: (section: string) => void;
}

export const UnifiedHealthProfile: React.FC<UnifiedHealthProfileProps> = ({ onConfirm, onEditSection }) => {
  const { activeAssessment, calculateCompleteness, getMissingCategories } = useHealth();
  const completeness = calculateCompleteness();
  const missingCategories = getMissingCategories();

  const sections: { cat: HealthCategory; title: string }[] = [
    { cat: 'cardiovascular', title: 'Cardiovascular Profile' },
    { cat: 'respiratory', title: 'Respiratory Profile' },
    { cat: 'brain_neurological', title: 'Brain & Neurological Profile' },
    { cat: 'musculoskeletal', title: 'Musculoskeletal Profile' },
    { cat: 'immune', title: 'Immune & Radiation Context' },
    { cat: 'behavioral', title: 'Behavioral Health Readiness' },
    { cat: 'laboratory', title: 'Laboratory & Metabolic Markers' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header and Completeness Metric */}
      <div className="norelis-card p-6 sm:p-8 bg-gradient-to-r from-white via-white to-blue-50/40">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-status-success border border-emerald-200 mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" /> Converged Health Assessment
            </span>
            <h2 className="text-2xl font-extrabold text-deep-navy tracking-tight">
              REVIEW YOUR HEALTH PROFILE
            </h2>
            <p className="text-xs sm:text-sm text-secondary-text mt-1">
              Verify your unified clinical information compiled via {activeAssessment.assessmentMethod === 'upload' ? 'medical document extraction' : activeAssessment.assessmentMethod === 'manual' ? 'guided manual assessment' : 'dual-path combined entry'}.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-border-subtle shadow-sm shrink-0">
            <div className="text-right">
              <p className="text-[11px] text-secondary-text uppercase tracking-wider font-semibold">Profile Completeness</p>
              <p className="text-2xl font-black text-primary-blue font-mono">{completeness}%</p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-blue-100 border-t-primary-blue flex items-center justify-center font-bold text-xs text-deep-navy">
              {completeness}%
            </div>
          </div>
        </div>

        {/* Scientific Principle Notice (Section 11) */}
        <div className="mt-6 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Important Scientific Distinction:</p>
            <p className="text-amber-800 mt-0.5 leading-relaxed">
              A completed health assessment profile establishes pre-flight information but does not automatically constitute a validated physiological Earth baseline. Reliable individual baselines require repeated longitudinal measurements over Earth monitoring periods to calibrate personal variability.
            </p>
          </div>
        </div>
      </div>

      {/* Personal & Anthropometric Summary Card */}
      <div className="norelis-card p-6">
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-4">
          <h4 className="text-sm font-bold text-deep-navy uppercase tracking-wider">
            Personal & Anthropometric Baseline
          </h4>
          <button
            onClick={() => onEditSection?.('personal')}
            className="text-xs text-primary-blue font-semibold hover:underline flex items-center gap-1"
          >
            <Edit className="w-3.5 h-3.5" /> Edit
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-secondary-text block">Full Name:</span>
            <span className="font-semibold text-deep-navy text-sm">{activeAssessment.personalInformation.fullName || '—'}</span>
          </div>
          <div>
            <span className="text-secondary-text block">Biological Sex:</span>
            <span className="font-semibold text-deep-navy capitalize">{activeAssessment.personalInformation.biologicalSex || '—'}</span>
          </div>
          <div>
            <span className="text-secondary-text block">Age:</span>
            <span className="font-semibold text-deep-navy">{activeAssessment.personalInformation.age || '—'} yrs</span>
          </div>
          <div>
            <span className="text-secondary-text block">Height & Weight:</span>
            <span className="font-semibold text-deep-navy">
              {activeAssessment.personalInformation.heightCm} cm • {activeAssessment.personalInformation.weightKg} kg
            </span>
          </div>
        </div>
      </div>

      {/* Medical History Summary Card */}
      <div className="norelis-card p-6">
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-4">
          <h4 className="text-sm font-bold text-deep-navy uppercase tracking-wider">
            Medical & Clinical Background
          </h4>
          <button
            onClick={() => onEditSection?.('history')}
            className="text-xs text-primary-blue font-semibold hover:underline flex items-center gap-1"
          >
            <Edit className="w-3.5 h-3.5" /> Edit
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-secondary-text block">Cardiovascular & Respiratory:</span>
            <p className="font-medium text-deep-navy mt-0.5">
              {activeAssessment.medicalHistory.cardiovascularHistory} • {activeAssessment.medicalHistory.respiratoryHistory}
            </p>
          </div>
          <div>
            <span className="text-secondary-text block">Neurological & Surgeries:</span>
            <p className="font-medium text-deep-navy mt-0.5">
              {activeAssessment.medicalHistory.neurologicalHistory} • Surgeries: {activeAssessment.medicalHistory.previousSurgeries}
            </p>
          </div>
          <div>
            <span className="text-secondary-text block">Allergies:</span>
            <p className="font-medium text-deep-navy mt-0.5">{activeAssessment.medicalHistory.allergies}</p>
          </div>
          <div>
            <span className="text-secondary-text block">Current Medications:</span>
            <p className="font-medium text-deep-navy mt-0.5">{activeAssessment.medicalHistory.currentMedications}</p>
          </div>
        </div>
      </div>

      {/* Physiological Categories Sections */}
      <div className="space-y-4">
        {sections.map(sec => {
          const paramsInSec = activeAssessment.parameters.filter(p => p.category === sec.cat);
          const expectedRegistry = Object.values(PARAMETER_REGISTRY).filter(p => p.category === sec.cat);

          return (
            <div key={sec.cat} className="norelis-card p-6">
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-4">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-deep-navy">{sec.title}</h4>
                  <span className="text-[11px] text-secondary-text font-mono">
                    ({paramsInSec.length} parameters logged)
                  </span>
                </div>
                <button
                  onClick={() => onEditSection?.(sec.cat)}
                  className="text-xs text-primary-blue font-semibold hover:underline flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" /> Modify
                </button>
              </div>

              {paramsInSec.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {paramsInSec.map(p => (
                    <div key={p.id} className="p-3 rounded-xl bg-bg-subtle border border-border-subtle">
                      <div className="flex items-center justify-between text-xs font-semibold text-deep-navy">
                        <span className="truncate">{p.name}</span>
                        <span className="font-mono text-primary-blue font-bold">
                          {p.value !== null ? `${p.value} ${p.unit || ''}` : '—'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-secondary-text mt-1.5 pt-1.5 border-t border-border-subtle/60">
                        <span className="truncate max-w-[120px]" title={p.sourceDocument}>
                          Src: {p.sourceDocument || p.source}
                        </span>
                        <span className="text-status-success font-medium capitalize">
                          {p.verificationStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-bg-subtle border border-border-subtle text-xs text-secondary-text flex items-center justify-between">
                  <span>No objective measurements entered for this category yet.</span>
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Provisional / Pending
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Confirmation and Submit Button */}
      <div className="p-6 rounded-2xl bg-white border border-border-subtle shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-deep-navy">Confirm Health Assessment</h4>
          <p className="text-xs text-secondary-text mt-0.5">
            Proceed to account credentials to generate your personalized NORELIS Astronaut identifier.
          </p>
        </div>

        <button
          onClick={onConfirm}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary-blue text-white text-sm font-bold hover:bg-bright-blue transition-colors flex items-center justify-center gap-2 shadow-sm shadow-primary-blue/20"
        >
          <span>CONFIRM HEALTH ASSESSMENT</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
