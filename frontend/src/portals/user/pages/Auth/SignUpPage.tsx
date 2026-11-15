import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HealthAssessmentMethodSelector } from '@/features/health-assessment/HealthAssessmentMethodSelector';
import { FileUploadZone } from '@/features/health-assessment/upload/FileUploadZone';
import { ExtractedHealthDataReview } from '@/features/health-assessment/upload/ExtractedHealthDataReview';
import { MissingInformationPanel } from '@/features/health-assessment/upload/MissingInformationPanel';
import { HealthAssessmentWizard } from '@/features/health-assessment/manual/HealthAssessmentWizard';
import { UnifiedHealthProfile } from '@/features/health-assessment/review/UnifiedHealthProfile';
import { AccountRegistrationStep } from './AccountRegistrationStep';
import { useAuth } from '@/contexts/AuthContext';
import { useHealth } from '@/contexts/HealthContext';
import { Activity, ArrowLeft } from 'lucide-react';

type SignUpStage = 'select_method' | 'upload_assessment' | 'manual_assessment' | 'unified_review' | 'account_details';

export const SignUpPage: React.FC = () => {
  const { selectedAnatomicalProfile, setAnatomicalProfile } = useAuth();
  const { setAssessmentMethod } = useHealth();
  const [stage, setStage] = useState<SignUpStage>('select_method');
  const navigate = useNavigate();

  const handleSelectMethod = (method: 'upload' | 'manual') => {
    setAssessmentMethod(method);
    if (method === 'upload') {
      setStage('upload_assessment');
    } else {
      setStage('manual_assessment');
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] py-8 px-4">
      {/* Top Header */}
      <div className="max-w-6xl mx-auto flex items-center justify-between pb-6 mb-6 border-b border-border-subtle">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary-blue flex items-center justify-center text-white shadow-sm">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-wider text-deep-navy">NORELIS</span>
            <span className="hidden sm:inline text-[11px] text-secondary-text ml-2">Personalized Health Intelligence</span>
          </div>
        </Link>

        <div className="flex items-center gap-4 text-xs">
          <span className="text-secondary-text hidden sm:inline">Already registered?</span>
          <Link
            to="/login"
            className="px-4 py-2 rounded-xl bg-white border border-border-subtle font-semibold text-deep-navy hover:bg-bg-subtle transition-colors shadow-sm"
          >
            Astronaut Login
          </Link>
        </div>
      </div>

      {/* Back button when in sub-stages */}
      {stage !== 'select_method' && (
        <div className="max-w-4xl mx-auto mb-6">
          <button
            onClick={() => {
              if (stage === 'unified_review') setStage('select_method');
              else if (stage === 'account_details') setStage('unified_review');
              else setStage('select_method');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary-text hover:text-deep-navy transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to previous step
          </button>
        </div>
      )}

      {/* Stage Router */}
      {stage === 'select_method' && (
        <HealthAssessmentMethodSelector
          selectedModel={selectedAnatomicalProfile}
          onSelectModel={setAnatomicalProfile}
          onSelectMethod={handleSelectMethod}
        />
      )}

      {stage === 'upload_assessment' && (
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-black text-deep-navy">UPLOAD YOUR MEDICAL INFORMATION</h2>
            <p className="text-xs text-secondary-text mt-1">
              Add your existing health documents to extract parameters and establish your NORELIS profile.
            </p>
          </div>

          <FileUploadZone />
          <ExtractedHealthDataReview />
          <MissingInformationPanel />

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStage('unified_review')}
              className="px-8 py-3.5 rounded-xl bg-primary-blue text-white font-bold text-xs hover:bg-bright-blue transition-colors shadow-sm"
            >
              REVIEW HEALTH PROFILE
            </button>
          </div>
        </div>
      )}

      {stage === 'manual_assessment' && (
        <HealthAssessmentWizard onComplete={() => setStage('unified_review')} />
      )}

      {stage === 'unified_review' && (
        <UnifiedHealthProfile
          onConfirm={() => setStage('account_details')}
          onEditSection={(_sec: string) => {
            setStage('upload_assessment');
          }}
        />
      )}

      {stage === 'account_details' && (
        <AccountRegistrationStep onSuccess={() => navigate('/overview')} />
      )}
    </div>
  );
};
