import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import {
  Activity,
  Lock,
  User,
  ArrowRight,
  Shield,
  AlertCircle,
  Sparkles,
  Layers,
  HeartPulse,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import { OrganIndicatorsShowcase } from '@/components/common/OrganIndicatorsShowcase';

export const LoginPage: React.FC = () => {
  const { loginUser, allAstronauts } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('AG-001');
  const [password, setPassword] = useState('astronaut123');
  const [error, setError] = useState<string | null>(null);
  const [showOriginalMockup, setShowOriginalMockup] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const success = loginUser(identifier);
    if (success) {
      navigate('/overview');
    } else {
      setError('Astronaut ID not recognized. Try one of the demo profiles below.');
    }
  };

  const handleQuickLogin = (id: string) => {
    loginUser(id);
    navigate('/overview');
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8">
      {/* Top Bar */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between pb-6 border-b border-border-subtle">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-primary-blue flex items-center justify-center text-white shadow-sm shadow-primary-blue/30">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-wider text-deep-navy">NORELIS</span>
            <span className="hidden sm:inline text-xs text-secondary-text ml-2">
              Personalized Human Health Intelligence
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowOriginalMockup(!showOriginalMockup)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-border-subtle text-xs font-semibold text-deep-navy hover:bg-bg-subtle shadow-sm transition-colors"
          >
            <ImageIcon className="w-3.5 h-3.5 text-primary-blue" />
            <span>{showOriginalMockup ? 'Show Live Dynamic View' : 'View Target UI Reference'}</span>
          </button>

          <Link
            to="/admin/login"
            className="text-xs font-semibold text-secondary-text hover:text-deep-navy flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-border-subtle shadow-sm transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-primary-blue" />
            <span>Flight Surgeon Access</span>
          </Link>
        </div>
      </header>

      {/* Main Split Section: Login Form on Left, Dynamic Organ Indicators on Right */}
      <main className="max-w-7xl mx-auto w-full my-6 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Astronaut Sign-In Form (5 cols on lg) */}
          <div className="lg:col-span-5 w-full">
            <div className="norelis-card p-6 sm:p-8 space-y-6 shadow-card-hover border-border-subtle">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-primary-blue border border-blue-200">
                  Astronaut Portal Authentication
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-deep-navy tracking-tight mt-3">
                  SIGN IN TO NORELIS
                </h1>
                <p className="text-xs text-secondary-text mt-1 leading-relaxed">
                  Access your personalized Earth physiological baseline, telemetry comparison, and interactive organ intelligence.
                </p>
              </div>

              {error && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-status-critical flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-deep-navy mb-1.5">
                    Astronaut Identifier (or Crew ID)
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-secondary-text absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. AG-001"
                      value={identifier}
                      onChange={e => setIdentifier(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-border-subtle bg-bg-subtle text-xs text-deep-navy focus:bg-white focus:outline-none focus:border-primary-blue font-mono transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-deep-navy mb-1.5">
                    Security Passcode
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-secondary-text absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-border-subtle bg-bg-subtle text-xs text-deep-navy focus:bg-white focus:outline-none focus:border-primary-blue transition-colors"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-primary-blue text-white font-bold text-xs uppercase tracking-wider hover:bg-bright-blue transition-all flex items-center justify-center gap-2 shadow-md shadow-primary-blue/30 mt-2"
                >
                  <span>ACCESS ASTRONAUT TELEMETRY</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Select Demo Accounts */}
              <div className="pt-4 border-t border-border-subtle space-y-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold text-secondary-text uppercase tracking-wider">
                    One-Click Demo Crew Profiles
                  </p>
                  <span className="text-[10px] text-primary-blue font-semibold">Ready to Test</span>
                </div>

                <div className="space-y-2">
                  {allAstronauts.slice(0, 3).map(astro => (
                    <button
                      key={astro.id}
                      onClick={() => handleQuickLogin(astro.id)}
                      className="w-full p-3 rounded-xl bg-bg-subtle hover:bg-blue-50 border border-border-subtle hover:border-primary-blue text-left flex items-center justify-between text-xs transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-white border border-border-subtle flex items-center justify-center font-bold text-primary-blue group-hover:bg-primary-blue group-hover:text-white transition-colors">
                          {astro.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-deep-navy block">{astro.name}</span>
                          <span className="text-[10px] text-secondary-text font-mono">
                            {astro.id} • {astro.anatomicalProfile.toUpperCase()} ANATOMY
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] text-primary-blue font-bold group-hover:translate-x-0.5 transition-transform">
                        Launch →
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center text-xs text-secondary-text pt-2 border-t border-border-subtle">
                <span>New astronaut crew member? </span>
                <Link to="/signup" className="text-primary-blue font-bold hover:underline">
                  Initialize Health Assessment
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Interactive Organ Indicators Showcase (7 cols on lg) */}
          <div className="lg:col-span-7 w-full">
            {showOriginalMockup ? (
              <div className="norelis-card p-6 rounded-3xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-base text-deep-navy">
                      Target Aerospace UI Design Reference
                    </h3>
                    <p className="text-xs text-secondary-text">
                      High-fidelity medical telemetry indicators (Lungs, Brain, Heart).
                    </p>
                  </div>
                  <button
                    onClick={() => setShowOriginalMockup(false)}
                    className="px-3 py-1.5 rounded-xl bg-primary-blue text-white text-xs font-bold"
                  >
                    Return to Interactive Mode
                  </button>
                </div>
                <div className="rounded-2xl overflow-hidden border border-border-subtle shadow-md">
                  <img
                    src="/assets/norelis-organ-indicators.jpg"
                    alt="Target Indicators UI"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HeartPulse className="w-4 h-4 text-primary-blue" />
                    <span className="text-xs font-bold text-deep-navy uppercase tracking-wider">
                      Live Telemetry & Organ Intelligence Console
                    </span>
                  </div>
                  <span className="text-[11px] text-secondary-text font-semibold">
                    Interactive Preview
                  </span>
                </div>

                {/* The Dynamic Organ Indicators Card matching the uploaded image */}
                <OrganIndicatorsShowcase
                  compact={true}
                  onExploreMore={() => navigate('/vitals')}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full text-center text-xs text-secondary-text pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>NORELIS • Personalized Human Health Intelligence • NASA Space Apps Demonstration</span>
        <span className="font-semibold text-deep-navy">Earth Baseline to Spaceflight Monitoring System</span>
      </footer>
    </div>
  );
};
