import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Trash2, Eye, FileSpreadsheet, Image as ImageIcon, ShieldCheck, Loader2 } from 'lucide-react';
import { useHealth } from '../../../contexts/HealthContext';
import { UploadedDocument } from '../../../types';

interface FileUploadZoneProps {
  onProceedToReview?: () => void;
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({ onProceedToReview }) => {
  const { activeAssessment, uploadDocumentFile, removeUploadedDocument } = useHealth();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<UploadedDocument | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsProcessing(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await uploadDocumentFile(file);
    }

    setIsProcessing(false);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return <FileText className="w-5 h-5 text-red-500" />;
    if (ext === 'docx' || ext === 'doc') return <FileText className="w-5 h-5 text-blue-500" />;
    if (ext === 'csv' || ext === 'xlsx') return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
    if (['jpg', 'jpeg', 'png'].includes(ext || '')) return <ImageIcon className="w-5 h-5 text-purple-500" />;
    return <FileText className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Privacy and Client-Side Assurance Banner */}
      <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex items-start gap-3 text-xs text-primary-text">
        <ShieldCheck className="w-5 h-5 text-primary-blue shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-deep-navy">Client-Side Secure In-Memory Processing</p>
          <p className="text-secondary-text mt-0.5">
            NORELIS processes medical documents strictly in your browser using local Web APIs (PDF.js, Mammoth, SheetJS). Health data is never transmitted to cloud servers or third parties.
          </p>
        </div>
      </div>

      {/* Drag & Drop Area */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-primary-blue bg-blue-50/50 scale-[1.01]'
            : 'border-border-subtle hover:border-bright-blue bg-white'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.csv,.xlsx,.jpg,.jpeg,.png"
          onChange={e => handleFiles(e.target.files)}
          className="hidden"
        />

        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-primary-blue mx-auto flex items-center justify-center mb-4">
          {isProcessing ? (
            <Loader2 className="w-8 h-8 animate-spin" />
          ) : (
            <UploadCloud className="w-8 h-8" />
          )}
        </div>

        <h4 className="text-base font-bold text-deep-navy mb-1">
          {isProcessing ? 'Extracting Medical Information...' : 'Drag and drop your health documents here'}
        </h4>
        <p className="text-xs text-secondary-text mb-4">
          or <span className="text-primary-blue font-semibold underline">browse files</span> from your local workstation
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto">
          {['PDF Reports', 'DOCX Records', 'CSV / XLSX Labs', 'Medical Image Scans'].map((badge, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-bg-subtle text-secondary-text border border-border-subtle">
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Uploaded Files List */}
      {activeAssessment.uploadedDocuments.length > 0 && (
        <div className="space-y-3">
          <h5 className="text-xs font-bold text-deep-navy uppercase tracking-wider">
            Uploaded Documents ({activeAssessment.uploadedDocuments.length})
          </h5>

          <div className="grid grid-cols-1 gap-2.5">
            {activeAssessment.uploadedDocuments.map(doc => (
              <div
                key={doc.id}
                className="p-3.5 rounded-xl bg-white border border-border-subtle shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-bg-subtle flex items-center justify-center shrink-0">
                    {getFileIcon(doc.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-deep-navy truncate">{doc.name}</p>
                    <div className="flex items-center gap-2 text-[11px] text-secondary-text mt-0.5">
                      <span>{formatFileSize(doc.size)}</span>
                      <span>•</span>
                      {doc.status === 'processing' && (
                        <span className="text-primary-blue font-medium flex items-center gap-1">
                          <Loader2 className="w-3 h-3 animate-spin" /> Parsing document...
                        </span>
                      )}
                      {doc.status === 'extracted' && (
                        <span className="text-status-success font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Extracted {doc.extractedFieldCount} parameters
                        </span>
                      )}
                      {doc.status === 'error' && (
                        <span className="text-status-critical font-medium flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {doc.error || 'Failed to extract'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {doc.rawText && (
                    <button
                      onClick={() => setPreviewDoc(doc)}
                      title="Inspect extracted raw text"
                      className="p-2 text-secondary-text hover:text-deep-navy hover:bg-bg-subtle rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => removeUploadedDocument(doc.id)}
                    title="Remove document and extracted parameters"
                    className="p-2 text-secondary-text hover:text-status-critical hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Raw Text Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-elevated border border-border-subtle max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-4">
              <div>
                <h4 className="text-sm font-bold text-deep-navy">{previewDoc.name}</h4>
                <p className="text-xs text-secondary-text">Client-Side Extracted Text Preview</p>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-bg-subtle text-deep-navy hover:bg-gray-200"
              >
                Close
              </button>
            </div>
            <pre className="flex-1 overflow-auto bg-bg-subtle p-4 rounded-xl text-xs font-mono text-primary-text whitespace-pre-wrap leading-relaxed">
              {previewDoc.rawText || 'No text content available.'}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
