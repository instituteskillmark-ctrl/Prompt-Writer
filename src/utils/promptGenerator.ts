import type { ProjectDetailsState } from '../components/ProjectDetails';
import type { CreativeDirectionState } from '../components/CreativeDirection';
import type { AdvancedGeneratorState, SectionToggles } from '../types/generator';
import type { BrandContextState, DesignReferenceItem, ResponsiveReqState, TechnicalStackState, AIBuildRulesState, ResultModifierType } from '../types/brand';

export function generateStructuredPrompt(
  ideaText: string,
  projectDetails: ProjectDetailsState,
  creativeDirection: CreativeDirectionState,
  advancedState?: AdvancedGeneratorState,
  sectionToggles?: SectionToggles,
  brandContext?: BrandContextState,
  designReferences?: DesignReferenceItem[],
  responsiveReq?: ResponsiveReqState,
  techStack?: TechnicalStackState,
  buildRules?: AIBuildRulesState,
  modifier?: ResultModifierType
): string {
  const idea = ideaText.trim() || 'A high-converting, modern digital web application.';
  const type = projectDetails.websiteType || 'SaaS';
  const style = projectDetails.visualStyle || 'Modern';
  const audience = projectDetails.targetAudience.trim() || 'Tech-savvy users and industry decision makers';
  const pages = projectDetails.selectedPages.length > 0 
    ? projectDetails.selectedPages.join(', ')
    : 'Hero, Features, Pricing, Contact, Footer';
  const colorTheme = creativeDirection.colorTheme || 'Dark';
  const typography = creativeDirection.typography || 'Modern';
  const layout = creativeDirection.layout || 'Minimal';
  const animation = creativeDirection.animation || 'Smooth';

  const mode = advancedState?.promptMode || 'Detailed';
  const goal = advancedState?.websiteGoal || 'Launch a SaaS';
  const uxPriority = advancedState?.uxPriority || 'Conversion';
  const contentDir = advancedState?.contentDirection || 'Marketing Focused';
  const features = advancedState?.selectedFeatures?.length 
    ? advancedState.selectedFeatures.join(', ') 
    : 'Contact Form, Pricing, Testimonials, FAQ';
  const buildTarget = advancedState?.buildTarget || 'Antigravity';
  const outputStyle = advancedState?.outputStyle || 'Complete Master Prompt';
  const adv = advancedState?.advancedOptions;

  const brandName = brandContext?.brandName.trim() || 'Unspecified Brand';
  const industry = brandContext?.industry.trim() || 'Digital Technology';
  const brandTone = brandContext?.brandPersonality.trim() || 'Sleek, authoritative, modern';
  const primaryCTA = brandContext?.primaryCTA.trim() || 'Get Started';
  const brandColors = brandContext?.existingColors.trim() || 'Dark obsidian foundation (#090d16) with Teal accents (#14b8a6)';
  const refUrl = brandContext?.referenceWebsiteUrl.trim();

  const fw = techStack?.framework || 'React';
  const isTS = techStack?.useTypeScript !== false;
  const stylingEngine = techStack?.styling || 'Tailwind';
  const arch = techStack?.componentArchitecture || 'Modular';
  const accLevel = techStack?.accessibilityLevel || 'WCAG 2.1 AA';

  const activeRules = buildRules?.rules.filter((r) => r.enabled).map((r) => r.label) || [];
  const customInstructions = buildRules?.customInstructions.trim();

  const toggles = sectionToggles || {
    strategy: true,
    branding: true,
    visualDesign: true,
    typography: true,
    pages: true,
    uiux: true,
    features: true,
    animations: true,
    responsive: true,
    seo: true,
    accessibility: true,
    performance: true,
    technical: true
  };

  const sections: string[] = [];

  // Header Banner with Modifier Note if applied
  sections.push(`/* ==========================================================================
   AI PROMPT ARCHITECT — MASTER PROMPT SPECIFICATION
   Target Engine: ${buildTarget}
   Prompt Mode: ${mode} (${outputStyle})
   ${modifier ? `[Applied Tone Adjustment: ${modifier}]` : ''}
   ========================================================================== */`);

  if (toggles.strategy) {
    sections.push(`## 01 — ROLE & STRATEGIC OBJECTIVE
Act as a Senior Frontend Engineer and Lead UI/UX Architect. Build a production-ready, highly responsive ${type} website.
- Brand / Project Name: ${brandName}
- Industry Category: ${industry}
- Primary Business Goal: ${goal}
- Primary CTA Label: ${primaryCTA}
- Target Builder Tool: Optimized for ${buildTarget}
- Output Specification Format: ${outputStyle}`);
  }

  if (toggles.branding) {
    sections.push(`## 02 — WEBSITE CONCEPT & BRAND CONTEXT
- Core Vision: ${idea}
- Brand Tone & Personality: ${brandTone}
- Existing Brand Colors: ${brandColors}
- Copy & Content Direction: ${contentDir}${refUrl ? `\n- Reference Benchmark Website: ${refUrl}` : ''}`);
  }

  if (toggles.visualDesign) {
    sections.push(`## 03 — TARGET AUDIENCE & UX PRIORITY
- Target Audience Persona: ${audience}${brandContext?.targetLocation ? ` (Location: ${brandContext.targetLocation})` : ''}
- Core UX Priority: ${uxPriority} (Focus on intuitive navigation, high legibility, and effortless conversion flow)`);
  }

  if (designReferences && designReferences.length > 0) {
    sections.push(`## 04 — DESIGN REFERENCES & INSPIRATION BENCHMARKS
The AI builder must reference the following design benchmarks:
${designReferences.map((ref, idx) => `  ${idx + 1}. ${ref.title} ${ref.url ? `(${ref.url})` : ''} — Influence: ${ref.influenceAreas.join(', ')} ${ref.notes ? `| Note: "${ref.notes}"` : ''}`).join('\n')}`);
  }

  if (toggles.visualDesign) {
    sections.push(`## 05 — VISUAL DESIGN & GRID SYSTEM
- Visual Style Persona: ${style} ${modifier === 'Make More Creative' ? '(Enhanced Creative Flourish)' : modifier === 'Make More Minimal' ? '(Extreme Minimalist Whitespace)' : ''}
- Grid Layout Structure: ${layout} layout with generous whitespace, crisp structural alignments, and subtle contrast boundaries
- Surface Cards: Elevated backdrop cards with subtle 1px border lines and soft drop shadows
- Color Accent Balance: 80–90% neutral foundation paired with 10–20% vibrant teal accents for interactive elements and key CTAs`);
  }

  if (toggles.typography) {
    sections.push(`## 06 — COLOR SYSTEM & PALETTE
- Theme Preference: ${colorTheme} Mode
- Background: ${colorTheme === 'Dark' ? 'Near-black deep charcoal (#090d16 / #111726)' : 'Soft clean white slate (#f8fafc / #ffffff)'}
- Surfaces & Cards: ${colorTheme === 'Dark' ? 'Dark elevated charcoal (#172033 / #1e293b)' : 'Light gray elevation (#ffffff / #f1f5f9)'}
- Typography Colors: ${colorTheme === 'Dark' ? 'Off-white primary (#f8fafc), muted slate secondary (#94a3b8)' : 'Dark navy primary (#0f172a), slate gray secondary (#475569)'}
- Accent Color: Strategic Teal (#14b8a6 / #0d9488) used for primary CTAs, active indicators, and focus states`);
  }

  if (toggles.typography) {
    sections.push(`## 07 — TYPOGRAPHY HIERARCHY
- Font Style: ${typography} sans-serif font family (e.g. Plus Jakarta Sans or Inter)
- Hierarchy Rules:
  - Hero Heading: Extra bold (700-800 weight), tight letter-spacing (-0.02em), comfortable line-height (1.15)
  - Section Titles: Bold (600-700 weight), clear hierarchy with uppercase category labels
  - Body Copy: Medium readable size (14-16px), relaxed line-height (1.6)`);
  }

  if (toggles.pages) {
    sections.push(`## 08 — PAGE STRUCTURE & SECTIONS
Implement the following core sections and components cleanly:
${pages.split(', ').map((p, idx) => `  ${idx + 1}. ${p}`).join('\n')}`);
  }

  if (toggles.features) {
    sections.push(`## 09 — FUNCTIONAL REQUIREMENTS & FEATURES
Implement UI placeholders and interactive layouts for:
${features.split(', ').map((f) => `  - [ ] ${f}`).join('\n')}`);
  }

  if (toggles.uiux) {
    sections.push(`## 10 — UI/UX INTERACTION REQUIREMENTS
- High-contrast visual focal points directing eye flow to primary action buttons (${primaryCTA})
- Primary CTA buttons prominently placed with visual hover state effects and smooth focus rings
- Interactive form inputs with focus state rings and error state indicators
- Micro-interactions on all hoverable pills, tabs, and navigation links`);
  }

  if (toggles.animations) {
    sections.push(`## 11 — ANIMATIONS & MICRO-INTERACTIONS
- Motion Profile: ${modifier === 'Add Animations' ? 'Cinematic & Dynamic' : animation} micro-animations
- Transitions: 200–300ms smooth cubic-bezier transitions for theme switching, hover elevations, and tab switching
- Reduced Motion: ${adv?.animation !== false ? 'Enforce system prefers-reduced-motion settings' : 'Standard CSS transitions'}`);
  }

  if (toggles.responsive) {
    sections.push(`## 12 — RESPONSIVE BEHAVIOR & MOBILE ARCHITECTURE
- Device Viewports: ${responsiveReq?.targetDevices.join(', ') || 'Desktop, Tablet, Mobile'}
- Mobile Navigation Style: ${responsiveReq?.mobileNavStyle || 'Drawer'}
- Mobile Spacing Priority: ${responsiveReq?.mobileSpacingPriority || 'Balanced'} ${modifier === 'Improve Mobile UX' ? '(Optimized 44px+ touch targets & zero horizontal overflow)' : ''}
- Mobile Breakpoints: Desktop (1280px+), Tablet (768px - 1024px), Mobile (< 768px)`);
  }

  if (toggles.technical) {
    sections.push(`## 13 — TECHNICAL STACK & ARCHITECTURE CONSTRAINTS
- Target Framework: ${fw} (${isTS ? 'TypeScript Strict' : 'JavaScript ES6+'})
- Styling Engine: ${stylingEngine} CSS
- Component Architecture: ${arch} structure
- Accessibility Standard: ${accLevel}
- Target Builder Tool: ${buildTarget}`);
  }

  if (activeRules.length > 0 || customInstructions) {
    sections.push(`## 14 — AI BUILDER RULES & CUSTOM INSTRUCTIONS
AI Builder Directives:
${activeRules.map((r) => `  - [x] ${r}`).join('\n')}
${customInstructions ? `\nCustom Project Instructions:\n"${customInstructions}"` : ''}`);
  }

  return sections.join('\n\n');
}
