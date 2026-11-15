import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ShieldCheck, ArrowRight, UserCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../../../../contexts/AuthContext';
import { useHealth } from '../../../../contexts/HealthContext';
import { useNavigate } from 'react-router-dom';

interface AccountRegistrationStepProps {
  onSuccess: (astronautId: string) => void;
}

export const AccountRegistrationStep: React.FC<AccountRegistrationStepProps> = ({ onSuccess }) => {
  const { signupUser, selectedAnatomicalProfile } = useAuth();
  const { activeAssessment } = useHealth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [existingMissionId, setExistingMissionId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [createdAstronautId, setCreatedAstronautId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please provide a valid email and password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const newAstronaut = signupUser({
        name: activeAssessment.personalInformation.fullName || email.split('@')[0],
        age: activeAssessment.personalInformation.age || 36,
        sex: activeAssessment.personalInformation.biologicalSex || 'female',
        heightCm: activeAssessment.personalInformation.heightCm || 170,
        massKg: activeAssessment.personalInformation.weightKg || 65,
        anatomicalProfile: selectedAnatomicalProfile,
        missionName: existingMissionId ? `Assigned Mission (${existingMissionId})` : 'NORELIS Exploration Baseline Calibration'
      });

      setIsLoading(false);
      setCreatedAstronautId(newAstronaut.id);
    }, 600);
  };

  const handleFinish = () => {
    navigate('/overview');
  };

  if (createdAstronautId) {
    return (
      <div className="max-w-md mx-auto norelis-card p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-status-success mx-auto flex items-center justify-center">
          <UserCheck className="w-8 h-8" />
        </div>

        <div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-status-success border border-emerald-200">
            Registration Confirmed
          </span>
          <h2 className="text-2xl font-black text-deep-navy tracking-tight mt-3">
            WELCOME TO NORELIS
          </h2>
          <p className="text-xs text-secondary-text mt-1">
            Your personalized Earth health profile and anatomical reference have been initialized.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-bg-subtle border border-border-subtle text-left space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-secondary-text">Assigned NORELIS ID:</span>
            <span className="font-mono font-bold text-primary-blue text-sm">{createdAstronautId}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-secondary-text">Anatomical Model:</span>
            <span className="font-semibold text-deep-navy capitalize">{selectedAnatomicalProfile}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-secondary-text">Baseline Status:</span>
            <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
              Provisional Earth Baseline
            </span>
          </div>
        </div>

        <p className="text-[11px] text-secondary-text italic">
          Note: This generated astronaut identifier is specific to the NORELIS health platform demonstration and is separate from official agency flight manifests.
        </p>

        <button
          onClick={handleFinish}
          className="w-full py-3.5 px-6 rounded-xl bg-primary-blue text-white font-bold text-sm hover:bg-bright-blue transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <span>ENTER HEALTH OVERVIEW</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto norelis-card p-8 space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-deep-navy">Create Astronaut Account</h2>
        <p className="text-xs text-secondary-text mt-1">
          Save your health profile and establish your NORELIS monitoring credentials.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-status-critical font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-deep-navy mb-1">Email Address *</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-secondary-text absolute left-3 top-3" />
            <input
              type="email"
              placeholder="astronaut@space-agency.gov"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border-subtle bg-bg-subtle text-xs text-deep-navy focus:bg-white focus:outline-none focus:border-primary-blue"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-deep-navy mb-1">Password *</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-secondary-text absolute left-3 top-3" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-border-subtle bg-bg-subtle text-xs text-deep-navy focus:bg-white focus:outline-none focus:border-primary-blue"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-secondary-text hover:text-deep-navy"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-deep-navy mb-1">Confirm Password *</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-secondary-text absolute left-3 top-3" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-border-subtle bg-bg-subtle text-xs text-deep-navy focus:bg-white focus:outline-none focus:border-primary-blue"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-deep-navy mb-1">Existing Mission / Crew ID (Optional)</label>
          <input
            type="text"
            placeholder="e.g. ARTEMIS-IV-CMD"
            value={existingMissionId}
            onChange={e => setExistingMissionId(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-border-subtle bg-bg-subtle text-xs text-deep-navy focus:bg-white focus:outline-none focus:border-primary-blue"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-6 rounded-xl bg-primary-blue text-white font-bold text-sm hover:bg-bright-blue transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 mt-6"
        >
          {isLoading ? (
            <span>Generating Profile...</span>
          ) : (
            <>
              <span>COMPLETE REGISTRATION</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
