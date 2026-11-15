import React, { useState } from 'react';
import { useHealth } from '../../../../contexts/HealthContext';
import { AlertTriangle, CheckCircle2, AlertCircle, Filter, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AlertsDashboard: React.FC = () => {
  const { alerts } = useHealth();
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const filteredAlerts = alerts.filter(a => {
    if (filterSeverity === 'all') return true;
    return a.severity === filterSeverity;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border-subtle">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-deep-navy tracking-tight">
              PHYSIOLOGICAL ALERTS & MONITORING NOTIFICATIONS
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              {alerts.length} Active Records
            </span>
          </div>
          <p className="text-xs sm:text-sm text-secondary-text mt-1">
            Real-time notifications comparing telemetry against your personal Earth baseline tolerance bounds.
          </p>
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex items-center p-1 bg-white border border-border-subtle rounded-xl shadow-sm text-xs">
          {['all', 'unusual', 'significant', 'normal'].map(sev => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition-all ${
                filterSeverity === sev
                  ? 'bg-primary-blue text-white shadow-sm'
                  : 'text-secondary-text hover:text-deep-navy'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Severity Indicator Legend Banner (Section 23) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-status-success shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-status-success block">Green: Within Baseline Limits</span>
            <span className="text-secondary-text text-[11px]">Normal adaptive physiological shifts</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-amber-700 block">Yellow: Unusual Deviation</span>
            <span className="text-secondary-text text-[11px]">Observation required; mild trend drift</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-status-critical shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-status-critical block">Red: Significant Deviation</span>
            <span className="text-secondary-text text-[11px]">Requires flight surgeon medical review</span>
          </div>
        </div>
      </div>

      {/* Alerts Stream List */}
      <div className="space-y-4">
        {filteredAlerts.map(alert => {
          let cardBorder = 'border-border-subtle';
          let badgeClass = 'bg-gray-100 text-gray-700';

          if (alert.severity === 'significant') {
            cardBorder = 'border-l-4 border-l-status-critical';
            badgeClass = 'bg-red-50 text-status-critical border border-red-200';
          } else if (alert.severity === 'unusual') {
            cardBorder = 'border-l-4 border-l-amber-500';
            badgeClass = 'bg-amber-50 text-amber-700 border border-amber-200';
          } else {
            cardBorder = 'border-l-4 border-l-status-success';
            badgeClass = 'bg-emerald-50 text-status-success border border-emerald-200';
          }

          return (
            <div
              key={alert.id}
              className={`norelis-card p-6 ${cardBorder} flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${badgeClass}`}>
                    {alert.severity}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-bg-subtle text-deep-navy border border-border-subtle">
                    {alert.organ.toUpperCase()}
                  </span>
                  <h3 className="text-base font-bold text-deep-navy">{alert.parameter}</h3>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-secondary-text">
                  <div>
                    Current: <strong className="font-mono text-deep-navy text-sm">{alert.currentValue} {alert.unit}</strong>
                  </div>
                  <div>
                    Personal Earth Baseline: <strong className="font-mono text-deep-navy">{alert.personalBaseline} {alert.unit}</strong>
                  </div>
                  <div>
                    Delta: <strong className="font-mono text-amber-600 font-bold">{alert.difference > 0 ? `+${alert.difference}` : alert.difference} {alert.unit}</strong>
                  </div>
                  <div>
                    Duration: <span className="font-medium text-deep-navy">{alert.duration}</span>
                  </div>
                </div>

                <p className="text-xs text-secondary-text leading-relaxed bg-bg-subtle p-3 rounded-xl border border-border-subtle">
                  {alert.notes}
                </p>

                <div className="flex items-center gap-2 text-[11px] text-secondary-text">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary-blue" />
                  <span>Telemetry Data Quality: {alert.dataQuality}</span>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <Link
                  to={`/vitals?organ=${alert.organ}`}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-bg-subtle border border-border-subtle font-semibold text-xs text-deep-navy transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>Inspect 3D {alert.organ}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
