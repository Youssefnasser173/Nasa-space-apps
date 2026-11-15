import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { useHealth } from '../../../../contexts/HealthContext';
import { FullBodyAnatomyViewer } from '../../../../features/anatomy/FullBodyAnatomyViewer';
import { Organ360Viewer } from '../../../../features/anatomy/Organ360Viewer';
import { ORGAN_DEFINITIONS } from '../../../../constants/organs';
import { OrganKey } from '../../../../types';
import {
  ArrowLeft,
  Activity,
  HeartPulse,
  BrainCircuit,
  Orbit,
  ShieldAlert,
  Bell,
  FileText,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles
} from 'lucide-react';

type AdminTab = 'overview' | 'vitals' | 'earth_baseline' | 'space_baseline' | 'hazards' | 'alerts' | 'reports';

export const AdminAstronautProfile: React.FC = () => {
  const { astronautId } = useParams<{ astronautId: string }>();
  const { allAstronauts } = useAuth();
  const { earthBaselines, spaceProjections, monitoringReadings, alerts } = useHealth();

  const astro = allAstronauts.find(a => a.id === astronautId) || allAstronauts[0];
  const [activeTab, setActiveTab] = useState<AdminTab>('vitals');
  const [selectedOrgan, setSelectedOrgan] = useState<OrganKey | null>(null);
  const [hoveredOrgan, setHoveredOrgan] = useState<OrganKey | null>(null);

  const baseline = earthBaselines[astro.id] || earthBaselines['AG-001'];
  const projection = spaceProjections[astro.id] || spaceProjections['AG-001'];

  return (
    <div className="space-y-6">
      {/* Back to Directory & Top Info Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/astronauts"
            className="p-2 rounded-xl bg-white border border-border-subtle hover:bg-bg-subtle text-secondary-text hover:text-deep-navy shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-deep-navy tracking-tight">{astro.name}</h1>
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-blue-50 text-primary-blue border border-blue-200">
                {astro.id}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-status-success border border-emerald-200">
                {astro.baselineStatus} Baseline
              </span>
            </div>
            <p className="text-xs text-secondary-text mt-0.5">
              {astro.missionName} • {astro.age}y {astro.sex} • {astro.anatomicalProfile} 3D model profile
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-bold text-[10px] border border-amber-200">
            SIMULATED DEMONSTRATION RECORD
          </span>
        </div>
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-border-subtle shadow-sm overflow-x-auto text-xs font-semibold">
        {[
          { key: 'vitals', label: '3D Anatomical Vitals', icon: HeartPulse },
          { key: 'overview', label: 'Clinical Summary', icon: Activity },
          { key: 'earth_baseline', label: 'Earth Baseline', icon: BrainCircuit },
          { key: 'space_baseline', label: 'Space Projections', icon: Orbit },
          { key: 'hazards', label: 'NASA Five Hazards', icon: ShieldAlert },
          { key: 'alerts', label: 'Active Alerts', icon: Bell },
          { key: 'reports', label: 'Flight Report', icon: FileText }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as AdminTab)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-deep-navy text-white shadow-sm'
                  : 'text-secondary-text hover:text-deep-navy hover:bg-bg-subtle'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: 3D ANATOMICAL VITALS (Section 24: "admin must use same anatomical experience and rotate 3D models") */}
      {activeTab === 'vitals' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-1">
            <div>
              <h3 className="text-base font-bold text-deep-navy">
                {selectedOrgan ? ORGAN_DEFINITIONS[selectedOrgan]?.name.toUpperCase() : 'CREW FULL-BODY 3D ANATOMY'}
              </h3>
              <p className="text-xs text-secondary-text">
                {selectedOrgan
                  ? 'Inspect 360-degree focused biological organ model and telemetry thresholds.'
                  : 'Hover over organs or select from list to focus and rotate 3D meshes.'}
              </p>
            </div>

            {selectedOrgan && (
              <button
                onClick={() => setSelectedOrgan(null)}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-border-subtle font-semibold text-xs text-deep-navy hover:bg-bg-subtle flex items-center gap-1 shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Return to Full Body</span>
              </button>
            )}
          </div>

          {!selectedOrgan ? (
            <div className="space-y-4">
              {/* Quick Select Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {Object.values(ORGAN_DEFINITIONS).map(org => (
                  <button
                    key={org.key}
                    onClick={() => setSelectedOrgan(org.key)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-border-subtle hover:border-primary-blue text-xs font-semibold text-deep-navy whitespace-nowrap shadow-sm"
                  >
                    <span className="w-2 h-2 rounded-full inline-block mr-1.5" style={{ backgroundColor: org.glowColor }} />
                    {org.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Full-Body Viewer */}
              <div className="h-[580px] w-full">
                <FullBodyAnatomyViewer
                  profile={astro.anatomicalProfile}
                  selectedOrgan={selectedOrgan}
                  onSelectOrgan={setSelectedOrgan}
                  hoveredOrgan={hoveredOrgan}
                  onHoverOrgan={setHoveredOrgan}
                  enableScan={true}
                  interactive={true}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* 360° Organ Viewer */}
              <div className="lg:col-span-7">
                <Organ360Viewer organKey={selectedOrgan} onBackToBody={() => setSelectedOrgan(null)} />
              </div>

              {/* Telemetry Details */}
              <div className="lg:col-span-5 space-y-4">
                <div className="norelis-card p-5 space-y-3">
                  <h4 className="text-xs font-bold text-deep-navy uppercase tracking-wider">
                    Flight Surgeon Organ Assessment
                  </h4>
                  <p className="text-xs text-secondary-text leading-relaxed">
                    {ORGAN_DEFINITIONS[selectedOrgan]?.description}
                  </p>
                  <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-xs">
                    <span className="text-secondary-text">Monitoring Status:</span>
                    <span className="font-semibold text-status-success bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      {ORGAN_DEFINITIONS[selectedOrgan]?.defaultMonitoringStatus}
                    </span>
                  </div>
                </div>

                <div className="norelis-card p-5 space-y-2">
                  <h5 className="text-xs font-bold text-deep-navy uppercase tracking-wider">
                    Active Telemetry Parameters
                  </h5>
                  <div className="space-y-2 text-xs">
                    {monitoringReadings.filter(r => r.organ === selectedOrgan).map(r => (
                      <div key={r.id} className="p-2.5 rounded-xl bg-bg-subtle border border-border-subtle flex items-center justify-between">
                        <span className="font-medium text-deep-navy">{r.name}</span>
                        <span className="font-mono font-bold text-primary-blue">{r.value} {r.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CLINICAL OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="norelis-card p-6 space-y-4">
            <h3 className="text-base font-bold text-deep-navy">Astronaut Medical History & Clinical Baseline</h3>
            <p className="text-xs text-secondary-text leading-relaxed">
              {astro.medicalHistorySummary || 'No significant pre-flight chronic or acute medical history.'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-4 border-t border-border-subtle">
              <div>
                <span className="text-secondary-text block">Height / Weight:</span>
                <strong className="text-deep-navy">{astro.heightCm} cm / {astro.massKg} kg</strong>
              </div>
              <div>
                <span className="text-secondary-text block">Mission Phase:</span>
                <strong className="text-deep-navy capitalize">{astro.missionStatus.replace('_', ' ')}</strong>
              </div>
              <div>
                <span className="text-secondary-text block">Calibration Days:</span>
                <strong className="text-deep-navy font-mono">180 Pre-flight Days</strong>
              </div>
              <div>
                <span className="text-secondary-text block">Telemetric Sync:</span>
                <strong className="text-status-success font-semibold">Live Downlink OK</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: EARTH BASELINE */}
      {activeTab === 'earth_baseline' && (
        <div className="norelis-card p-6 space-y-4">
          <h3 className="text-base font-bold text-deep-navy">Pre-Flight Earth Health Baseline</h3>
          <p className="text-xs text-secondary-text">Individualized Earth baseline established prior to launch.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-bg-subtle text-secondary-text text-[10px] uppercase border-b border-border-subtle">
                <tr>
                  <th className="py-2.5 px-3">Parameter</th>
                  <th className="py-2.5 px-3">Personal Earth Avg</th>
                  <th className="py-2.5 px-3">Standard Deviation</th>
                  <th className="py-2.5 px-3">Variability</th>
                  <th className="py-2.5 px-3">Sample Count</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle font-mono text-[11px]">
                {Object.values(baseline.parameters).map(p => (
                  <tr key={p.parameterKey}>
                    <td className="py-2.5 px-3 font-sans font-semibold text-deep-navy">{p.name}</td>
                    <td className="py-2.5 px-3 font-bold text-deep-navy">{p.personalAvg} {p.unit}</td>
                    <td className="py-2.5 px-3 text-secondary-text">±{p.stdDev}</td>
                    <td className="py-2.5 px-3 text-primary-blue font-bold">±{p.variabilityPercent}%</td>
                    <td className="py-2.5 px-3 text-secondary-text">{p.measurementCount}</td>
                    <td className="py-2.5 px-3 font-sans text-status-success font-semibold capitalize">{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: SPACE PROJECTIONS */}
      {activeTab === 'space_baseline' && (
        <div className="norelis-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-deep-navy">Exploratory Predicted Space Baseline</h3>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
              SIMULATED PROJECTION — NOT A CLINICAL FORECAST
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-bg-subtle text-secondary-text text-[10px] uppercase border-b border-border-subtle">
                <tr>
                  <th className="py-2.5 px-3">Parameter</th>
                  <th className="py-2.5 px-3">Earth Average</th>
                  <th className="py-2.5 px-3">Simulated Space Reference</th>
                  <th className="py-2.5 px-3">Estimated Min / Max</th>
                  <th className="py-2.5 px-3">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle font-mono text-[11px]">
                {Object.values(projection.projections).map(p => (
                  <tr key={p.parameterKey}>
                    <td className="py-2.5 px-3 font-sans font-semibold text-deep-navy">{p.name}</td>
                    <td className="py-2.5 px-3 text-secondary-text">{p.earthAvg} {p.unit}</td>
                    <td className="py-2.5 px-3 font-bold text-violet-accent">{p.simulatedProjection} {p.unit}</td>
                    <td className="py-2.5 px-3 text-secondary-text">{p.estimatedMin} - {p.estimatedMax} {p.unit}</td>
                    <td className="py-2.5 px-3 font-sans text-primary-blue font-semibold">{p.confidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: HAZARDS, TAB 6: ALERTS, TAB 7: REPORTS */}
      {activeTab === 'alerts' && (
        <div className="norelis-card p-6 space-y-3">
          <h3 className="text-base font-bold text-deep-navy">Astronaut Flight Alerts ({alerts.length})</h3>
          {alerts.map(a => (
            <div key={a.id} className="p-3.5 rounded-xl border border-border-subtle bg-bg-subtle text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-deep-navy">
                <span>{a.parameter}</span>
                <span className="font-mono text-amber-600">{a.currentValue} {a.unit} (Δ {a.difference > 0 ? `+${a.difference}` : a.difference})</span>
              </div>
              <p className="text-secondary-text text-[11px]">{a.notes}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="norelis-card p-6 text-center space-y-3">
          <FileText className="w-10 h-10 text-primary-blue mx-auto" />
          <h4 className="text-sm font-bold text-deep-navy">Comprehensive Medical Flight Dossier</h4>
          <p className="text-xs text-secondary-text">Access the printable patient report for {astro.name}.</p>
          <Link
            to="/reports"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-deep-navy text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            <span>Open Complete Printable Report</span>
          </Link>
        </div>
      )}

      {activeTab === 'hazards' && (
        <div className="norelis-card p-6 text-center space-y-3">
          <ShieldAlert className="w-10 h-10 text-primary-blue mx-auto" />
          <h4 className="text-sm font-bold text-deep-navy">Five Hazards Environmental Context</h4>
          <p className="text-xs text-secondary-text">Review radiation, gravity fields, and confinement interactions.</p>
          <Link
            to="/hazards"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-deep-navy text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            <span>Open Interactive Five Hazards Framework</span>
          </Link>
        </div>
      )}
    </div>
  );
};
