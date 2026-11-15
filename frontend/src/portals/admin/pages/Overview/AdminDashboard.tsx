import React from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { useHealth } from '../../../../contexts/HealthContext';
import { Link } from 'react-router-dom';
import {
  Users,
  Orbit,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Activity,
  Radio,
  Clock,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { allAstronauts } = useAuth();
  const { alerts, monitoringReadings } = useHealth();

  const totalAstronauts = allAstronauts.length;
  const inFlightCount = allAstronauts.filter(a => a.missionStatus === 'in_flight' || a.missionStatus === 'lunar_orbit').length;
  const validatedCount = allAstronauts.filter(a => a.baselineStatus === 'validated').length;
  const activeAlertsCount = alerts.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border-subtle">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-deep-navy tracking-tight">
              FLIGHT SURGEON MEDICAL CONSOLE
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-primary-blue border border-blue-200">
              Fleet Level Telemetry
            </span>
          </div>
          <p className="text-xs sm:text-sm text-secondary-text mt-1">
            Global astronaut health monitoring, baseline validation states, and mission anomaly triage.
          </p>
        </div>

        <Link
          to="/admin/astronauts"
          className="px-4 py-2.5 rounded-xl bg-deep-navy text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Users className="w-4 h-4" />
          <span>Open Full Crew Directory</span>
        </Link>
      </div>

      {/* Top 4 Medical Telemetry Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="norelis-card p-5">
          <span className="text-[11px] font-bold text-secondary-text uppercase tracking-wider block">Monitored Crew</span>
          <span className="text-2xl font-black text-deep-navy font-mono mt-1 block">{totalAstronauts}</span>
          <span className="text-[10px] text-primary-blue font-semibold">{totalAstronauts} Profiles Registered</span>
        </div>

        <div className="norelis-card p-5">
          <span className="text-[11px] font-bold text-secondary-text uppercase tracking-wider block">Active Exploration Flights</span>
          <span className="text-2xl font-black text-deep-navy font-mono mt-1 block">{inFlightCount}</span>
          <span className="text-[10px] text-status-success font-semibold">Artemis IV & Gateway</span>
        </div>

        <div className="norelis-card p-5">
          <span className="text-[11px] font-bold text-secondary-text uppercase tracking-wider block">Validated Earth Baselines</span>
          <span className="text-2xl font-black text-status-success font-mono mt-1 block">{validatedCount}</span>
          <span className="text-[10px] text-secondary-text font-mono">{totalAstronauts - validatedCount} Provisional / In Calibration</span>
        </div>

        <div className="norelis-card p-5">
          <span className="text-[11px] font-bold text-secondary-text uppercase tracking-wider block">Active Fleet Alerts</span>
          <span className="text-2xl font-black text-amber-600 font-mono mt-1 block">{activeAlertsCount}</span>
          <span className="text-[10px] text-amber-700 font-semibold">Observation Status</span>
        </div>
      </div>

      {/* Crew Health Telemetry Table */}
      <div className="norelis-card p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
          <div>
            <h3 className="text-base font-bold text-deep-navy">Monitored Astronaut Crew Fleet</h3>
            <p className="text-xs text-secondary-text">Click any astronaut to inspect individual 3D anatomy, Earth baseline, and space projections</p>
          </div>
          <Link to="/admin/astronauts" className="text-xs font-semibold text-primary-blue hover:underline">
            View All ({allAstronauts.length}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-bg-subtle text-secondary-text text-[10px] uppercase border-b border-border-subtle">
              <tr>
                <th className="py-3 px-4">Astronaut</th>
                <th className="py-3 px-4">Mission Status</th>
                <th className="py-3 px-4">3D Model</th>
                <th className="py-3 px-4">Baseline Calibration</th>
                <th className="py-3 px-4">Alerts</th>
                <th className="py-3 px-4">Last Sync</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {allAstronauts.map(astro => (
                <tr key={astro.id} className="hover:bg-blue-50/20 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-primary-blue font-bold flex items-center justify-center text-xs">
                        {astro.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-deep-navy">{astro.name}</span>
                        <span className="block text-[11px] font-mono text-secondary-text">{astro.id} • {astro.age}y</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="capitalize font-medium text-deep-navy">
                      {astro.missionStatus.replace('_', ' ')}
                    </span>
                    <span className="block text-[10px] text-secondary-text">Day {astro.missionDays}</span>
                  </td>

                  <td className="py-3 px-4 capitalize font-mono text-secondary-text">
                    {astro.anatomicalProfile}
                  </td>

                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                      astro.baselineStatus === 'validated'
                        ? 'bg-emerald-50 text-status-success border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {astro.baselineStatus}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    {astro.activeAlertsCount > 0 ? (
                      <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-amber-50 text-amber-700 border border-amber-200">
                        {astro.activeAlertsCount} Active
                      </span>
                    ) : (
                      <span className="text-[11px] text-secondary-text">None</span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-secondary-text text-[11px]">
                    Today 14:30
                  </td>

                  <td className="py-3 px-4 text-right">
                    <Link
                      to={`/admin/astronauts/${astro.id}`}
                      className="px-3 py-1.5 rounded-lg bg-deep-navy text-white hover:bg-slate-800 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Surgeon Review</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
