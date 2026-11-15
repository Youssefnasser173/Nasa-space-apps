import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { useHealth } from '../../../../contexts/HealthContext';
import {
  Heart,
  Wind,
  Brain,
  Dumbbell,
  Shield,
  Smile,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Activity,
  Orbit,
  BrainCircuit,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { OrganKey } from '../../../../types';

export const OverviewDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { alerts, earthBaselines, spaceProjections, monitoringReadings } = useHealth();
  const navigate = useNavigate();

  const astro = currentUser || {
    id: 'AG-001',
    name: 'Dr. Sarah Chen',
    missionStatus: 'in_flight',
    missionDays: 45,
    missionName: 'Artemis IV Lunar Surface Habitat',
    baselineStatus: 'validated',
    lastUpdated: '2026-11-15T13:45:00Z'
  };

  const baseline = earthBaselines[astro.id] || earthBaselines['AG-001'];
  const projection = spaceProjections[astro.id] || spaceProjections['AG-001'];

  // Navigate to vitals and select specific organ
  const handleSelectSystem = (organ: OrganKey) => {
    navigate(`/vitals?organ=${organ}`);
  };

  const systems = [
    {
      organ: 'heart' as OrganKey,
      title: 'Cardiovascular',
      icon: Heart,
      color: 'text-red-500 bg-red-50',
      summary: '62.7 bpm • Blood Pressure 119/74 mmHg',
      status: 'Nominal Adaptive Shift',
      statusColor: 'text-status-success bg-emerald-50 border-emerald-200',
      updated: '15m ago'
    },
    {
      organ: 'right-lung' as OrganKey,
      title: 'Respiratory',
      icon: Wind,
      color: 'text-teal-500 bg-teal-50',
      summary: 'SpO2 98.1% • Resp Rate 13 bpm',
      status: 'Stable Pulmonary Perfusion',
      statusColor: 'text-status-success bg-emerald-50 border-emerald-200',
      updated: '30m ago'
    },
    {
      organ: 'brain' as OrganKey,
      title: 'Brain & Neurological',
      icon: Brain,
      color: 'text-purple-500 bg-purple-50',
      summary: 'Sleep 6.4h • Cognitive Throughput 92.8 pts',
      status: 'Observation: REM Reduction',
      statusColor: 'text-amber-700 bg-amber-50 border-amber-200',
      updated: '2h ago'
    },
    {
      organ: 'musculoskeletal' as OrganKey,
      title: 'Musculoskeletal',
      icon: Dumbbell,
      color: 'text-blue-500 bg-blue-50',
      summary: 'BMD 1.162 g/cm² • Grip Strength 46.1 kg',
      status: 'Elevated: Bone Resorption Trend',
      statusColor: 'text-amber-700 bg-amber-50 border-amber-200',
      updated: '4h ago'
    },
    {
      organ: 'musculoskeletal' as OrganKey,
      title: 'Immune & Radiation',
      icon: Shield,
      color: 'text-indigo-500 bg-indigo-50',
      summary: 'WBC 6.1 ×10⁹/L • Cumulative Dose 18.4 mGy',
      status: 'Within Permissible Bounds',
      statusColor: 'text-status-success bg-emerald-50 border-emerald-200',
      updated: '1d ago'
    },
    {
      organ: 'brain' as OrganKey,
      title: 'Behavioral Health',
      icon: Smile,
      color: 'text-pink-500 bg-pink-50',
      summary: 'Readiness 8.5/10 • Circadian Alignment 84%',
      status: 'Optimal Operational Readiness',
      statusColor: 'text-status-success bg-emerald-50 border-emerald-200',
      updated: '5h ago'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Title & Welcome */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-deep-navy tracking-tight">
            YOUR HEALTH OVERVIEW
          </h1>
          <p className="text-xs sm:text-sm text-secondary-text mt-1">
            Welcome back, <strong className="text-deep-navy font-bold">{astro.name}</strong>. Here is your current physiological status and baseline comparison.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/vitals"
            className="px-4 py-2.5 rounded-xl bg-primary-blue text-white text-xs font-semibold hover:bg-bright-blue transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span>Explore 3D Full-Body</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Top 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="norelis-card p-5">
          <p className="text-[11px] font-bold text-secondary-text uppercase tracking-wider">Astronaut ID</p>
          <p className="text-xl font-black text-deep-navy font-mono mt-1">{astro.id}</p>
          <p className="text-[11px] text-primary-blue font-semibold mt-1 truncate">{astro.missionName}</p>
        </div>

        <div className="norelis-card p-5">
          <p className="text-[11px] font-bold text-secondary-text uppercase tracking-wider">Mission Status</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-status-success animate-pulse" />
            <p className="text-base font-bold text-deep-navy capitalize">{astro.missionStatus.replace('_', ' ')}</p>
          </div>
          <p className="text-[11px] text-secondary-text mt-1 font-mono">Mission Day {astro.missionDays}</p>
        </div>

        <div className="norelis-card p-5">
          <p className="text-[11px] font-bold text-secondary-text uppercase tracking-wider">Earth Baseline Status</p>
          <div className="mt-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-status-success" />
            <span className="text-base font-bold text-deep-navy capitalize">{astro.baselineStatus}</span>
          </div>
          <p className="text-[11px] text-secondary-text mt-1 font-mono">{baseline?.dataCompleteness ?? 98}% Objective Completeness</p>
        </div>

        <div className="norelis-card p-5">
          <p className="text-[11px] font-bold text-secondary-text uppercase tracking-wider">Latest Telemetry Update</p>
          <div className="flex items-center gap-1.5 mt-1 text-deep-navy font-bold text-sm">
            <Clock className="w-4 h-4 text-primary-blue" />
            <span>Today, 14:30 UTC</span>
          </div>
          <p className="text-[11px] text-status-success font-medium mt-1">Direct Biosensor Sync OK</p>
        </div>
      </div>

      {/* Health Snapshot: 6 Clickable Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-deep-navy">Health Systems Snapshot</h3>
            <p className="text-xs text-secondary-text">Select any system to inspect 3D anatomy and physiological time series</p>
          </div>
          <span className="text-xs text-secondary-text hidden sm:inline">Click card to open 3D model</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systems.map((sys, idx) => {
            const Icon = sys.icon;
            return (
              <div
                key={idx}
                onClick={() => handleSelectSystem(sys.organ)}
                className="norelis-card p-5 cursor-pointer hover:border-primary-blue transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${sys.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-deep-navy group-hover:text-primary-blue transition-colors">
                        {sys.title}
                      </h4>
                    </div>
                    <span className="text-[10px] text-secondary-text">{sys.updated}</span>
                  </div>

                  <p className="text-xs font-semibold text-deep-navy mb-3 font-mono">
                    {sys.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-border-subtle flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${sys.statusColor}`}>
                    {sys.status}
                  </span>
                  <span className="text-xs font-bold text-primary-blue flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Readings <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dual Baseline Snapshot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* EARTH BASELINE SNAPSHOT */}
        <div className="norelis-card p-6 bg-gradient-to-br from-white to-blue-50/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-primary-blue">
                <BrainCircuit className="w-3.5 h-3.5" /> Earth Reference Standard
              </span>
              <span className="text-xs text-status-success font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Validated
              </span>
            </div>

            <h3 className="text-lg font-bold text-deep-navy mb-1">
              EARTH HEALTH BASELINE
            </h3>
            <p className="text-xs text-secondary-text mb-4 leading-relaxed">
              Your personal reference profile established through 180 days of pre-flight clinic measurements, objective wearable data, and functional exercise tests.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
              <div className="p-3 rounded-xl bg-white border border-border-subtle">
                <span className="text-secondary-text block text-[11px]">Measurement Period:</span>
                <span className="font-semibold text-deep-navy">180 Days Earth Calibration</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-border-subtle">
                <span className="text-secondary-text block text-[11px]">Data Completeness:</span>
                <span className="font-semibold text-primary-blue font-mono">98.4% (1,420 readings)</span>
              </div>
            </div>
          </div>

          <Link
            to="/earth-baseline"
            className="w-full py-3 rounded-xl bg-white hover:bg-bg-subtle border border-border-subtle font-semibold text-xs text-deep-navy flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <span>Open Earth Baseline Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* PREDICTED SPACE BASELINE SNAPSHOT */}
        <div className="norelis-card p-6 bg-gradient-to-br from-white to-purple-50/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-violet-accent">
                <Orbit className="w-3.5 h-3.5" /> Exploratory Space Reference
              </span>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                SIMULATED PROJECTION
              </span>
            </div>

            <h3 className="text-lg font-bold text-deep-navy mb-1">
              PREDICTED SPACE BASELINE
            </h3>
            <p className="text-xs text-secondary-text mb-4 leading-relaxed">
              Exploratory physiological projections estimating expected cardiovascular, fluid, and musculoskeletal shifts under Lunar and Microgravity conditions.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
              <div className="p-3 rounded-xl bg-white border border-border-subtle">
                <span className="text-secondary-text block text-[11px]">Current Mission Phase:</span>
                <span className="font-semibold text-deep-navy capitalize">{projection?.missionPhase.replace('_', ' ')}</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-border-subtle">
                <span className="text-secondary-text block text-[11px]">Projection Confidence:</span>
                <span className="font-semibold text-violet-accent capitalize">{projection?.confidenceStatus} Confidence</span>
              </div>
            </div>
          </div>

          <Link
            to="/predicted-space-baseline"
            className="w-full py-3 rounded-xl bg-white hover:bg-bg-subtle border border-border-subtle font-semibold text-xs text-deep-navy flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <span>Open Predicted Space Baseline</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Recent Alerts Panel */}
      <div className="norelis-card p-6">
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-deep-navy">Active Monitoring Alerts ({alerts.length})</h3>
          </div>
          <Link to="/alerts" className="text-xs font-semibold text-primary-blue hover:underline">
            View All Alerts →
          </Link>
        </div>

        <div className="space-y-3">
          {alerts.map(alert => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
                alert.severity === 'significant'
                  ? 'bg-red-50/60 border-red-200'
                  : alert.severity === 'unusual'
                  ? 'bg-amber-50/60 border-amber-200'
                  : 'bg-emerald-50/60 border-emerald-200'
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-deep-navy text-sm">{alert.parameter}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white border border-border-subtle">
                    {alert.organ}
                  </span>
                </div>
                <p className="text-secondary-text">
                  Current: <strong className="font-mono text-deep-navy">{alert.currentValue} {alert.unit}</strong> (Baseline: {alert.personalBaseline} {alert.unit}, Δ {alert.difference > 0 ? `+${alert.difference}` : alert.difference}) • {alert.duration}
                </p>
                <p className="text-[11px] text-secondary-text italic">{alert.notes}</p>
              </div>

              <Link
                to={`/vitals?organ=${alert.organ}`}
                className="px-3 py-1.5 rounded-lg bg-white border border-border-subtle font-semibold text-deep-navy hover:bg-bg-subtle shrink-0 shadow-sm"
              >
                Inspect Organ →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
