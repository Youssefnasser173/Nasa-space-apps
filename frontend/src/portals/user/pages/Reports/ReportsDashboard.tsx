import React from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { useHealth } from '../../../../contexts/HealthContext';
import { Printer, Download, FileText, CheckCircle2, ShieldCheck, Activity, AlertTriangle, Calendar } from 'lucide-react';

export const ReportsDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { earthBaselines, spaceProjections, monitoringReadings, alerts } = useHealth();

  const astro = currentUser || {
    id: 'AG-001',
    name: 'Dr. Sarah Chen',
    age: 38,
    sex: 'female',
    heightCm: 168,
    massKg: 62,
    missionName: 'Artemis IV Lunar Surface Habitat',
    missionDays: 45,
    baselineStatus: 'validated'
  };

  const baseline = earthBaselines[astro.id] || earthBaselines['AG-001'];
  const projection = spaceProjections[astro.id] || spaceProjections['AG-001'];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Top Action Bar (hidden during print) */}
      <div className="no-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border-subtle">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-deep-navy tracking-tight">
            BIOMEDICAL FLIGHT HEALTH REPORT
          </h1>
          <p className="text-xs sm:text-sm text-secondary-text mt-1">
            Standardized flight medicine summary comparing Earth baseline reference against active flight telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-primary-blue text-white font-semibold text-xs hover:bg-bright-blue transition-colors flex items-center gap-2 shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save to PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Report Paper Container */}
      <div className="print-container norelis-card p-8 sm:p-12 bg-white space-y-8 max-w-4xl mx-auto border border-border-subtle shadow-card">
        {/* Report Official Header */}
        <div className="flex items-center justify-between pb-6 border-b-2 border-deep-navy">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-blue flex items-center justify-center text-white">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-deep-navy tracking-wider">NORELIS HEALTH INTELLIGENCE</h2>
              <p className="text-xs text-secondary-text font-semibold uppercase tracking-wider">
                Comprehensive Astronaut Health & Longitudinal Baseline Summary
              </p>
            </div>
          </div>

          <div className="text-right text-xs">
            <p className="font-mono font-bold text-deep-navy">REPORT ID: RPT-2026-AG001</p>
            <p className="text-secondary-text">Generated: 2026-11-15 14:45 UTC</p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-50 text-status-success font-bold text-[10px] border border-emerald-200">
              SIMULATED DEMONSTRATION RECORD
            </span>
          </div>
        </div>

        {/* Section 1: Crew Member Information */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-deep-navy uppercase tracking-wider bg-bg-subtle px-3 py-1.5 rounded-lg">
            1. Crew Member & Mission Identification
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-secondary-text block">Astronaut Name:</span>
              <strong className="text-deep-navy text-sm">{astro.name}</strong>
            </div>
            <div>
              <span className="text-secondary-text block">Astronaut ID:</span>
              <strong className="font-mono text-primary-blue text-sm">{astro.id}</strong>
            </div>
            <div>
              <span className="text-secondary-text block">Age & Sex:</span>
              <strong className="text-deep-navy capitalize">{astro.age} yrs • {astro.sex}</strong>
            </div>
            <div>
              <span className="text-secondary-text block">Height / Mass:</span>
              <strong className="text-deep-navy">{astro.heightCm} cm • {astro.massKg} kg</strong>
            </div>
            <div className="col-span-2">
              <span className="text-secondary-text block">Assigned Mission:</span>
              <strong className="text-deep-navy">{astro.missionName}</strong>
            </div>
            <div>
              <span className="text-secondary-text block">Mission Elapsed Time:</span>
              <strong className="font-mono text-deep-navy">Day {astro.missionDays}</strong>
            </div>
            <div>
              <span className="text-secondary-text block">Baseline Status:</span>
              <strong className="text-status-success capitalize">{astro.baselineStatus}</strong>
            </div>
          </div>
        </div>

        {/* Section 2: Earth Baseline vs Flight Telemetry Summary */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-deep-navy uppercase tracking-wider bg-bg-subtle px-3 py-1.5 rounded-lg">
            2. Earth Baseline Reference vs. Active Flight Telemetry
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-bg-subtle text-secondary-text text-[10px] uppercase border-b border-border-subtle">
                <tr>
                  <th className="py-2.5 px-3">Physiological Biomarker</th>
                  <th className="py-2.5 px-3">Earth Personal Avg (±SD)</th>
                  <th className="py-2.5 px-3">Flight Current</th>
                  <th className="py-2.5 px-3">Simulated Space Projection</th>
                  <th className="py-2.5 px-3">Personal Deviation</th>
                  <th className="py-2.5 px-3">Clinical Evaluation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle font-mono text-[11px]">
                <tr>
                  <td className="py-2.5 px-3 font-sans font-semibold text-deep-navy">Resting Heart Rate</td>
                  <td className="py-2.5 px-3 text-secondary-text">58.4 bpm (±3.2)</td>
                  <td className="py-2.5 px-3 font-bold text-deep-navy">62.7 bpm</td>
                  <td className="py-2.5 px-3 text-violet-accent">63.8 bpm</td>
                  <td className="py-2.5 px-3 text-amber-600 font-bold">+7.3%</td>
                  <td className="py-2.5 px-3 font-sans text-status-success font-semibold">Nominal Adaptation</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-sans font-semibold text-deep-navy">Heart Rate Variability (RMSSD)</td>
                  <td className="py-2.5 px-3 text-secondary-text">68.2 ms (±6.8)</td>
                  <td className="py-2.5 px-3 font-bold text-deep-navy">54.2 ms</td>
                  <td className="py-2.5 px-3 text-violet-accent">56.4 ms</td>
                  <td className="py-2.5 px-3 text-amber-600 font-bold">-20.5%</td>
                  <td className="py-2.5 px-3 font-sans text-amber-600 font-semibold">Mild Vagal Withdrawal</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-sans font-semibold text-deep-navy">Blood Pressure (Systolic)</td>
                  <td className="py-2.5 px-3 text-secondary-text">112.5 mmHg</td>
                  <td className="py-2.5 px-3 font-bold text-deep-navy">119.5 mmHg</td>
                  <td className="py-2.5 px-3 text-violet-accent">118.2 mmHg</td>
                  <td className="py-2.5 px-3 text-status-success font-bold">+6.2%</td>
                  <td className="py-2.5 px-3 font-sans text-status-success font-semibold">Stable Perfusion</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-sans font-semibold text-deep-navy">Oxygen Saturation (SpO2)</td>
                  <td className="py-2.5 px-3 text-secondary-text">98.7% (±0.6)</td>
                  <td className="py-2.5 px-3 font-bold text-deep-navy">98.1%</td>
                  <td className="py-2.5 px-3 text-violet-accent">97.8%</td>
                  <td className="py-2.5 px-3 text-status-success font-bold">-0.6%</td>
                  <td className="py-2.5 px-3 font-sans text-status-success font-semibold">Optimal Alveolar O2</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-sans font-semibold text-deep-navy">Bone Mineral Density (Spine L1-L4)</td>
                  <td className="py-2.5 px-3 text-secondary-text">1.185 g/cm²</td>
                  <td className="py-2.5 px-3 font-bold text-deep-navy">1.162 g/cm²</td>
                  <td className="py-2.5 px-3 text-violet-accent">1.155 g/cm²</td>
                  <td className="py-2.5 px-3 text-amber-600 font-bold">-1.9%</td>
                  <td className="py-2.5 px-3 font-sans text-amber-700 font-semibold">Resorptive Drift</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-sans font-semibold text-deep-navy">Average Sleep Duration</td>
                  <td className="py-2.5 px-3 text-secondary-text">7.6 h (±0.5)</td>
                  <td className="py-2.5 px-3 font-bold text-deep-navy">6.4 h</td>
                  <td className="py-2.5 px-3 text-violet-accent">6.7 h</td>
                  <td className="py-2.5 px-3 text-amber-600 font-bold">-15.8%</td>
                  <td className="py-2.5 px-3 font-sans text-amber-700 font-semibold">REM Fragmented</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Active Alerts & Surgeon Recommendations */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-deep-navy uppercase tracking-wider bg-bg-subtle px-3 py-1.5 rounded-lg">
            3. Active Monitoring Deviations & Clinical Protocol
          </h3>
          <div className="space-y-2">
            {alerts.map(a => (
              <div key={a.id} className="p-3 rounded-xl border border-border-subtle bg-bg-subtle text-xs space-y-1">
                <div className="flex items-center justify-between font-semibold text-deep-navy">
                  <span>{a.parameter} ({a.organ.toUpperCase()})</span>
                  <span className="font-mono text-amber-600">{a.currentValue} {a.unit} (Δ {a.difference > 0 ? `+${a.difference}` : a.difference})</span>
                </div>
                <p className="text-secondary-text text-[11px]">{a.notes}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Signatures & Disclaimers */}
        <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-secondary-text">
          <div>
            <p className="font-bold text-deep-navy">NORELIS Clinical Systems Review</p>
            <p className="text-[11px]">Personalized Human Health Intelligence Engine</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-deep-navy font-semibold">VERIFIED FOR MISSION FLIGHT LOG</p>
            <p className="text-[10px] text-secondary-text">Page 1 of 1 • NASA Space Apps Prototype</p>
          </div>
        </div>
      </div>
    </div>
  );
};
