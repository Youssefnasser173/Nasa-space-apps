import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { Shield, Lock, Mail, Eye, EyeOff, ArrowRight, AlertCircle, ArrowLeft, Activity, HeartPulse } from 'lucide-react';
import { OrganIndicatorsShowcase } from '@/components/common/OrganIndicatorsShowcase';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('surgeon.lead@nasa-hrp.gov');
  const [password, setPassword] = useState('flightSurgeon2026');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const success = loginAdmin(email);
      setIsLoading(false);
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('Unauthorized administrator credentials.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8">
      {/* Top Bar */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between pb-6 border-b border-border-subtle">
        <Link to="/" className="flex items-center gap-2 text-xs font-semibold text-secondary-text hover:text-deep-navy">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Portal</span>
        </Link>
        <span className="text-[11px] font-bold uppercase tracking-wider text-primary-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Flight Medicine Terminal • Authorized Access
        </span>
      </header>

      {/* Main Split Section */}
      <main className="max-w-7xl mx-auto w-full my-6 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Admin Sign-In Form (5 cols) */}
          <div className="lg:col-span-5 w-full">
            <div className="norelis-card p-6 sm:p-8 space-y-6 shadow-card-hover border-border-subtle">
              <div className="text-center sm:text-left">
                <div className="w-12 h-12 rounded-2xl bg-deep-navy text-white flex items-center justify-center mb-3 shadow-sm">
                  <Shield className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-black text-deep-navy tracking-tight uppercase">
                  FLIGHT SURGEON CONSOLE
                </h1>
                <p className="text-xs text-secondary-text mt-1 uppercase tracking-wider font-semibold">
                  Authorized Multi-Astronaut Health Telemetry
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-status-critical flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {showForgot ? (
                <div className="p-4 rounded-xl bg-bg-subtle border border-border-subtle text-xs space-y-3">
                  <p className="font-semibold text-deep-navy">Flight Surgeon Credentials Reset:</p>
                  <p className="text-secondary-text leading-relaxed">
                    For security compliance, administrator credentials are tied to internal medical flight director consoles. Use default demo credentials: <strong>surgeon.lead@nasa-hrp.gov</strong>
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowForgot(false)}
                    className="text-primary-blue font-bold hover:underline"
                  >
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-deep-navy mb-1.5">
                      Flight Surgeon / Admin Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-secondary-text absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-border-subtle bg-bg-subtle text-xs text-deep-navy focus:bg-white focus:outline-none focus:border-primary-blue font-mono transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-deep-navy">
                        Flight Director Key
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowForgot(true)}
                        className="text-[11px] text-primary-blue hover:underline"
                      >
                        Help / Reset
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-secondary-text absolute left-3.5 top-3.5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 rounded-xl border border-border-subtle bg-bg-subtle text-xs text-deep-navy focus:bg-white focus:outline-none focus:border-primary-blue transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-secondary-text hover:text-deep-navy"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-6 rounded-xl bg-deep-navy text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 mt-2"
                  >
                    <span>{isLoading ? 'AUTHENTICATING ENCRYPTED KEY...' : 'INITIALIZE SURGEON SESSION'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Demo Notice */}
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs space-y-1">
                <span className="font-bold text-primary-blue block">Flight Medicine Demo Mode</span>
                <p className="text-secondary-text text-[11px]">
                  Default demo login preloaded. Full surveillance access across all registered Artemis crew baselines.
                </p>
              </div>

              <div className="text-center text-xs text-secondary-text pt-2 border-t border-border-subtle">
                <Link to="/login" className="text-primary-blue font-semibold hover:underline">
                  Switch to Standard Crew Astronaut Portal
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Organ Indicators Console (7 cols) */}
          <div className="lg:col-span-7 w-full space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-primary-blue" />
                <span className="text-xs font-bold text-deep-navy uppercase tracking-wider">
                  Operational Organ Telemetry Center
                </span>
              </div>
              <span className="text-[11px] text-secondary-text font-semibold">
                Multi-Astronaut Diagnostic Layer
              </span>
            </div>

            <OrganIndicatorsShowcase
              compact={true}
              onExploreMore={() => navigate('/admin/dashboard')}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full text-center text-xs text-secondary-text pt-6 border-t border-border-subtle">
        NORELIS Administration Portal • Operational Health Support Team • NASA HRP Guidelines Compliant
      </footer>
    </div>
  );
};
