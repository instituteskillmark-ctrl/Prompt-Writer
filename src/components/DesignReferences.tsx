import React, { useState } from 'react';
import { Image, Link, Plus, Trash2, Check, Upload } from 'lucide-react';
import type { DesignReferenceItem } from '../types/brand';

interface DesignReferencesProps {
  references: DesignReferenceItem[];
  onChange: (references: DesignReferenceItem[]) => void;
}

export const INFLUENCE_AREAS = [
  'Layout',
  'Color',
  'Typography',
  'Animation',
  'Overall Style'
];

export const DesignReferences: React.FC<DesignReferencesProps> = ({ references, onChange }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newAreas, setNewAreas] = useState<string[]>(['Layout', 'Overall Style']);
  const [newFileName, setNewFileName] = useState<string | undefined>(undefined);

  const handleToggleArea = (area: string) => {
    if (newAreas.includes(area)) {
      setNewAreas(newAreas.filter((a) => a !== area));
    } else {
      setNewAreas([...newAreas, area]);
    }
  };

  const handleAddReference = () => {
    if (!newTitle.trim() && !newUrl.trim() && !newFileName) return;

    const item: DesignReferenceItem = {
      id: `ref-${Date.now()}`,
      title: newTitle.trim() || newFileName || newUrl || 'Design Inspiration',
      url: newUrl.trim(),
      notes: newNotes.trim(),
      influenceAreas: [...newAreas],
      fileName: newFileName
    };

    onChange([...references, item]);

    // Reset inputs
    setNewTitle('');
    setNewUrl('');
    setNewNotes('');
    setNewAreas(['Layout', 'Overall Style']);
    setNewFileName(undefined);
  };

  const handleRemoveReference = (id: string) => {
    onChange(references.filter((r) => r.id !== id));
  };

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="bg-surface border border-theme rounded-2xl p-5 sm:p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-theme">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 rounded-lg bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold text-xs">
            05
          </div>
          <div>
            <h2 className="text-xs font-bold tracking-widest text-theme-primary uppercase">
              DESIGN REFERENCES & INSPIRATION
            </h2>
            <p className="text-[11px] text-theme-muted">
              Add screenshot references, website URLs, and specify influence parameters.
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono text-brand-500 font-bold px-2 py-0.5 rounded badge-teal">
          {references.length} REFERENCES ADDED
        </span>
      </div>

      {/* Add New Reference Form */}
      <div className="p-4 rounded-xl bg-surface-elevated border border-theme space-y-4 mb-5">
        <span className="text-xs font-bold text-theme-primary block">Add New Design Reference</span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-theme-secondary mb-1">Title / Name</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Stripe Landing Grid, Apple Typography..."
              className="w-full px-3 py-2 rounded-xl border border-theme bg-surface text-theme-primary placeholder-theme-muted text-xs focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-theme-secondary mb-1">Inspiration Website URL</label>
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://dribbble.com/shots/example"
              className="w-full px-3 py-2 rounded-xl border border-theme bg-surface text-theme-primary placeholder-theme-muted text-xs focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[11px] font-semibold text-theme-secondary mb-1">Inspiration Notes</label>
            <textarea
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              placeholder="Describe what you like about this reference (e.g. Clean typography hierarchy, subtle glow cards...)"
              rows={2}
              className="w-full p-3 rounded-xl border border-theme bg-surface text-theme-primary placeholder-theme-muted text-xs focus:outline-none focus:border-brand-500 resize-y"
            />
          </div>

          {/* Screenshot Upload UI */}
          <div>
            <label className="block text-[11px] font-semibold text-theme-secondary mb-1">Upload Screenshot</label>
            <div className="flex items-center space-x-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileDrop}
                id="ref-screenshot-input"
                className="hidden"
              />
              <label
                htmlFor="ref-screenshot-input"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-theme bg-surface hover:bg-surface-elevated text-xs font-medium text-theme-primary cursor-pointer transition-colors"
              >
                <Upload className="w-3.5 h-3.5 text-brand-500" />
                <span>{newFileName || 'Browse Screenshot'}</span>
              </label>
              {newFileName && (
                <span className="text-[10px] text-emerald-500 font-bold">Attached ✓</span>
              )}
            </div>
          </div>

          {/* Influence Area Pills */}
          <div>
            <label className="block text-[11px] font-semibold text-theme-secondary mb-1">Influence Areas</label>
            <div className="flex flex-wrap gap-1.5">
              {INFLUENCE_AREAS.map((area) => {
                const isSelected = newAreas.includes(area);
                return (
                  <button
                    key={area}
                    onClick={() => handleToggleArea(area)}
                    type="button"
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all border ${
                      isSelected
                        ? 'bg-brand-500/10 text-brand-500 border-brand-500'
                        : 'bg-surface text-theme-muted border-theme hover:text-theme-primary'
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 inline mr-1 stroke-[3]" />}
                    {area}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <button
          onClick={handleAddReference}
          type="button"
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-teal-glow transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Reference to Project</span>
        </button>
      </div>

      {/* Reference List */}
      {references.length > 0 ? (
        <div className="space-y-3">
          {references.map((ref) => (
            <div
              key={ref.id}
              className="p-3.5 rounded-xl border border-theme bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Image className="w-4 h-4 text-brand-500 shrink-0" />
                  <span className="text-xs font-bold text-theme-primary">{ref.title}</span>
                  {ref.url && (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-brand-500 underline flex items-center"
                    >
                      <Link className="w-3 h-3 inline mr-0.5" />
                      <span>Link</span>
                    </a>
                  )}
                </div>
                {ref.notes && <p className="text-[11px] text-theme-secondary">{ref.notes}</p>}
                <div className="flex flex-wrap gap-1 pt-1">
                  {ref.influenceAreas.map((a) => (
                    <span key={a} className="px-2 py-0.5 rounded bg-surface-elevated border border-theme text-[9px] font-bold text-theme-muted">
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleRemoveReference(ref.id)}
                type="button"
                className="p-1.5 rounded-lg text-theme-muted hover:text-rose-500 hover:bg-rose-500/10 transition-colors self-end sm:self-center"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-xs text-theme-muted">
          No design references added yet. Use the form above to attach screenshots or URLs.
        </div>
      )}
    </div>
  );
};
