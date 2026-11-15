import React, { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { useHealth } from '../../../../contexts/HealthContext';
import {
  Radio,
  Wifi,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Thermometer,
  Gauge,
  Wind,
  Volume2,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const SpaceMonitoringDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { monitoringReadings } = useHealth();
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const environmentalTelemetry = [
    { name: 'Cabin Partial Pressure O2', value: '2.84 psi (19.6 kPa)', nominal: '2.80 - 3.10 psi', status: 'Nominal', icon: Wind },
    { name: 'Cabin CO2 Level', value: '2.1 mmHg (0.28%)', nominal: '< 3.0 mmHg nominal', status: 'Nominal', icon: Gauge },
    { name: 'Total Cabin Pressure', value: '14.7 psi (101.3 kPa)', nominal: '14.5 - 14.9 psi', status: 'Nominal', icon: Gauge },
    { name: 'Ambient Temperature', value: '21.4 °C (70.5 °F)', nominal: '20.0 - 23.0 °C', status: 'Nominal', icon: Thermometer },
    { name: 'Acoustic Sound Pressure', value: '56.4 dBA', nominal: '< 60 dBA sleep area', status: 'Nominal', icon: Volume2 },
    { name: 'Active Radiation Rate', value: '0.42 mSv / 24h', nominal: '< 0.50 mSv / 24h', status: 'Nominal', icon: ShieldAlert }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border-subtle">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-deep-navy tracking-tight">
              SPACE HEALTH MONITORING
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-status-success border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-status-success animate-ping" />
              Live Telemetry Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-secondary-text mt-1">
            Real-time in-flight physiological telemetry compared against your individualized Earth baseline.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="p-2 rounded-xl bg-white border border-border-subtle shadow-sm flex items-center gap-2 text-secondary-text font-mono">
            <Wifi className="w-3.5 h-3.5 text-status-success" /> Gateway Downlink OK (4.8s Latency)
          </span>
        </div>
      </div>

      {/* Environmental & Life Support Telemetry Strip */}
      <div className="norelis-card p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
          <h4 className="text-xs font-bold text-deep-navy uppercase tracking-wider flex items-center gap-2">
            <Gauge className="w-4 h-4 text-primary-blue" />
            Environmental & Habitation Context (ECLSS)
          </h4>
          <span className="text-[11px] text-secondary-text">Station Telemetry Stream</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {environmentalTelemetry.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-3 rounded-xl bg-bg-subtle border border-border-subtle space-y-1">
                <div className="flex items-center justify-between text-secondary-text">
                  <span className="text-[10px] font-semibold truncate">{item.name}</span>
                  <Icon className="w-3.5 h-3.5 text-primary-blue shrink-0" />
                </div>
                <p className="text-xs font-black text-deep-navy font-mono truncate">{item.value}</p>
                <div className="flex items-center justify-between text-[9px] pt-1 border-t border-border-subtle/50">
                  <span className="text-secondary-text truncate">{item.nominal}</span>
                  <span className="text-status-success font-semibold">{item.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-time Physiological Deviation Stream */}
      <div className="norelis-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle">
          <div>
            <h3 className="text-base font-bold text-deep-navy">In-Flight Physiological Deviation Stream</h3>
            <p className="text-xs text-secondary-text">Comparing telemetry against individual Earth averages (Personal Baselines)</p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[11px] text-secondary-text">Data Tag:</span>
            <span className="px-2.5 py-0.5 rounded bg-blue-50 text-primary-blue font-bold text-[10px] border border-blue-200">
              SIMULATED DATA
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-bg-subtle text-secondary-text text-[10px] uppercase border-b border-border-subtle">
              <tr>
                <th className="py-3 px-4">Biomarker</th>
                <th className="py-3 px-4">Flight Reading</th>
                <th className="py-3 px-4">Earth Baseline Avg</th>
                <th className="py-3 px-4">Personal Deviation</th>
                <th className="py-3 px-4">Telemetry Sensor Source</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle font-mono text-[11px]">
              {monitoringReadings.map(reading => {
                const isDev = reading.status === 'deviation';
                const isCritical = reading.status === 'critical';

                return (
                  <tr key={reading.id} className="hover:bg-blue-50/20 transition-colors">
                    <td className="py-3 px-4 font-sans font-semibold text-deep-navy">
                      <div>
                        <span>{reading.name}</span>
                        <span className="block text-[10px] text-secondary-text font-mono capitalize">{reading.organ}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-bold text-deep-navy text-sm">
                      {reading.value} <span className="text-xs font-normal text-secondary-text">{reading.unit}</span>
                    </td>

                    <td className="py-3 px-4 text-secondary-text">
                      {reading.earthBaselineAvg ? `${reading.earthBaselineAvg} ${reading.unit}` : '—'}
                    </td>

                    <td className="py-3 px-4">
                      {reading.deviationPercent ? (
                        <span className={`font-bold ${reading.deviationPercent > 0 ? 'text-amber-600' : 'text-primary-blue'}`}>
                          {reading.deviationPercent > 0 ? `+${reading.deviationPercent}%` : `${reading.deviationPercent}%`}
                        </span>
                      ) : (
                        <span className="text-secondary-text">0.0%</span>
                      )}
                    </td>

                    <td className="py-3 px-4 font-sans text-secondary-text text-[11px]">
                      {reading.source}
                    </td>

                    <td className="py-3 px-4 font-sans">
                      {isDev ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          Deviation
                        </span>
                      ) : isCritical ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-status-critical border border-red-200">
                          Critical Alert
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-status-success border border-emerald-200">
                          Within Bounds
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right font-sans">
                      <Link
                        to={`/vitals?organ=${reading.organ}`}
                        className="text-xs font-semibold text-primary-blue hover:underline inline-flex items-center gap-1"
                      >
                        3D View →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
