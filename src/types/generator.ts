export type PromptMode = 'Quick' | 'Detailed' | 'Expert';

export type WebsiteGoal = 
  | 'Build Brand Presence'
  | 'Generate Leads'
  | 'Sell Products'
  | 'Showcase Work'
  | 'Launch a SaaS'
  | 'Increase Conversions'
  | 'Provide Information'
  | 'Build Community'
  | 'Other';

export type OutputLanguage = 
  | 'English'
  | 'Auto'
  | 'Urdu'
  | 'Hindi'
  | 'Arabic'
  | 'Spanish'
  | 'French'
  | 'German'
  | 'Portuguese'
  | 'Chinese'
  | 'Japanese'
  | 'Korean';

export type UXPriority = 
  | 'Simplicity'
  | 'Conversion'
  | 'Accessibility'
  | 'Visual Impact'
  | 'Speed'
  | 'Storytelling';

export type ContentDirection = 
  | 'Minimal Copy'
  | 'Marketing Focused'
  | 'Editorial'
  | 'Technical'
  | 'Storytelling'
  | 'Conversion Focused';

export type TechStackPreference = 
  | 'No Preference'
  | 'Next.js'
  | 'React'
  | 'HTML / CSS / JS'
  | 'Tailwind CSS'
  | 'Custom';

export type BuildTarget = 
  | 'Antigravity'
  | 'Claude'
  | 'Cursor'
  | 'v0'
  | 'Lovable'
  | 'Replit'
  | 'Generic AI Builder';

export type OutputStyle = 
  | 'Clean Specification'
  | 'Detailed Build Prompt'
  | 'Developer Prompt'
  | 'Creative Direction'
  | 'Complete Master Prompt';

export interface AdvancedOptionsState {
  accessibility: boolean;
  seo: boolean;
  performance: boolean;
  responsive: boolean;
  animation: boolean;
  browserCompat: boolean;
}

export interface AdvancedGeneratorState {
  promptMode: PromptMode;
  websiteGoal: WebsiteGoal;
  uxPriority: UXPriority;
  contentDirection: ContentDirection;
  selectedFeatures: string[];
  techStack: TechStackPreference;
  buildTarget: BuildTarget;
  outputStyle: OutputStyle;
  advancedOptions: AdvancedOptionsState;
}

export interface SectionToggles {
  strategy: boolean;
  branding: boolean;
  visualDesign: boolean;
  typography: boolean;
  pages: boolean;
  uiux: boolean;
  features: boolean;
  animations: boolean;
  responsive: boolean;
  seo: boolean;
  accessibility: boolean;
  performance: boolean;
  technical: boolean;
}
