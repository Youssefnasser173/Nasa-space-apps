import React, { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { useHealth } from '../../../../contexts/HealthContext';
import {
  BrainCircuit,
  CheckCircle2,
  AlertCircle,
  Clock,
  TrendingUp,
  BarChart2,
  Calendar,
  Layers,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const EarthBaselineDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { earthBaselines } = useHealth();
  const [selectedParamKey, setSelectedParamKey] = useState<string>('resting_heart_rate');

  const astroId = currentUser?.id || 'AG-001';
  const baseline = earthBaselines[astroId] || earthBaselines['AG-001'];
  const params = Object.values(baseline.parameters);

  const selectedParam = baseline.parameters[selectedParamKey] || params[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border-subtle">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-deep-navy tracking-tight">
              EARTH HEALTH BASELINE
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-primary-blue border border-blue-200">
              Personalized Reference
            </span>
          </div>
          <p className="text-xs sm:text-sm text-secondary-text mt-1">
            Your individual physiological reference established from Earth-based measurements before your mission.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-status-success border border-emerald-200 font-bold text-xs flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-4 h-4" />
            {baseline.overallStatus.toUpperCase()} BASELINE
          </span>
        </div>
      </div>

      {/* Baseline Summary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="norelis-card p-4">
          <span className="text-[11px] font-bold text-secondary-text uppercase tracking-wider block">Baseline Status</span>
          <span className="text-base font-black text-status-success capitalize mt-1 block">
            {baseline.overallStatus} Baseline
          </span>
          <span className="text-[10px] text-secondary-text">Pre-flight verified</span>
        </div>

        <div className="norelis-card p-4">
          <span className="text-[11px] font-bold text-secondary-text uppercase tracking-wider block">Measurement Window</span>
          <span className="text-sm font-bold text-deep-navy mt-1 block truncate">
            {baseline.measurementPeriod.split('(')[0]}
          </span>
          <span className="text-[10px] text-secondary-text font-mono">180 Objective Days</span>
        </div>

        <div className="norelis-card p-4">
          <span className="text-[11px] font-bold text-secondary-text uppercase tracking-wider block">Total Objective Data</span>
          <span className="text-xl font-black text-deep-navy font-mono mt-1 block">
            {baseline.totalMeasurementCount}
          </span>
          <span className="text-[10px] text-primary-blue font-semibold">Longitudinal points</span>
        </div>

        <div className="norelis-card p-4">
          <span className="text-[11px] font-bold text-secondary-text uppercase tracking-wider block">Data Completeness</span>
          <span className="text-xl font-black text-primary-blue font-mono mt-1 block">
            {baseline.dataCompleteness}%
          </span>
          <span className="text-[10px] text-status-success font-medium">9 System categories</span>
        </div>

        <div className="norelis-card p-4 col-span-2 lg:col-span-1">
          <span className="text-[11px] font-bold text-secondary-text uppercase tracking-wider block">Baseline Confidence</span>
          <span className="text-xl font-black text-deep-navy font-mono mt-1 block">
            {baseline.baselineConfidence}%
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold">High Calibration</span>
        </div>
      </div>

      {/* Main Inspection Grid: Parameter Detail & Historical Timeline Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Parameter List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-deep-navy uppercase tracking-wider">
              Calibrated Earth Parameters ({params.length})
            </h3>
            <span className="text-[11px] text-secondary-text">Select parameter</span>
          </div>

          <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
            {params.map(p => {
              const isSelected = selectedParamKey === p.parameterKey;

              return (
                <div
                  key={p.parameterKey}
                  onClick={() => setSelectedParamKey(p.parameterKey)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-primary-blue bg-blue-50/50 shadow-card'
                      : 'border-border-subtle bg-white hover:border-gray-300'
                  }`}
                >
                  <div>
                    <h5 className="text-xs font-bold text-deep-navy">{p.name}</h5>
                    <div className="flex items-center gap-2 text-[11px] text-secondary-text mt-0.5">
                      <span>Personal Avg: <strong className="font-mono text-deep-navy">{p.personalAvg} {p.unit}</strong></span>
                      <span>•</span>
                      <span>SD: ±{p.stdDev}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-mono font-bold text-primary-blue block">
                      ±{p.variabilityPercent}%
                    </span>
                    <span className="text-[10px] text-secondary-text">Variability</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Focused Parameter Baseline Analysis & Recharts (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {selectedParam && (
            <div className="norelis-card p-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-border-subtle">
                <div>
                  <span className="text-[11px] font-bold text-primary-blue uppercase tracking-wider">
                    {selectedParam.category.replace('_', ' ')}
                  </span>
                  <h3 className="text-xl font-black text-deep-navy tracking-tight">
                    {selectedParam.name}
                  </h3>
                  <p className="text-xs text-secondary-text mt-0.5">
                    Established over {selectedParam.measurementPeriod} ({selectedParam.measurementCount} repeated readings).
                  </p>
                </div>

                <div className="text-right bg-bg-subtle p-3 rounded-xl border border-border-subtle">
                  <span className="text-[10px] text-secondary-text block uppercase">Personal Earth Average</span>
                  <span className="text-2xl font-black text-deep-navy font-mono">
                    {selectedParam.personalAvg} <span className="text-xs font-normal text-secondary-text">{selectedParam.unit}</span>
                  </span>
                </div>
              </div>

              {/* 4 Quantitative Baseline Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-bg-subtle border border-border-subtle">
                  <span className="text-[10px] text-secondary-text block">Standard Deviation</span>
                  <span className="font-mono font-bold text-deep-navy text-sm">±{selectedParam.stdDev} {selectedParam.unit}</span>
                </div>
                <div className="p-3 rounded-xl bg-bg-subtle border border-border-subtle">
                  <span className="text-[10px] text-secondary-text block">Variability Range</span>
                  <span className="font-mono font-bold text-primary-blue text-sm">±{selectedParam.variabilityPercent}%</span>
                </div>
                <div className="p-3 rounded-xl bg-bg-subtle border border-border-subtle">
                  <span className="text-[10px] text-secondary-text block">Observed Minimum</span>
                  <span className="font-mono font-bold text-deep-navy text-sm">{selectedParam.minVal} {selectedParam.unit}</span>
                </div>
                <div className="p-3 rounded-xl bg-bg-subtle border border-border-subtle">
                  <span className="text-[10px] text-secondary-text block">Observed Maximum</span>
                  <span className="font-mono font-bold text-deep-navy text-sm">{selectedParam.maxVal} {selectedParam.unit}</span>
                </div>
              </div>

              {/* Longitudinal Pre-Flight Trend Chart */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-xs font-bold text-deep-navy uppercase tracking-wider">
                    30-Day Longitudinal Earth Calibration Series
                  </h5>
                  <span className="text-[11px] text-secondary-text font-mono">
                    Mean: {selectedParam.personalAvg} {selectedParam.unit}
                  </span>
                </div>

                <div className="h-64 w-full bg-bg-subtle/50 rounded-xl p-2 border border-border-subtle">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={selectedParam.history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="baselineAreaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2457D6" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#2457D6" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#DCE5EF" />
                      <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#66778D' }} />
                      <YAxis tick={{ fontSize: 9, fill: '#66778D' }} domain={['dataMin - 2', 'dataMax + 2']} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '0.75rem', border: '1px solid #DCE5EF', fontSize: '11px' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#2457D6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#baselineAreaGrad)"
                        name="Pre-Mission Reading"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Scientific Notice */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-primary-text flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-primary-blue shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Baseline Immutability:</strong> The Earth Health Baseline represents your verified ground-truth physiology and is permanently preserved. It is never overwritten by in-flight spaceflight shifts or simulated projections.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
