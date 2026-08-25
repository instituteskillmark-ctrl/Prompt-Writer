import React, { useState } from 'react';
import { Upload, Link, Check } from 'lucide-react';
import type { BrandContextState } from '../types/brand';

interface BrandContextProps {
  context: BrandContextState;
  onChange: (context: BrandContextState) => void;
}

export const BrandContext: React.FC<BrandContextProps> = ({ context, onChange }) => {
  const [dragOver, setDragOver] = useState(false);

  const handleChange = (key: keyof BrandContextState, val: string | null) => {
    onChange({ ...context, [key]: val });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleChange('uploadedLogoName', file.name);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleChange('uploadedLogoName', file.name);
    }
  };

  return (
    <div className="bg-surface border border-theme rounded-2xl p-5 sm:p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-theme">
        <div className="w-7 h-7 rounded-lg bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold text-xs">
          04
        </div>
        <div>
          <h2 className="text-xs font-bold tracking-widest text-theme-primary uppercase">
            BRAND & PROJECT CONTEXT
          </h2>
          <p className="text-[11px] text-theme-muted">
            Define your company identity, tone of voice, brand colors, and assets.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Brand / Project Name */}
        <div>
          <label className="block text-xs font-bold text-theme-primary mb-1.5">
            Brand / Project Name
          </label>
          <input
            type="text"
            value={context.brandName}
            onChange={(e) => handleChange('brandName', e.target.value)}
            placeholder="e.g. PulseMetrics AI, Vanguard Atelier..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-theme bg-surface-elevated text-theme-primary placeholder-theme-muted text-xs focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
          />
        </div>

        {/* Industry / Category */}
        <div>
          <label className="block text-xs font-bold text-theme-primary mb-1.5">
            Industry / Category
          </label>
          <input
            type="text"
            value={context.industry}
            onChange={(e) => handleChange('industry', e.target.value)}
            placeholder="e.g. Developer Tools, Luxury Hospitality, B2B SaaS..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-theme bg-surface-elevated text-theme-primary placeholder-theme-muted text-xs focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
          />
        </div>

        {/* Target Location (Optional) */}
        <div>
          <label className="block text-xs font-bold text-theme-primary mb-1.5">
            Target Location <span className="text-[10px] text-theme-muted font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            value={context.targetLocation}
            onChange={(e) => handleChange('targetLocation', e.target.value)}
            placeholder="e.g. Global (North America & Europe), San Francisco..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-theme bg-surface-elevated text-theme-primary placeholder-theme-muted text-xs focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
          />
        </div>

        {/* Brand Personality / Tone */}
        <div>
          <label className="block text-xs font-bold text-theme-primary mb-1.5">
            Brand Personality / Tone
          </label>
          <input
            type="text"
            value={context.brandPersonality}
            onChange={(e) => handleChange('brandPersonality', e.target.value)}
            placeholder="e.g. Intelligent, sleek, authoritative, modern, approachable..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-theme bg-surface-elevated text-theme-primary placeholder-theme-muted text-xs focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
          />
        </div>

        {/* Primary Call to Action */}
        <div>
          <label className="block text-xs font-bold text-theme-primary mb-1.5">
            Primary Call to Action (CTA)
          </label>
          <input
            type="text"
            value={context.primaryCTA}
            onChange={(e) => handleChange('primaryCTA', e.target.value)}
            placeholder="e.g. Start 14-Day Trial, Request Inquiry, Book Table..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-theme bg-surface-elevated text-theme-primary placeholder-theme-muted text-xs focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
          />
        </div>

        {/* Existing Brand Colors */}
        <div>
          <label className="block text-xs font-bold text-theme-primary mb-1.5">
            Existing Brand Colors
          </label>
          <input
            type="text"
            value={context.existingColors}
            onChange={(e) => handleChange('existingColors', e.target.value)}
            placeholder="e.g. #090d16 (Obsidian), #14b8a6 (Teal), #f8fafc (Slate)..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-theme bg-surface-elevated text-theme-primary placeholder-theme-muted text-xs focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
          />
        </div>

        {/* Reference Website URL */}
        <div className="md:col-span-2">
          <label className="flex items-center space-x-1.5 text-xs font-bold text-theme-primary mb-1.5">
            <Link className="w-3.5 h-3.5 text-brand-500" />
            <span>Reference Website URL</span>
          </label>
          <input
            type="url"
            value={context.referenceWebsiteUrl}
            onChange={(e) => handleChange('referenceWebsiteUrl', e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3.5 py-2.5 rounded-xl border border-theme bg-surface-elevated text-theme-primary placeholder-theme-muted text-xs focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
          />
        </div>

        {/* Drag & Drop Logo Upload UI (Frontend Only) */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-theme-primary mb-1.5">
            Logo / Brand Asset Upload <span className="text-[10px] text-theme-muted font-normal">(PNG / SVG / JPG)</span>
          </label>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`p-4 rounded-xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center space-y-2 cursor-pointer ${
              dragOver
                ? 'border-brand-500 bg-brand-500/10'
                : context.uploadedLogoName
                ? 'border-emerald-500/50 bg-emerald-500/10'
                : 'border-theme hover:border-brand-500/50 bg-surface-elevated'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="brand-logo-upload"
            />
            <label htmlFor="brand-logo-upload" className="cursor-pointer flex flex-col items-center space-y-1">
              {context.uploadedLogoName ? (
                <>
                  <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-500 mb-1">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-theme-primary">{context.uploadedLogoName}</span>
                  <span className="text-[10px] text-theme-muted">File attached locally • Click to change</span>
                </>
              ) : (
                <>
                  <div className="p-2 rounded-full bg-brand-500/10 text-brand-500 mb-1">
                    <Upload className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-theme-primary">
                    Drag and drop brand logo here, or <span className="text-brand-500 underline">browse</span>
                  </span>
                  <span className="text-[10px] text-theme-muted">Max file size 5MB • Frontend asset preview</span>
                </>
              )}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
