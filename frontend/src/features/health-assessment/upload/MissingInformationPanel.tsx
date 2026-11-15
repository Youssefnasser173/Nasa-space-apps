import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, PlusCircle, ChevronDown, ChevronUp, Save } from 'lucide-react';
import { useHealth } from '../../../contexts/HealthContext';
import { PARAMETER_REGISTRY } from '../../../constants/parameters';

export const MissingInformationPanel: React.FC = () => {
  const { getMissingCategories, activeAssessment, addManualParameter } = useHealth();
  const missingCategories = getMissingCategories();
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  // Form states for supplementary inputs
  const [suppValues, setSuppValues] = useState<Record<string, { value: string; unit: string }>>({});

  const handleInputChange = (key: string, value: string, defaultUnit: string) => {
    setSuppValues(prev => ({
      ...prev,
      [key]: { value, unit: defaultUnit }
    }));
  };

  const handleSaveMissingParameter = (key: string) => {
    const meta = PARAMETER_REGISTRY[key];
    const item = suppValues[key];
    if (!meta || !item || !item.value) return;

    const num = parseFloat(item.value);
    addManualParameter({
      key,
      name: meta.name,
      category: meta.category,
      value: !isNaN(num) ? num : item.value,
      unit: meta.unit,
      measuredAt: new Date().toISOString().split('T')[0],
      source: 'manual',
      sourceDocument: 'Supplementary Entry',
      verificationStatus: 'verified',
      availability: 'available',
      normalRange: meta.normalRange
    });

    setSuppValues(prev => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const hasMissing = missingCategories.some(c => c.status !== 'available');

  return (
    <div className="norelis-card p-6 border-l-4 border-l-primary-blue space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-deep-navy flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-primary-blue" />
            ADDITIONAL INFORMATION NEEDED
          </h3>
          <p className="text-xs text-secondary-text mt-0.5">
            NORELIS identified missing physiological categories. Complete only the fields below without repeating your uploaded records.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-primary-blue border border-blue-200">
          Targeted Completion
        </span>
      </div>

      {/* Category Status Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {missingCategories.map(cat => {
          let badgeClass = 'bg-emerald-50 text-status-success border-emerald-200';
          let icon = <CheckCircle2 className="w-3.5 h-3.5 text-status-success" />;
          let label = 'Available';

          if (cat.status === 'missing') {
            badgeClass = 'bg-red-50 text-status-critical border-red-200';
            icon = <AlertCircle className="w-3.5 h-3.5 text-status-critical" />;
            label = 'Missing';
          } else if (cat.status === 'partially_available') {
            badgeClass = 'bg-amber-50 text-amber-700 border-amber-200';
            icon = <AlertCircle className="w-3.5 h-3.5 text-amber-600" />;
            label = 'Partially Available';
          }

          return (
            <div
              key={cat.category}
              onClick={() => setExpandedCat(expandedCat === cat.category ? null : cat.category)}
              className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                expandedCat === cat.category ? 'border-primary-blue bg-blue-50/20' : 'border-border-subtle bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-xs font-semibold text-deep-navy truncate">{cat.name}</span>
                {expandedCat === cat.category ? (
                  <ChevronUp className="w-3.5 h-3.5 text-secondary-text" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-secondary-text" />
                )}
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-semibold ${badgeClass}`}>
                  {icon} {label}
                </span>
                <span className="text-secondary-text font-mono text-[10px]">
                  {cat.availableCount}/{cat.totalExpected}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Targeted Supplemental Input Form for Expanded Category */}
      {expandedCat && (
        <div className="p-4 rounded-xl bg-bg-subtle border border-border-subtle space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold text-deep-navy uppercase tracking-wider">
              Enter Missing Fields for {missingCategories.find(c => c.category === expandedCat)?.name}
            </h5>
            <span className="text-[11px] text-secondary-text">Optional: enter known values or leave blank</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.values(PARAMETER_REGISTRY)
              .filter(p => p.category === expandedCat)
              .filter(p => !activeAssessment.parameters.some(ap => ap.key === p.key && ap.value !== null))
              .map(param => (
                <div key={param.key} className="p-3 rounded-xl bg-white border border-border-subtle shadow-sm flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-deep-navy truncate">{param.name}</p>
                    <p className="text-[10px] text-secondary-text">Expected: {param.normalRange[0]} - {param.normalRange[1]} {param.unit}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <input
                      type="text"
                      placeholder={`e.g. ${param.normalRange[0]}`}
                      value={suppValues[param.key]?.value || ''}
                      onChange={e => handleInputChange(param.key, e.target.value, param.unit)}
                      className="w-20 px-2 py-1 text-xs border border-border-subtle rounded-md bg-white focus:outline-none focus:border-primary-blue text-center font-mono"
                    />
                    <span className="text-[11px] text-secondary-text w-8">{param.unit}</span>
                    <button
                      onClick={() => handleSaveMissingParameter(param.key)}
                      disabled={!suppValues[param.key]?.value}
                      className="p-1.5 rounded-md bg-primary-blue text-white hover:bg-bright-blue disabled:opacity-40 transition-colors"
                      title="Add parameter"
                    >
                      <Save className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
