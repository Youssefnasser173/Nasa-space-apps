import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FullBodyAnatomyViewer } from '../../../../features/anatomy/FullBodyAnatomyViewer';
import { FuturisticDualBodyScanner } from '../../../../features/anatomy/FuturisticDualBodyScanner';
import { AnatomicalModelType, OrganKey } from '../../../../types';
import { OrganIndicatorsShowcase } from '@/components/common/OrganIndicatorsShowcase';
import {
  Activity,
  ArrowRight,
  Shield,
  HeartPulse,
  BrainCircuit,
  Orbit,
  Radio,
  FileCheck,
  CheckCircle2,
  Stethoscope,
  Sparkles,
  ExternalLink,
  Users,
  Compass,
  Wind,
  Layers,
  Image as ImageIcon,
  Zap
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<AnatomicalModelType>('female');
  const [hoveredOrgan, setHoveredOrgan] = useState<OrganKey | null>(null);
  const [heroViewMode, setHeroViewMode] = useState<'scanner' | 'indicators'>('scanner');

  return (
    <div className="min-h-screen bg-[#F6F8FC] text-primary-text selection:bg-blue-100 selection:text-primary-blue flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-border-subtle shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary-blue flex items-center justify-center text-white shadow-sm shadow-primary-blue/30">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-wider text-deep-navy">NORELIS</span>
              <span className="hidden sm:inline text-[11px] text-secondary-text ml-2">Human Health Intelligence</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-secondary-text">
            <a href="#how-it-works" className="hover:text-deep-navy transition-colors">How It Works</a>
            <a href="#health-systems" className="hover:text-deep-navy transition-colors">Health Systems</a>
            <a href="#five-hazards" className="hover:text-deep-navy transition-colors">NASA Five Hazards</a>
            <a href="#differentiators" className="hover:text-deep-navy transition-colors">Platform Architecture</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-deep-navy hover:bg-bg-subtle transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-xl bg-primary-blue text-white text-xs font-bold hover:bg-bright-blue transition-colors shadow-sm shadow-primary-blue/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION — DUAL MALE & FEMALE ANATOMICAL BODY SCANNER */}
      <section className="relative pt-6 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Hero Top Header & Mode Switcher */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-primary-blue border border-blue-200">
                <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
                <span>Dual Male & Female Futuristic Anatomical Scanning System</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-deep-navy tracking-tight leading-tight">
                Anatomy-Connected Astronaut Health Intelligence & Baselines
              </h1>
              <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
                NORELIS establishes an individual's Earth-based physiological reference through volumetric body scanning. Compare real-time telemetry against individualized baselines, track organ deviations, and explore live medical X-ray tissue excitation.
              </p>
            </div>

            {/* View Switcher: Full Body Futuristic Scanner vs Organ Telemetry Deck */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center p-1 rounded-xl bg-white border border-border-subtle shadow-sm text-xs">
                <button
                  onClick={() => setHeroViewMode('scanner')}
                  className={`px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    heroViewMode === 'scanner'
                      ? 'bg-primary-blue text-white shadow-sm'
                      : 'text-secondary-text hover:text-deep-navy'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Dual Body Scanner (Live)</span>
                </button>
                <button
                  onClick={() => setHeroViewMode('indicators')}
                  className={`px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    heroViewMode === 'indicators'
                      ? 'bg-primary-blue text-white shadow-sm'
                      : 'text-secondary-text hover:text-deep-navy'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Organ Indicators Deck</span>
                </button>
              </div>

              <Link
                to="/signup"
                className="px-5 py-2.5 rounded-xl bg-primary-blue text-white text-xs font-bold hover:bg-bright-blue transition-colors flex items-center gap-2 shadow-sm shadow-primary-blue/30 whitespace-nowrap"
              >
                <span>BEGIN BASELINE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* MAIN HERO CENTERPIECE: DUAL MALE & FEMALE BODY SCANNER */}
          {heroViewMode === 'scanner' ? (
            <div className="w-full">
              <FuturisticDualBodyScanner
                initialModel={selectedProfile}
                onModelChange={setSelectedProfile}
                onSelectOrgan={() => {}}
              />
            </div>
          ) : (
            /* DYNAMIC ORGAN INDICATORS SHOWCASE */
            <div className="w-full">
              <OrganIndicatorsShowcase
                onExploreMore={() => {}}
              />
            </div>
          )}

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-white border border-border-subtle shadow-sm">
              <span className="text-xs text-secondary-text block">Volumetric Scanner</span>
              <strong className="text-lg font-black text-deep-navy">Male & Female Models</strong>
              <p className="text-[11px] text-secondary-text mt-0.5">Continuous 142.8 GHz laser excitation</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-border-subtle shadow-sm">
              <span className="text-xs text-secondary-text block">Baseline Engine</span>
              <strong className="text-lg font-black text-deep-navy">Individualized Reference</strong>
              <p className="text-[11px] text-secondary-text mt-0.5">Personal averages & confidence scores</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-border-subtle shadow-sm">
              <span className="text-xs text-secondary-text block">Organ Intelligence</span>
              <strong className="text-lg font-black text-deep-navy">360° Biological Shaders</strong>
              <p className="text-[11px] text-secondary-text mt-0.5">Hotspot telemetry & live waveforms</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-border-subtle shadow-sm">
              <span className="text-xs text-secondary-text block">NASA Hazards</span>
              <strong className="text-lg font-black text-deep-navy">Five Hazards Matrix</strong>
              <p className="text-[11px] text-secondary-text mt-0.5">Space environment correlation</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-16 bg-white border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-primary-blue uppercase tracking-wider">Methodology</span>
            <h2 className="text-2xl sm:text-3xl font-black text-deep-navy">How NORELIS Works</h2>
            <p className="text-xs sm:text-sm text-secondary-text">
              From personal medical records to autonomous deep-space health intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-bg-subtle border border-border-subtle space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-primary-blue font-bold flex items-center justify-center text-sm">
                01
              </div>
              <h4 className="text-sm font-bold text-deep-navy">Dual-Path Intake</h4>
              <p className="text-xs text-secondary-text leading-relaxed">
                Provide health data via automated client-side medical file extraction (PDF, DOCX, CSV) or complete our guided 10-step questionnaire.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-bg-subtle border border-border-subtle space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-primary-blue font-bold flex items-center justify-center text-sm">
                02
              </div>
              <h4 className="text-sm font-bold text-deep-navy">Calibrate Earth Baseline</h4>
              <p className="text-xs text-secondary-text leading-relaxed">
                Establish an individual Earth reference standard with personal averages, standard deviations, and longitudinal confidence metrics.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-bg-subtle border border-border-subtle space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-primary-blue font-bold flex items-center justify-center text-sm">
                03
              </div>
              <h4 className="text-sm font-bold text-deep-navy">Anatomy Connection</h4>
              <p className="text-xs text-secondary-text leading-relaxed">
                Inspect 3D human body systems. Hover over brain, heart, lungs, liver, and kidneys to inspect corresponding telemetry.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-bg-subtle border border-border-subtle space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-primary-blue font-bold flex items-center justify-center text-sm">
                04
              </div>
              <h4 className="text-sm font-bold text-deep-navy">Spaceflight Deviation</h4>
              <p className="text-xs text-secondary-text leading-relaxed">
                Monitor in-flight telemetry deviations against personal Earth baselines and contextualize against the NASA Five Hazards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HEALTH SYSTEMS SECTION */}
      <section id="health-systems" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-primary-blue uppercase tracking-wider">Human Physiology</span>
            <h2 className="text-2xl sm:text-3xl font-black text-deep-navy">Comprehensive Physiological Systems</h2>
            <p className="text-xs sm:text-sm text-secondary-text">
              NORELIS monitors six primary organ and regulatory domains critical to astronaut health and mission safety.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Cardiovascular Dynamics', desc: 'Cephalad fluid redistribution, baroreceptor resetting, resting HR variability, and stroke volume adaptation.', icon: HeartPulse, organ: 'heart' },
              { title: 'Pulmonary & Respiratory', desc: 'SpO2 oxygen saturation, respiratory frequency, and ventilation-perfusion matching in hypobaric cabin atmosphere.', icon: Wind, organ: 'right-lung' },
              { title: 'Neurological & Cognition', desc: 'Circadian rhythm stability, actigraphy sleep efficiency, Spaceflight-Associated Neuro-ocular Syndrome (SANS), and reaction time.', icon: BrainCircuit, organ: 'brain' },
              { title: 'Musculoskeletal Framework', desc: 'DXA trabecular bone mineral density resorption, antigravity postural muscle preservation, and peak grip strength.', icon: Activity, organ: 'musculoskeletal' },
              { title: 'Immune & Radiation', desc: 'Galactic cosmic radiation cumulative dose budgeting, white blood cell dynamics, and latent viral reactivation surveillance.', icon: Shield, organ: 'musculoskeletal' },
              { title: 'Behavioral & Psychological', desc: 'Small-team operational readiness, circadian blue-enriched photic adaptation, perceived stress indices, and cognitive throughput.', icon: Users, organ: 'brain' }
            ].map((sys, idx) => {
              const Icon = sys.icon;
              return (
                <div key={idx} className="norelis-card p-6 flex flex-col justify-between space-y-4 hover:border-primary-blue transition-colors">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary-blue flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-deep-navy">{sys.title}</h4>
                    <p className="text-xs text-secondary-text leading-relaxed">{sys.desc}</p>
                  </div>
                  <Link
                    to={`/vitals?organ=${sys.organ}`}
                    className="text-xs font-bold text-primary-blue hover:underline inline-flex items-center gap-1 pt-2 border-t border-border-subtle"
                  >
                    <span>Inspect 3D Anatomy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FIVE HAZARDS INTRODUCTION */}
      <section id="five-hazards" className="py-16 bg-white border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-primary-blue uppercase tracking-wider">Mission Environment</span>
              <h2 className="text-2xl sm:text-3xl font-black text-deep-navy tracking-tight">
                NASA Five Hazards of Human Spaceflight
              </h2>
              <p className="text-xs sm:text-sm text-secondary-text mt-1">
                Contextualizing human physiological adaptation within NASA Human Research Program operational hazard models.
              </p>
            </div>
            <Link
              to="/hazards"
              className="px-4 py-2 rounded-xl bg-deep-navy text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-sm shrink-0"
            >
              <span>Explore Interactive Framework</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { title: 'Space Radiation', key: 'radiation', desc: 'Galactic cosmic rays & solar particle events beyond Earth magnetosphere.' },
              { title: 'Isolation & Confinement', key: 'isolation', desc: 'Psychosocial friction, sleep debt, and circadian desynchrony.' },
              { title: 'Distance from Earth', key: 'distance', desc: 'Communication latency demanding onboard autonomous health decision support.' },
              { title: 'Gravity Fields', key: 'gravity', desc: 'Microgravity, Lunar (1/6g), and Martian (3/8g) musculoskeletal unloading.' },
              { title: 'Closed Environments', key: 'environment', desc: 'Spacecraft environmental scrubbers, cabin acoustics, and microbiome shifts.' }
            ].map((h, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-bg-subtle border border-border-subtle space-y-2">
                <span className="text-xs font-bold text-deep-navy block">{h.title}</span>
                <p className="text-[11px] text-secondary-text leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 text-primary-blue mx-auto flex items-center justify-center">
            <Activity className="w-7 h-7" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-deep-navy tracking-tight">
            Ready to Initialize Your Personalized Health Baseline?
          </h2>
          <p className="text-sm text-secondary-text max-w-xl mx-auto leading-relaxed">
            Begin with your medical files or our guided assessment. Experience personalized health intelligence designed for the rigors of exploration.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary-blue text-white text-xs font-bold hover:bg-bright-blue transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>GET STARTED NOW</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/admin/login"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-deep-navy hover:bg-bg-subtle border border-border-subtle text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Shield className="w-4 h-4 text-primary-blue" />
              <span>Flight Surgeon Console</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-border-subtle bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary-blue flex items-center justify-center text-white">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-base tracking-wider text-deep-navy">NORELIS</span>
              </div>
              <p className="text-xs text-secondary-text max-w-md">
                Personalized Human Health Intelligence Platform. Connecting interactive 3D human anatomy, longitudinal Earth baselines, and spaceflight telemetry.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-xs text-secondary-text">
              <Link to="/overview" className="hover:text-deep-navy">User Portal</Link>
              <Link to="/vitals" className="hover:text-deep-navy">Vital Readings</Link>
              <Link to="/earth-baseline" className="hover:text-deep-navy">Earth Baseline</Link>
              <Link to="/predicted-space-baseline" className="hover:text-deep-navy">Predicted Space Baseline</Link>
              <Link to="/admin/login" className="hover:text-deep-navy">Admin Portal</Link>
            </div>
          </div>

          <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-secondary-text">
            <span>© 2026 NORELIS Project • NASA Space Apps Challenge Frontend Demonstration</span>
            <span>Not an official NASA application • Not a diagnostic medical device</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
