import React, { useState } from 'react';
import { Check, Edit2, X, AlertTriangle, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { useHealth } from '../../../contexts/HealthContext';
import { HealthParameter } from '../../../types';

export const ExtractedHealthDataReview: React.FC = () => {
  const { activeAssessment, updateParameter, removeParameter } = useHealth();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editVal, setEditVal] = useState<string>('');
  const [editUnit, setEditUnit] = useState<string>('');

  const startEdit = (p: HealthParameter) => {
    setEditingId(p.id);
    setEditVal(String(p.value ?? ''));
    setEditUnit(p.unit || '');
  };

  const saveEdit = (p: HealthParameter) => {
    const num = parseFloat(editVal);
    updateParameter(p.id, {
      value: !isNaN(num) ? num : editVal,
      unit: editUnit,
      verificationStatus: 'verified'
    });
    setEditingId(null);
  };

  const verifyParam = (p: HealthParameter, status: 'verified' | 'rejected') => {
    updateParameter(p.id, { verificationStatus: status });
  };

  const resolveConflict = (p: HealthParameter, chosenValue: number | string, chosenSource: string, chosenDate: string) => {
    updateParameter(p.id, {
      value: chosenValue,
      sourceDocument: chosenSource,
      measuredAt: chosenDate,
      conflictingValues: undefined,
      verificationStatus: 'verified'
    });
  };

  if (activeAssessment.parameters.length === 0) {
    return (
      <div className="p-8 rounded-2xl bg-white border border-border-subtle text-center text-secondary-text">
        <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
        <p className="text-sm font-semibold text-deep-navy">No extracted parameters yet</p>
        <p className="text-xs text-secondary-text mt-1">Upload a medical report or test record above to see extracted parameters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-deep-navy uppercase tracking-wider">
          Extracted Health Parameters ({activeAssessment.parameters.length})
        </h4>
        <span className="text-xs text-secondary-text">
          Review & Verify Each Measurement
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border-subtle bg-white shadow-card">
        <table className="w-full text-left text-xs">
          <thead className="bg-bg-subtle text-secondary-text uppercase text-[10px] tracking-wider border-b border-border-subtle">
            <tr>
              <th className="py-3 px-4">Parameter</th>
              <th className="py-3 px-4">Extracted Value</th>
              <th className="py-3 px-4">Unit</th>
              <th className="py-3 px-4">Document Source</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Verification</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {activeAssessment.parameters.map(p => {
              const isEditing = editingId === p.id;
              const hasConflict = p.conflictingValues && p.conflictingValues.length > 0;

              return (
                <React.Fragment key={p.id}>
                  <tr className={`hover:bg-blue-50/20 transition-colors ${hasConflict ? 'bg-amber-50/30' : ''}`}>
                    <td className="py-3 px-4 font-semibold text-deep-navy">
                      <div className="flex items-center gap-1.5">
                        {hasConflict && <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                        <span>{p.name}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editVal}
                          onChange={e => setEditVal(e.target.value)}
                          className="w-24 px-2 py-1 border border-primary-blue rounded bg-white text-xs font-semibold focus:outline-none"
                        />
                      ) : (
                        <span className="font-mono font-bold text-deep-navy text-sm">
                          {p.value !== null ? String(p.value) : '—'}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-secondary-text">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editUnit}
                          onChange={e => setEditUnit(e.target.value)}
                          className="w-16 px-2 py-1 border border-border-subtle rounded bg-white text-xs focus:outline-none"
                        />
                      ) : (
                        <span>{p.unit || '—'}</span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-bg-subtle text-secondary-text text-[11px] font-medium border border-border-subtle max-w-[140px] truncate block" title={p.sourceDocument}>
                        {p.sourceDocument || 'Direct Entry'}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-secondary-text">
                      {p.measuredAt || '—'}
                    </td>

                    <td className="py-3 px-4">
                      {p.verificationStatus === 'verified' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-status-success border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </span>
                      )}
                      {p.verificationStatus === 'unverified' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-600 border border-amber-200">
                          <AlertCircle className="w-3 h-3" /> Unverified
                        </span>
                      )}
                      {p.verificationStatus === 'rejected' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-50 text-status-critical border border-red-200">
                          <X className="w-3 h-3" /> Rejected
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => saveEdit(p)}
                              title="Save Changes"
                              className="p-1.5 rounded-md bg-status-success text-white hover:bg-emerald-600"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              title="Cancel"
                              className="p-1.5 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(p)}
                              title="Edit Value or Unit"
                              className="p-1.5 text-secondary-text hover:text-primary-blue hover:bg-blue-50 rounded-md transition-colors"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            {p.verificationStatus !== 'verified' && (
                              <button
                                onClick={() => verifyParam(p, 'verified')}
                                title="Confirm Parameter"
                                className="p-1.5 text-secondary-text hover:text-status-success hover:bg-emerald-50 rounded-md transition-colors"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              onClick={() => removeParameter(p.id)}
                              title="Remove Parameter"
                              className="p-1.5 text-secondary-text hover:text-status-critical hover:bg-red-50 rounded-md transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* Conflicting values notification row */}
                  {hasConflict && (
                    <tr className="bg-amber-50/60 text-xs">
                      <td colSpan={7} className="py-2.5 px-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-amber-800">
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                            <span className="font-semibold">Conflicting values detected across multiple documents:</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            {/* Primary value option */}
                            <button
                              onClick={() => resolveConflict(p, p.value!, p.sourceDocument!, p.measuredAt!)}
                              className="px-2.5 py-1 rounded bg-white border border-amber-300 hover:border-amber-500 text-amber-900 font-medium text-[11px] shadow-sm"
                            >
                              Use {p.value} {p.unit} ({p.sourceDocument})
                            </button>
                            {/* Conflicting options */}
                            {p.conflictingValues?.map((cv, cIdx) => (
                              <button
                                key={cIdx}
                                onClick={() => resolveConflict(p, cv.value, cv.sourceDocument, cv.measuredAt)}
                                className="px-2.5 py-1 rounded bg-white border border-amber-300 hover:border-amber-500 text-amber-900 font-medium text-[11px] shadow-sm"
                              >
                                Use {cv.value} {p.unit} ({cv.sourceDocument})
                              </button>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
