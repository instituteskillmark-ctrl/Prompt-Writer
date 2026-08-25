export interface BrandContextState {
  brandName: string;
  industry: string;
  targetLocation: string;
  brandPersonality: string;
  primaryCTA: string;
  existingColors: string;
  referenceWebsiteUrl: string;
  uploadedLogoName: string | null;
}

export interface DesignReferenceItem {
  id: string;
  title: string;
  url: string;
  notes: string;
  influenceAreas: string[]; // e.g. ['Layout', 'Color', 'Typography', 'Animation', 'Overall Style']
  fileName?: string;
}

export interface ResponsiveReqState {
  targetDevices: string[]; // e.g. ['Desktop', 'Tablet', 'Mobile']
  responsiveFirst: boolean;
  mobileNavStyle: 'Drawer' | 'Hamburger' | 'Bottom Bar' | 'Minimal' | '' | string;
  mobileSpacingPriority: 'Compact' | 'Balanced' | 'Spacious' | '' | string;
}

export interface TechnicalStackState {
  framework: 'React' | 'Next.js' | 'Vite' | 'HTML-CSS-JS' | '' | string;
  useTypeScript: boolean;
  styling: 'Tailwind' | 'CSS' | 'Custom' | '' | string;
  componentArchitecture: 'Atomic' | 'Modular' | 'Single File' | '' | string;
  accessibilityLevel: 'WCAG 2.1 AA' | 'WCAG 2.1 AAA' | 'Basic' | '' | string;
  seoPriority: boolean;
  performancePriority: boolean;
  browserCompat: boolean;
}

export interface AIBuildRuleItem {
  id: string;
  label: string;
  enabled: boolean;
}

export interface AIBuildRulesState {
  rules: AIBuildRuleItem[];
  customInstructions: string;
}

export type ResultModifierType = 
  | 'Make More Creative'
  | 'Make More Professional'
  | 'Make More Minimal'
  | 'Add Animations'
  | 'Improve Mobile UX';
