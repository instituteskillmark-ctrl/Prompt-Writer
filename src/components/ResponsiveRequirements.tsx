import React from 'react';
import { Smartphone, Monitor, Tablet, Check } from 'lucide-react';
import type { ResponsiveReqState } from '../types/brand';

interface ResponsiveRequirementsProps {
  responsive: ResponsiveReqState;
  onChange: (responsive: ResponsiveReqState) => void;
}

export const DEVICE_OPTIONS = ['Desktop', 'Tablet', 'Mobile'];
export const NAV_STYLES: ResponsiveReqState['mobileNavStyle'][] = ['Drawer', 'Hamburger', 'Bottom Bar', 'Minimal'];
export const SPACING_PRIORITIES: ResponsiveReqState['mobileSpacingPriority'][] = ['Compact', 'Balanced', 'Spacious'];

export const ResponsiveRequirements: React.FC<ResponsiveRequirementsProps> = ({
  responsive,
  onChange
}) => {
  const toggleDevice = (dev: string) => {
    const isSelected = responsive.targetDevices.includes(dev);
    let updated: string[];
    if (isSelected) {
      updated = responsive.targetDevices.filter((d) => d !== dev);
    } else {
      updated = [...responsive.targetDevices, dev];
    }
    onChange({ ...responsive, targetDevices: updated });
  };

  return (
    <div className="bg-surface border border-theme rounded-2xl p-5 sm:p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-theme">
        <div className="w-7 h-7 rounded-lg bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold text-xs">
          06
        </div>
        <div>
          <h2 className="text-xs font-bold tracking-widest text-theme-primary uppercase">
            RESPONSIVE & MOBILE REQUIREMENTS
          </h2>
          <p className="text-[11px] text-theme-muted">
            Configure device targets, mobile menu navigation, and layout spacing priorities.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* 1. Target Devices */}
        <div>
          <label className="block text-xs font-bold text-theme-primary mb-2.5">
            Target Device Viewports
          </label>
          <div className="flex flex-wrap gap-2">
            {DEVICE_OPTIONS.map((dev) => {
              const isSelected = responsive.targetDevices.includes(dev);
              let Icon = Monitor;
              if (dev === 'Tablet') Icon = Tablet;
              if (dev === 'Mobile') Icon = Smartphone;

              return (
                <button
                  key={dev}
                  onClick={() => toggleDevice(dev)}
                  type="button"
                  className={`inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 border ${
                    isSelected
                      ? 'bg-brand-500/10 text-brand-500 border-brand-500 font-semibold shadow-sm'
                      : 'bg-surface-elevated text-theme-secondary hover:text-theme-primary border-theme hover:border-theme-hover'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{dev}</span>
                  {isSelected && <Check className="w-3 h-3 text-brand-500 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Responsive-First Behavior Toggle */}
        <div
          onClick={() => onChange({ ...responsive, responsiveFirst: !responsive.responsiveFirst })}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
            responsive.responsiveFirst
              ? 'bg-brand-500/10 border-brand-500/50 text-theme-primary'
              : 'bg-surface-elevated border-theme text-theme-secondary'
          }`}
        >
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-theme-primary block">Mobile-First Responsive Architecture</span>
            <span className="text-[11px] text-theme-muted block">Enforce mobile breakpoint structure before desktop scaling</span>
          </div>

          <div className={`w-8 h-4 rounded-full p-0.5 transition-colors relative shrink-0 ${responsive.responsiveFirst ? 'bg-brand-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
            <div className={`w-3 h-3 rounded-full bg-white transition-transform ${responsive.responsiveFirst ? 'translate-x-4' : 'translate-x-0'}`} />
          </div>
        </div>

        {/* 3. Mobile Navigation Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-theme-primary mb-2">
              Mobile Navigation Style
            </label>
            <div className="flex flex-wrap gap-2">
              {NAV_STYLES.map((style) => {
                const isSelected = responsive.mobileNavStyle === style;
                return (
                  <button
                    key={style}
                    onClick={() => onChange({ ...responsive, mobileNavStyle: style })}
                    type="button"
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                      isSelected
                        ? 'bg-brand-500/10 text-brand-500 border-brand-500 font-semibold'
                        : 'bg-surface-elevated text-theme-secondary border-theme hover:text-theme-primary'
                    }`}
                  >
                    {style}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Mobile Spacing Priority */}
          <div>
            <label className="block text-xs font-bold text-theme-primary mb-2">
              Mobile Spacing Priority
            </label>
            <div className="flex flex-wrap gap-2">
              {SPACING_PRIORITIES.map((sp) => {
                const isSelected = responsive.mobileSpacingPriority === sp;
                return (
                  <button
                    key={sp}
                    onClick={() => onChange({ ...responsive, mobileSpacingPriority: sp })}
                    type="button"
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                      isSelected
                        ? 'bg-brand-500/10 text-brand-500 border-brand-500 font-semibold'
                        : 'bg-surface-elevated text-theme-secondary border-theme hover:text-theme-primary'
                    }`}
                  >
                    {sp}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
