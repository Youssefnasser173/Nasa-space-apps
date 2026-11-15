import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FullBodyAnatomyViewer } from '@/features/anatomy/FullBodyAnatomyViewer';
import { Organ360Viewer } from '@/features/anatomy/Organ360Viewer';
import { useAuth } from '@/contexts/AuthContext';
import { useHealth } from '@/contexts/HealthContext';
import { useAnatomy } from '@/contexts/AnatomyContext';
import { ORGAN_DEFINITIONS, OrganDefinition } from '@/constants/organs';
import { PARAMETER_REGISTRY } from '@/constants/parameters';
import { OrganKey, MonitoringReading } from '@/types';
import {
  Search,
  ArrowLeft,
  RotateCcw,
  Activity,
  Heart,
  TrendingDown,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Info,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceArea,
  ReferenceLine
} from 'recharts';

export const VitalReadingsDashboard: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedAnatomicalProfile } = useAuth();
  const { monitoringReadings, getOrganAlerts } = useHealth();
  const { selectedOrgan, setSelectedOrgan, hoveredOrgan, setHoveredOrgan, resetToFullBody } = useAnatomy();

  const [searchFilter, setSearchFilter] = useState('');

  // Handle URL query parameter ?organ=
  useEffect(() => {
    const organParam = searchParams.get('organ') as OrganKey | null;
    if (organParam && ORGAN_DEFINITIONS[organParam]) {
      setSelectedOrgan(organParam);
    }
  }, [searchParams, setSelectedOrgan]);

  const handleSelectOrgan = (organ: OrganKey) => {
    setSelectedOrgan(organ);
    setSearchParams({ organ });
  };

  const handleBackToFullBody = () => {
    resetToFullBody();
    setSearchParams({});
  };

  const activeOrganDef: OrganDefinition | null = selectedOrgan ? ORGAN_DEFINITIONS[selectedOrgan] : null;

  // Filtered readings for selected organ
  const organReadings: MonitoringReading[] = selectedOrgan
    ? monitoringReadings.filter((r: MonitoringReading) => r.organ === selectedOrgan)
    : [];

  const organAlerts = selectedOrgan ? getOrganAlerts(selectedOrgan) : [];

  // Generate chart data for historical trend
  const chartData = [
    { day: 'Day -30', current: 58.0, baseline: 58.4, min: 54, max: 64 },
    { day: 'Day -20', current: 59.2, baseline: 58.4, min: 54, max: 64 },
    { day: 'Day -10', current: 57.8, baseline: 58.4, min: 54, max: 64 },
    { day: 'Day 0 (Launch)', current: 64.5, baseline: 58.4, min: 54, max: 64 },
    { day: 'Day 15', current: 63.8, baseline: 58.4, min: 54, max: 64 },
    { day: 'Day 30', current: 62.4, baseline: 58.4, min: 54, max: 64 },
    { day: 'Day 45 (Current)', current: 62.7, baseline: 58.4, min: 54, max: 64 }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border-subtle">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-deep-navy tracking-tight">
              {selectedOrgan ? activeOrganDef?.name.toUpperCase() : 'VITAL READINGS & 3D ANATOMY'}
            </h1>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
              SIMULATED DATA
            </span>
          </div>
          <p className="text-xs text-secondary-text mt-0.5">
            {selectedOrgan
              ? `Focused 360-degree inspection of ${activeOrganDef?.latinName} connected to real-time telemetry.`
              : 'Interactive full-body anatomical model. Hover to inspect structures, click to enter focused 3D exploration.'}
          </p>
        </div>

        {/* Search & Actions Bar */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {!selectedOrgan ? (
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-secondary-text absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search organ or system..."
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-border-subtle bg-white focus:outline-none focus:border-primary-blue shadow-sm"
              />
            </div>
          ) : (
            <button
              onClick={handleBackToFullBody}
              className="px-4 py-2 rounded-xl bg-white border border-border-subtle font-semibold text-xs text-deep-navy hover:bg-bg-subtle transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Full Body</span>
            </button>
          )}

          <button
            onClick={resetToFullBody}
            title="Reset to default anatomical view"
            className="p-2 text-secondary-text hover:text-deep-navy hover:bg-white rounded-xl border border-border-subtle transition-colors shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* VIEW MODE A: FULL-BODY VIEW */}
      {!selectedOrgan && (
        <div className="space-y-6">
          {/* Quick Organ Selector Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {(Object.values(ORGAN_DEFINITIONS) as OrganDefinition[])
              .filter(o => o.name.toLowerCase().includes(searchFilter.toLowerCase()) || o.system.toLowerCase().includes(searchFilter.toLowerCase()))
              .map(org => (
                <button
                  key={org.key}
                  onClick={() => handleSelectOrgan(org.key)}
                  onMouseEnter={() => setHoveredOrgan(org.key)}
                  onMouseLeave={() => setHoveredOrgan(null)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                    hoveredOrgan === org.key
                      ? 'bg-primary-blue text-white border-primary-blue shadow-sm'
                      : 'bg-white text-deep-navy border-border-subtle hover:border-gray-400'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full inline-block mr-1.5" style={{ backgroundColor: org.glowColor }} />
                  {org.name.split(' ')[0]}
                </button>
              ))}
          </div>

          {/* Large Full-Body 3D Canvas */}
          <div className="h-[620px] w-full">
            <FullBodyAnatomyViewer
              profile={selectedAnatomicalProfile}
              selectedOrgan={selectedOrgan}
              onSelectOrgan={handleSelectOrgan}
              hoveredOrgan={hoveredOrgan}
              onHoverOrgan={setHoveredOrgan}
              enableScan={true}
              interactive={true}
            />
          </div>

          {/* Quick Metrics Grid Below Full Body */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="norelis-card p-4">
              <span className="text-[11px] font-semibold text-secondary-text block">Cardiac Telemetry</span>
              <span className="text-lg font-bold text-deep-navy font-mono">62.7 bpm</span>
              <span className="text-[10px] text-status-success font-medium block mt-0.5">+4.3 bpm above Earth avg</span>
            </div>
            <div className="norelis-card p-4">
              <span className="text-[11px] font-semibold text-secondary-text block">Oxygen Saturation</span>
              <span className="text-lg font-bold text-deep-navy font-mono">98.1%</span>
              <span className="text-[10px] text-status-success font-medium block mt-0.5">Nominal alveolar exchange</span>
            </div>
            <div className="norelis-card p-4">
              <span className="text-[11px] font-semibold text-secondary-text block">Spine Bone Density</span>
              <span className="text-lg font-bold text-deep-navy font-mono">1.162 g/cm²</span>
              <span className="text-[10px] text-amber-600 font-medium block mt-0.5">-1.9% resorptive deviation</span>
            </div>
            <div className="norelis-card p-4">
              <span className="text-[11px] font-semibold text-secondary-text block">Sleep Efficiency</span>
              <span className="text-lg font-bold text-deep-navy font-mono">84.2%</span>
              <span className="text-[10px] text-amber-600 font-medium block mt-0.5">Circadian REM fragment</span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE B: ORGAN DETAIL VIEW */}
      {selectedOrgan && activeOrganDef && (
        <div className="space-y-6">
          {/* Main 3-Column Layout: Left Metrics | Center 360° Organ | Right Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Metrics Column (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="norelis-card p-4">
                <h4 className="text-xs font-bold text-deep-navy uppercase tracking-wider mb-2">
                  System Overview
                </h4>
                <p className="text-xs text-secondary-text leading-relaxed mb-3">
                  {activeOrganDef.description}
                </p>
                <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-[11px]">
                  <span className="text-secondary-text">Monitoring Status:</span>
                  <span className="font-semibold text-status-success bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {activeOrganDef.defaultMonitoringStatus}
                  </span>
                </div>
              </div>

              {/* Organ Metric Card 1 */}
              {organReadings.slice(0, 2).map((r: MonitoringReading) => (
                <div key={r.id} className="norelis-card p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-secondary-text">{r.name}</span>
                    <span className="text-[10px] text-status-success font-medium bg-emerald-50 px-2 py-0.5 rounded">
                      Nominal
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-deep-navy font-mono">{r.value}</span>
                    <span className="text-xs font-semibold text-secondary-text">{r.unit}</span>
                  </div>
                  <div className="text-[11px] text-secondary-text flex items-center justify-between pt-2 border-t border-border-subtle">
                    <span>Earth Avg: {r.earthBaselineAvg ?? '—'} {r.unit}</span>
                    <span className={r.deviationPercent && r.deviationPercent > 0 ? 'text-amber-600 font-bold' : 'text-primary-blue font-bold'}>
                      Δ {r.deviationPercent ? `${r.deviationPercent}%` : '0%'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Center: True 360-Degree Interactive 3D Organ (6 cols) */}
            <div className="lg:col-span-6">
              <Organ360Viewer
                organKey={selectedOrgan}
                onBackToBody={handleBackToFullBody}
              />
            </div>

            {/* Right Metrics Column (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              {/* Organ Metric Card 2 */}
              {organReadings.slice(2, 4).map((r: MonitoringReading) => (
                <div key={r.id} className="norelis-card p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-secondary-text">{r.name}</span>
                    <span className="text-[10px] text-primary-blue font-medium bg-blue-50 px-2 py-0.5 rounded">
                      Simulated
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-deep-navy font-mono">{r.value}</span>
                    <span className="text-xs font-semibold text-secondary-text">{r.unit}</span>
                  </div>
                  <div className="text-[11px] text-secondary-text flex items-center justify-between pt-2 border-t border-border-subtle">
                    <span>Earth Avg: {r.earthBaselineAvg ?? '—'} {r.unit}</span>
                    <span className="font-mono text-deep-navy font-medium">
                      Δ {r.deviationPercent ? `${r.deviationPercent}%` : '0%'}
                    </span>
                  </div>
                </div>
              ))}

              {/* Critical Monitored Parameters List */}
              <div className="norelis-card p-4 space-y-2">
                <h5 className="text-xs font-bold text-deep-navy uppercase tracking-wider">
                  Targeted Biomarkers
                </h5>
                <ul className="space-y-1.5 text-xs text-secondary-text">
                  {activeOrganDef.criticalMetrics.map((m: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-blue" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Historical Trends & Baseline Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Historical Trend Chart */}
            <div className="norelis-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-bold text-deep-navy">Historical Physiological Deviation</h4>
                  <p className="text-[11px] text-secondary-text">Pre-flight baseline calibration vs. In-flight longitudinal telemetry</p>
                </div>
                <span className="text-[10px] font-mono bg-blue-50 text-primary-blue px-2 py-1 rounded border border-blue-200">
                  Continuous Telemetry
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F8" />
                    <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#66778D' }} />
                    <YAxis tick={{ fontSize: 10, fill: '#66778D' }} domain={['dataMin - 5', 'dataMax + 5']} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '0.75rem', border: '1px solid #DCE5EF', fontSize: '11px' }}
                    />
                    <ReferenceLine y={58.4} stroke="#2457D6" strokeDasharray="4 4" label={{ value: 'Earth Baseline', fill: '#2457D6', fontSize: 10 }} />
                    <Line type="monotone" dataKey="current" stroke="#EE7068" strokeWidth={2.5} dot={{ r: 4, fill: '#EE7068' }} name="Flight Reading" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Earth Baseline Comparison Table */}
            <div className="norelis-card p-6">
              <h4 className="text-sm font-bold text-deep-navy mb-1">Earth Baseline Reference Table</h4>
              <p className="text-[11px] text-secondary-text mb-4">Comparison of personal measurements against pre-flight 180-day baseline</p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-bg-subtle text-secondary-text text-[10px] uppercase border-b border-border-subtle">
                    <tr>
                      <th className="py-2.5 px-3">Parameter</th>
                      <th className="py-2.5 px-3">Earth Average</th>
                      <th className="py-2.5 px-3">Current Flight</th>
                      <th className="py-2.5 px-3">Deviation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle font-mono text-[11px]">
                    <tr>
                      <td className="py-2.5 px-3 font-sans font-semibold text-deep-navy">Resting Heart Rate</td>
                      <td className="py-2.5 px-3 text-secondary-text">58.4 bpm (±3.2)</td>
                      <td className="py-2.5 px-3 font-bold text-deep-navy">62.7 bpm</td>
                      <td className="py-2.5 px-3 text-amber-600 font-bold">+7.3%</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-sans font-semibold text-deep-navy">HRV (RMSSD)</td>
                      <td className="py-2.5 px-3 text-secondary-text">68.2 ms (±6.8)</td>
                      <td className="py-2.5 px-3 font-bold text-deep-navy">54.2 ms</td>
                      <td className="py-2.5 px-3 text-amber-600 font-bold">-20.5%</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-sans font-semibold text-deep-navy">Systolic BP</td>
                      <td className="py-2.5 px-3 text-secondary-text">112.5 mmHg</td>
                      <td className="py-2.5 px-3 font-bold text-deep-navy">119.5 mmHg</td>
                      <td className="py-2.5 px-3 text-status-success font-bold">+6.2%</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-sans font-semibold text-deep-navy">Diastolic BP</td>
                      <td className="py-2.5 px-3 text-secondary-text">68.4 mmHg</td>
                      <td className="py-2.5 px-3 font-bold text-deep-navy">74.0 mmHg</td>
                      <td className="py-2.5 px-3 text-status-success font-bold">+8.1%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
