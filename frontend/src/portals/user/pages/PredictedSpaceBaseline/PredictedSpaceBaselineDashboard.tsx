import React, { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { useHealth } from '../../../../contexts/HealthContext';
import {
  Orbit,
  AlertTriangle,
  Info,
  Calendar,
  Layers,
  Sliders,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine
} from 'recharts';

export const PredictedSpaceBaselineDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { spaceProjections } = useHealth();

  const astroId = currentUser?.id || 'AG-001';
  const spaceData = spaceProjections[astroId] || spaceProjections['AG-001'];

  // Selectable Mission Context Controls
  const [selectedPhase, setSelectedPhase] = useState<string>('early_mission');
  const [selectedGravity, setSelectedGravity] = useState<string>('lunar_gravity');
  const [selectedDuration, setSelectedDuration] = useState<number>(45);
  const [selectedParamKey, setSelectedParamKey] = useState<string>('resting_heart_rate');

  const projectionsList = Object.values(spaceData.projections);
  const selectedProjection = spaceData.projections[selectedParamKey] || projectionsList[0];

  const isInsufficient = spaceData.confidenceStatus === 'insufficient' || projectionsList.length === 0;

  return (
    <div className="space-y-8">
      {/* Header with Mandatory Scientific Distinction Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border-subtle">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-deep-navy tracking-tight">
              PREDICTED SPACE VITAL BASELINE
            </h1>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
              EXPLORATORY PROJECTION
            </span>
          </div>
          <p className="text-xs sm:text-sm text-secondary-text mt-1">
            An exploratory projection of how your individual physiological baseline may change under selected spaceflight conditions.
          </p>
        </div>

        {/* Mandatory Warning Label (Section 20) */}
        <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-300 text-amber-900 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>SIMULATED PROJECTION — NOT A CLINICAL FORECAST</span>
        </div>
      </div>

      {/* Mission Context Controls (Section 20) */}
      <div className="norelis-card p-6 bg-gradient-to-r from-white via-white to-purple-50/20 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
          <h4 className="text-xs font-bold text-deep-navy uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-violet-accent" />
            Mission Environmental & Operational Context
          </h4>
          <span className="text-[11px] text-secondary-text">Selectable Demonstration Parameters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-secondary-text mb-1">Mission Phase</label>
            <select
              value={selectedPhase}
              onChange={e => setSelectedPhase(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-border-subtle bg-bg-subtle text-xs font-semibold text-deep-navy focus:outline-none focus:border-violet-accent"
            >
              <option value="pre_mission">Pre-Mission Ground Baseline</option>
              <option value="early_mission">Early Mission (Days 1 - 30)</option>
              <option value="mid_mission">Mid-Mission Equilibrium (Days 31 - 90)</option>
              <option value="extended_mission">Extended Exploration (Days 91 - 180+)</option>
              <option value="return_recovery">Planetary Return & Re-adaptation</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-secondary-text mb-1">Gravity Field</label>
            <select
              value={selectedGravity}
              onChange={e => setSelectedGravity(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-border-subtle bg-bg-subtle text-xs font-semibold text-deep-navy focus:outline-none focus:border-violet-accent"
            >
              <option value="lunar_gravity">Lunar Surface (1/6g ~ 0.166g)</option>
              <option value="microgravity">Microgravity (0g Transit)</option>
              <option value="martian_gravity">Martian Surface (3/8g ~ 0.38g)</option>
              <option value="earth_normal">Earth Normal (1.0g Ground)</option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-secondary-text">Mission Duration</label>
              <span className="text-xs font-mono font-bold text-deep-navy">{selectedDuration} Days</span>
            </div>
            <input
              type="range"
              min={1}
              max={180}
              value={selectedDuration}
              onChange={e => setSelectedDuration(parseInt(e.target.value))}
              className="w-full accent-violet-accent cursor-pointer mt-1"
            />
          </div>
        </div>
      </div>

      {/* Handling Insufficient Data Honestly (Section 20) */}
      {isInsufficient ? (
        <div className="p-12 rounded-2xl bg-white border border-border-subtle text-center space-y-3">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-deep-navy">
            INSUFFICIENT DATA FOR INDIVIDUALIZED PROJECTION
          </h3>
          <p className="text-xs text-secondary-text max-w-lg mx-auto leading-relaxed">
            Astronaut {currentUser?.name || astroId} has not yet completed sufficient Earth baseline measurements ({spaceData.dataCompleteness}% completeness). NORELIS does not fabricate speculative space projections without validated individual pre-mission baselines.
          </p>
          <div className="pt-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              Provisional Earth Baseline Active
            </span>
          </div>
        </div>
      ) : (
        /* Full Comparison Workspace */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Parameter Projections Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-deep-navy uppercase tracking-wider">
                Projected Biomarkers ({projectionsList.length})
              </h4>
              <span className="text-[11px] text-secondary-text">Earth vs. Projected</span>
            </div>

            <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
              {projectionsList.map(p => {
                const isSelected = selectedParamKey === p.parameterKey;
                const shiftPercent = Math.round(((p.simulatedProjection - p.earthAvg) / p.earthAvg) * 100);

                return (
                  <div
                    key={p.parameterKey}
                    onClick={() => setSelectedParamKey(p.parameterKey)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col gap-2 ${
                      isSelected
                        ? 'border-violet-accent bg-purple-50/40 shadow-card'
                        : 'border-border-subtle bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-deep-navy">{p.name}</span>
                      <span className={`text-[11px] font-mono font-bold ${shiftPercent >= 0 ? 'text-amber-600' : 'text-primary-blue'}`}>
                        {shiftPercent >= 0 ? `+${shiftPercent}%` : `${shiftPercent}%`} Expected Shift
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[11px] font-mono pt-1">
                      <div className="p-2 rounded-lg bg-bg-subtle text-center">
                        <span className="text-[10px] text-secondary-text block font-sans">Earth Avg</span>
                        <span className="font-bold text-deep-navy">{p.earthAvg} {p.unit}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-purple-100 text-center">
                        <span className="text-[10px] text-violet-accent block font-sans">Projected</span>
                        <span className="font-bold text-violet-accent">{p.simulatedProjection} {p.unit}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-emerald-50 text-center">
                        <span className="text-[10px] text-status-success block font-sans">Actual Telemetry</span>
                        <span className="font-bold text-status-success">
                          {p.actualReading !== undefined ? `${p.actualReading} ${p.unit}` : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Comparative Multi-Data Chart & Context (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {selectedProjection && (
              <div className="norelis-card p-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-violet-accent uppercase tracking-wider">
                      {selectedProjection.category.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] font-semibold text-secondary-text">
                      Confidence: <strong className="text-deep-navy">{selectedProjection.confidence}</strong>
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-deep-navy tracking-tight mt-1">
                    {selectedProjection.name} Multi-Stage Timeline
                  </h3>
                  <p className="text-xs text-secondary-text mt-1">
                    Distinct visual layers: Original Earth Baseline (dashed blue), Simulated Projection (purple), Estimated Range (shaded band), and Actual In-Flight Telemetry (points).
                  </p>
                </div>

                {/* 3-Tier Comparison Numbers */}
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-center">
                    <span className="text-[10px] text-primary-blue font-bold uppercase block">1. Original Earth Baseline</span>
                    <span className="text-lg font-black text-deep-navy font-mono mt-1 block">
                      {selectedProjection.earthAvg} {selectedProjection.unit}
                    </span>
                    <span className="text-[10px] text-secondary-text font-mono">SD: ±{selectedProjection.earthVariability}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-center">
                    <span className="text-[10px] text-violet-accent font-bold uppercase block">2. Simulated Reference</span>
                    <span className="text-lg font-black text-violet-accent font-mono mt-1 block">
                      {selectedProjection.simulatedProjection} {selectedProjection.unit}
                    </span>
                    <span className="text-[10px] text-secondary-text font-mono">Est: {selectedProjection.estimatedMin} - {selectedProjection.estimatedMax}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                    <span className="text-[10px] text-status-success font-bold uppercase block">3. Actual Space Measurement</span>
                    <span className="text-lg font-black text-status-success font-mono mt-1 block">
                      {selectedProjection.actualReading !== undefined ? `${selectedProjection.actualReading} ${selectedProjection.unit}` : 'Unmeasured'}
                    </span>
                    <span className="text-[10px] text-secondary-text font-mono">Flight Day {selectedDuration}</span>
                  </div>
                </div>

                {/* Comparative Recharts Chart */}
                <div className="h-72 w-full bg-bg-subtle/50 rounded-xl p-3 border border-border-subtle">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={selectedProjection.timelineTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#DCE5EF" />
                      <XAxis dataKey="stage" tick={{ fontSize: 9, fill: '#66778D' }} />
                      <YAxis tick={{ fontSize: 9, fill: '#66778D' }} domain={['dataMin - 5', 'dataMax + 5']} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '0.75rem', border: '1px solid #DCE5EF', fontSize: '11px' }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                      
                      {/* Estimated Projection Range Band */}
                      <Area
                        type="monotone"
                        dataKey="estimatedMax"
                        stroke="none"
                        fill="#8064D8"
                        fillOpacity={0.12}
                        name="Estimated Range Band"
                      />

                      {/* Earth Baseline Reference */}
                      <Line
                        type="monotone"
                        dataKey="earthVal"
                        stroke="#2457D6"
                        strokeWidth={2}
                        strokeDasharray="4 4"
                        dot={false}
                        name="Original Earth Baseline"
                      />

                      {/* Simulated Space Projection */}
                      <Line
                        type="monotone"
                        dataKey="projectedVal"
                        stroke="#8064D8"
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: '#8064D8' }}
                        name="Simulated Projection"
                      />

                      {/* Actual Space Measurement Point */}
                      <Line
                        type="monotone"
                        dataKey="actualVal"
                        stroke="#159B73"
                        strokeWidth={0}
                        dot={{ r: 6, fill: '#159B73', stroke: '#FFFFFF', strokeWidth: 2 }}
                        name="Actual Space Reading"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                {/* Supporting Clinical Rationale */}
                <div className="p-4 rounded-xl bg-bg-subtle border border-border-subtle space-y-1 text-xs">
                  <span className="font-bold text-deep-navy uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-primary-blue" />
                    Biomedical Rationale:
                  </span>
                  <p className="text-secondary-text leading-relaxed">
                    {selectedProjection.clinicalContext}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
