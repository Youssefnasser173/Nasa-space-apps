import React from 'react';
import { FileText, ClipboardList, Shield, ArrowRight, CheckCircle2, UploadCloud, Stethoscope } from 'lucide-react';
import { AnatomicalModelType } from '../../types';
import { MaleFemaleModelSelector } from '@/components/common/MaleFemaleModelSelector';

interface HealthAssessmentMethodSelectorProps {
  selectedModel: AnatomicalModelType;
  onSelectModel: (model: AnatomicalModelType) => void;
  onSelectMethod: (method: 'upload' | 'manual') => void;
}

export const HealthAssessmentMethodSelector: React.FC<HealthAssessmentMethodSelectorProps> = ({
  selectedModel,
  onSelectModel,
  onSelectMethod
}) => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Step 1: Choose Anatomical Visualization Model (Exact CC0 3D Model Showcase from Reference Image) */}
      <div className="mb-12">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-primary-blue border border-blue-200 mb-3">
            Step 1: Visualization Preference
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-deep-navy tracking-tight mb-2">
            CHOOSE YOUR ANATOMICAL MODEL
          </h2>
          <p className="text-sm text-secondary-text max-w-2xl mx-auto">
            Select your primary anatomical visualization representation for NORELIS full-body monitoring. This preference customizes organ dimensions and proportional baseline metrics.
          </p>
        </div>

        {/* The Exact CC0 3D Humanoid Model Selector Component */}
        <MaleFemaleModelSelector
          selectedModel={selectedModel}
          onSelectModel={onSelectModel}
          onBeginBaseline={() => {
            const step2Element = document.getElementById('step2-assessment-path');
            if (step2Element) step2Element.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreNorelis={() => {
            window.location.href = '/vitals';
          }}
        />
      </div>

      <hr className="border-border-subtle mb-12" />

      {/* Step 2: Choose Assessment Path */}
      <div id="step2-assessment-path" className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-status-success border border-emerald-200 mb-3">
          Step 2: Dual-Path Health Assessment
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-deep-navy tracking-tight mb-2">
          HOW WOULD YOU LIKE TO PROVIDE YOUR HEALTH INFORMATION?
        </h1>
        <p className="text-sm md:text-base text-secondary-text max-w-2xl mx-auto">
          Choose the method that works best for you. NORELIS will organize the available information into one personalized, verifiable Earth health profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* OPTION A: UPLOAD MEDICAL RECORDS */}
        <div className="norelis-card p-8 flex flex-col justify-between hover:border-primary-blue relative group">
          <div className="absolute top-4 right-4">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-primary-blue border border-blue-200">
              Automated Extraction
            </span>
          </div>

          <div>
            <div className="w-14 h-14 rounded-2xl bg-blue-100/80 flex items-center justify-center text-primary-blue mb-5">
              <UploadCloud className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-deep-navy mb-2">
              UPLOAD EXISTING HEALTH RECORDS
            </h3>
            <p className="text-sm text-secondary-text mb-4 leading-relaxed">
              Upload your existing medical reports, laboratory results, health assessments, and other supported documents.
            </p>
            <p className="text-xs text-secondary-text mb-6 bg-bg-subtle p-3 rounded-xl border border-border-subtle">
              NORELIS client-side extraction automatically parses supported metrics, organizes them into relevant physiological categories, and identifies missing measurements for targeted completion.
            </p>

            <h5 className="text-xs font-semibold text-deep-navy uppercase tracking-wider mb-3">Supported Capabilities:</h5>
            <ul className="space-y-2 mb-6">
              {[
                'Upload clinical PDF, DOCX, CSV, XLSX, and scans',
                'Client-side instant parsing (zero external transmission)',
                'Structured preview and editable parameter values',
                'Transparent document source and provenance tracking',
                'Automatic missing measurement detection'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-secondary-text">
                  <CheckCircle2 className="w-4 h-4 text-primary-blue shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => onSelectMethod('upload')}
            className="w-full py-3.5 px-6 rounded-xl bg-primary-blue text-white font-semibold text-sm hover:bg-bright-blue transition-colors flex items-center justify-center gap-2 shadow-sm group-hover:shadow-glow-blue"
          >
            <span>UPLOAD FILES</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* OPTION B: COMPLETE HEALTH ASSESSMENT FORM */}
        <div className="norelis-card p-8 flex flex-col justify-between hover:border-teal-accent relative group">
          <div className="absolute top-4 right-4">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-teal-50 text-teal-accent border border-teal-200">
              Guided Step-by-Step
            </span>
          </div>

          <div>
            <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-accent mb-5">
              <ClipboardList className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-deep-navy mb-2">
              COMPLETE HEALTH ASSESSMENT
            </h3>
            <p className="text-sm text-secondary-text mb-4 leading-relaxed">
              Enter your personal, medical, and physiological information through a guided step-by-step questionnaire.
            </p>
            <p className="text-xs text-secondary-text mb-6 bg-bg-subtle p-3 rounded-xl border border-border-subtle">
              Enter available measurements, skip unavailable information, identify measurement devices (wearable, clinic, manual), and review everything before creating your baseline.
            </p>

            <h5 className="text-xs font-semibold text-deep-navy uppercase tracking-wider mb-3">Assessment Categories:</h5>
            <ul className="space-y-2 mb-6">
              {[
                'Step 1: Personal profile and anthropometrics',
                'Step 2: Medical, surgical, and pharmacological history',
                'Step 3 & 4: Cardiovascular and respiratory parameters',
                'Step 5 & 6: Neurological, cognitive, and musculoskeletal metrics',
                'Step 7 & 8: Immune, radiation exposure, and behavioral readiness',
                'Step 9 & 10: Provenance tagging and unified profile review'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-secondary-text">
                  <CheckCircle2 className="w-4 h-4 text-teal-accent shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => onSelectMethod('manual')}
            className="w-full py-3.5 px-6 rounded-xl bg-deep-navy text-white font-semibold text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <span>START ASSESSMENT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
