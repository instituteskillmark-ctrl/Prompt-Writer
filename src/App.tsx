import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthScreen } from './components/auth/AuthScreen';
import { PublicLanding } from './components/PublicLanding';
import { Loader2 } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { GeneratorHero } from './components/GeneratorHero';
import { IdeaInput } from './components/IdeaInput';
import { ProjectDetails } from './components/ProjectDetails';
import type { ProjectDetailsState } from './components/ProjectDetails';
import { CreativeDirection } from './components/CreativeDirection';
import type { CreativeDirectionState } from './components/CreativeDirection';
import { GenerateButton } from './components/GenerateButton';
import { SampleIdeasModal } from './components/SampleIdeasModal';
import { PromptResult } from './components/PromptResult';
import { MyPromptsView } from './components/MyPromptsView';
import { ExamplesView } from './components/ExamplesView';
import { TemplatesView } from './components/TemplatesView';
import type { TemplateItem } from './components/TemplatesView';
import { HowItWorksView } from './components/HowItWorksView';
import { FavoritesView } from './components/FavoritesView';
import { Toast } from './components/Toast';
import { PromptModeSelector } from './components/PromptModeSelector';
import { GoalSelector } from './components/GoalSelector';
import { UXPrioritySelector } from './components/UXPrioritySelector';
import { FeatureSelector } from './components/FeatureSelector';
import { AdvancedOptions } from './components/AdvancedOptions';
import { LiveProjectSummary } from './components/LiveProjectSummary';
import { QuickPresets } from './components/QuickPresets';
import { BrandContext } from './components/BrandContext';
import { DesignReferences } from './components/DesignReferences';
import { ResponsiveRequirements } from './components/ResponsiveRequirements';
import { TechnicalStack } from './components/TechnicalStack';
import { AIBuildRules, DEFAULT_AI_RULES } from './components/AIBuildRules';
import { PromptReadiness } from './components/PromptReadiness';
import { ConfigurationReviewModal } from './components/ConfigurationReviewModal';
import { generateStructuredPrompt } from './utils/promptGenerator';
import { requestAiGeneration } from './utils/aiClient';
import { 
  getSavedPrompts, 
  savePrompt, 
  deleteSavedPrompt, 
  getFavoriteIds, 
  toggleFavoriteId
} from './utils/storage';
import { 
  fetchSavedPromptsFromDb, 
  savePromptToDb, 
  deletePromptFromDb, 
  fetchFavoritesFromDb, 
  toggleFavoriteInDb 
} from './lib/db';
import type { SavedPromptItem } from './utils/storage';
import type { AdvancedGeneratorState, SectionToggles } from './types/generator';
import type { 
  BrandContextState, 
  DesignReferenceItem, 
  ResponsiveReqState, 
  TechnicalStackState, 
  AIBuildRulesState, 
  ResultModifierType 
} from './types/brand';
import { Sparkles } from 'lucide-react';

function InnerApp() {
  const { session, loading } = useAuth();
  // Theme State: Dark mode default
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  // Sidebar & Navigation State
  const [activeTab, setActiveTab] = useState<string>('generator');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // View Mode inside Generator tab: 'form' | 'transition' | 'result'
  const [viewMode, setViewMode] = useState<'form' | 'transition' | 'result'>('form');

  // Modals & Drawers
  const [isSampleModalOpen, setIsSampleModalOpen] = useState<boolean>(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

  // Validation Error & Toast Notification State
  const [validationError, setValidationError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Local Storage State
  const [savedPrompts, setSavedPrompts] = useState<SavedPromptItem[]>(() => getSavedPrompts());
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => getFavoriteIds());

  // Form State (Card 01, Card 02, Card 03)
  const [ideaText, setIdeaText] = useState<string>('A high-converting SaaS landing page for an AI developer platform called "PulseMetrics". Features dark mode UI with interactive live dashboard previews, pricing calculator, integration logo cloud, customer ROI testimonials, and a prominent 14-day free trial CTA.');
  
  const [projectDetails, setProjectDetails] = useState<ProjectDetailsState>({
    websiteType: 'SaaS',
    visualStyle: 'Modern',
    targetAudience: 'Tech startups, software engineers, SaaS founders',
    selectedPages: ['Hero', 'Features', 'Pricing', 'Testimonials', 'FAQ', 'Contact', 'Footer']
  });

  const [creativeDirection, setCreativeDirection] = useState<CreativeDirectionState>({
    colorTheme: 'Dark',
    typography: 'Modern',
    layout: 'Minimal',
    animation: 'Smooth'
  });

  // Brand Context State (Card 04)
  const [brandContext, setBrandContext] = useState<BrandContextState>({
    brandName: 'PulseMetrics AI',
    industry: 'Developer Tools & SaaS',
    targetLocation: 'Global (North America & Europe)',
    brandPersonality: 'Intelligent, sleek, authoritative, modern',
    primaryCTA: 'Start 14-Day Free Trial',
    existingColors: '#090d16 (Obsidian), #14b8a6 (Teal)',
    referenceWebsiteUrl: 'https://v0.dev',
    uploadedLogoName: null
  });

  // Design References State (Card 05)
  const [designReferences, setDesignReferences] = useState<DesignReferenceItem[]>([
    {
      id: 'ref-default-1',
      title: 'Stripe Landing Grid & Card Shadows',
      url: 'https://stripe.com',
      notes: 'Clean typography hierarchy and elevated cards',
      influenceAreas: ['Layout', 'Overall Style']
    }
  ]);

  // Responsive Requirements State (Card 06)
  const [responsiveReq, setResponsiveReq] = useState<ResponsiveReqState>({
    targetDevices: ['Desktop', 'Tablet', 'Mobile'],
    responsiveFirst: true,
    mobileNavStyle: 'Drawer',
    mobileSpacingPriority: 'Balanced'
  });

  // Technical Stack State (Card 07)
  const [techStack, setTechStack] = useState<TechnicalStackState>({
    framework: 'React',
    useTypeScript: true,
    styling: 'Tailwind',
    componentArchitecture: 'Modular',
    accessibilityLevel: 'WCAG 2.1 AA',
    seoPriority: true,
    performancePriority: true,
    browserCompat: true
  });

  // AI Build Rules State (Card 08)
  const [buildRules, setBuildRules] = useState<AIBuildRulesState>({
    rules: DEFAULT_AI_RULES,
    customInstructions: 'Use Lucide React icons exclusively. Implement sticky top navigation with blur backdrop.'
  });

  // Advanced State
  const [advancedState, setAdvancedState] = useState<AdvancedGeneratorState>({
    promptMode: 'Detailed',
    websiteGoal: 'Launch a SaaS',
    uxPriority: 'Conversion',
    contentDirection: 'Marketing Focused',
    selectedFeatures: ['Contact Form', 'Pricing', 'Testimonials', 'FAQ'],
    techStack: 'No Preference',
    buildTarget: 'Antigravity',
    outputStyle: 'Complete Master Prompt',
    advancedOptions: {
      accessibility: true,
      seo: true,
      performance: true,
      responsive: true,
      animation: true,
      browserCompat: true
    }
  });

  // Result View Section Toggles State
  const [sectionToggles, setSectionToggles] = useState<SectionToggles>({
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
  });

  // Prompt Content State
  const [promptContent, setPromptContent] = useState<string>('');

  // Router State
  const [pathname, setPathname] = useState<string>(() => window.location.pathname);

  // Sync pathname on popstate (Back/Forward browser buttons)
  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    setPathname(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync Theme with root html element class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Auth & Route Sync Effect
  useEffect(() => {
    if (!loading) {
      if (session && (pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password')) {
        // Successful auth -> redirect to protected workspace
        navigate('/workspace');
      } else if (!session && (pathname === '/workspace' || pathname.startsWith('/workspace/'))) {
        // Unauthenticated user attempting to access protected workspace -> redirect to /login
        navigate('/login');
      }
    }
  }, [loading, session, pathname]);

  // Fetch real user data from Supabase DB when authenticated
  useEffect(() => {
    if (session) {
      fetchSavedPromptsFromDb().then((dbPrompts) => {
        if (dbPrompts && dbPrompts.length > 0) {
          setSavedPrompts(dbPrompts);
        }
      });
      fetchFavoritesFromDb().then((dbFavs) => {
        if (dbFavs && dbFavs.length >= 0) {
          setFavoriteIds(dbFavs);
        }
      });
    }
  }, [session]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // 1. Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-surface-gradient flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-4 animate-fadeIn">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-500 flex items-center justify-center shadow-teal-glow">
            <Loader2 className="w-6 h-6 animate-spin text-brand-500" />
          </div>
          <span className="text-xs font-semibold text-theme-secondary tracking-wide">
            Verifying Supabase session...
          </span>
        </div>
      </div>
    );
  }

  // 2. PUBLIC HOMEPAGE ROUTE (/)
  if (pathname === '/') {
    return (
      <PublicLanding 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        onNavigate={navigate}
      />
    );
  }

  // 3. AUTH ROUTES (/login, /signup, /forgot-password)
  if (pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password') {
    if (session) {
      // Authenticated users go to workspace
      return (
        <div className="min-h-screen bg-surface-gradient flex flex-col items-center justify-center p-4">
          <div className="flex flex-col items-center space-y-4 animate-fadeIn">
            <Loader2 className="w-6 h-6 animate-spin text-brand-500" />
            <span className="text-xs font-semibold text-theme-secondary">Redirecting to workspace...</span>
          </div>
        </div>
      );
    }

    const authMode = pathname === '/signup' ? 'signup' : pathname === '/forgot-password' ? 'forgot-password' : 'login';
    return (
      <AuthScreen 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        initialMode={authMode} 
        onNavigate={navigate} 
      />
    );
  }

  // 4. PROTECTED ROUTE GUARD (/workspace or fallback)
  if (!session) {
    // Unauthenticated user attempting to access workspace -> redirect to login
    return (
      <AuthScreen 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        initialMode="login" 
        onNavigate={navigate} 
      />
    );
  }

  // Toggle favorite ID in storage & Supabase DB
  const handleToggleFavorite = async (id: string) => {
    const updatedLocal = toggleFavoriteId(id);
    const wasAdded = updatedLocal.includes(id);
    setFavoriteIds(updatedLocal);
    showToast(wasAdded ? 'Saved to favorites!' : 'Removed from favorites');

    if (session) {
      const dbFavs = await toggleFavoriteInDb(id);
      if (dbFavs) {
        setFavoriteIds(dbFavs);
      }
    }
  };

  // Handle Idea Text input change
  const handleIdeaChange = (val: string) => {
    setIdeaText(val);
    if (val.trim()) {
      setValidationError(null);
    }
  };

  const handleSelectIdeaFromModal = (text: string) => {
    setIdeaText(text);
    setValidationError(null);
    showToast('Example idea loaded into textarea!');
  };

  const handleApplyTemplate = (tpl: TemplateItem) => {
    setProjectDetails({
      websiteType: tpl.type,
      visualStyle: tpl.style,
      targetAudience: 'Target customers and industry leads',
      selectedPages: tpl.pages
    });
    setCreativeDirection({
      colorTheme: tpl.theme,
      typography: tpl.typography,
      layout: tpl.layout,
      animation: tpl.animation
    });
    setActiveTab('generator');
    setViewMode('form');
    showToast(`Applied "${tpl.name}" template to generator!`);
  };

  const handleUsePromptFromExamples = (text: string) => {
    setIdeaText(text);
    setValidationError(null);
    setActiveTab('generator');
    setViewMode('form');
    showToast('Example prompt inserted into generator!');
  };

  // Apply Quick Preset
  const handleApplyPreset = (
    project: Partial<ProjectDetailsState>,
    creative: Partial<CreativeDirectionState>,
    advanced: Partial<AdvancedGeneratorState>
  ) => {
    setProjectDetails((prev) => ({ ...prev, ...project }));
    setCreativeDirection((prev) => ({ ...prev, ...creative }));
    setAdvancedState((prev) => ({ ...prev, ...advanced }));
    showToast('Applied preset configuration!');
  };

  // Reset All Options
  const handleResetAll = () => {
    setIdeaText('');
    setProjectDetails({
      websiteType: 'SaaS',
      visualStyle: 'Modern',
      targetAudience: '',
      selectedPages: ['Hero', 'Features', 'Pricing', 'Contact', 'Footer']
    });
    setCreativeDirection({
      colorTheme: 'Dark',
      typography: 'Modern',
      layout: 'Minimal',
      animation: 'Smooth'
    });
    setBrandContext({
      brandName: '',
      industry: '',
      targetLocation: '',
      brandPersonality: '',
      primaryCTA: '',
      existingColors: '',
      referenceWebsiteUrl: '',
      uploadedLogoName: null
    });
    setDesignReferences([]);
    setAdvancedState({
      promptMode: 'Detailed',
      websiteGoal: 'Launch a SaaS',
      uxPriority: 'Conversion',
      contentDirection: 'Marketing Focused',
      selectedFeatures: ['Contact Form', 'Pricing', 'Testimonials', 'FAQ'],
      techStack: 'No Preference',
      buildTarget: 'Antigravity',
      outputStyle: 'Complete Master Prompt',
      advancedOptions: {
        accessibility: true,
        seo: true,
        performance: true,
        responsive: true,
        animation: true,
        browserCompat: true
      }
    });
    setValidationError(null);
    showToast('Configuration reset to defaults');
  };

  // Toggle Feature multi-select
  const handleToggleFeature = (feat: string) => {
    setAdvancedState((prev) => {
      const exists = prev.selectedFeatures.includes(feat);
      return {
        ...prev,
        selectedFeatures: exists
          ? prev.selectedFeatures.filter((f) => f !== feat)
          : [...prev.selectedFeatures, feat]
      };
    });
  };

  // Toggle Section in Result View
  const handleToggleSectionInResult = (key: keyof SectionToggles) => {
    const updatedToggles = { ...sectionToggles, [key]: !sectionToggles[key] };
    setSectionToggles(updatedToggles);
    const regenerated = generateStructuredPrompt(
      ideaText, 
      projectDetails, 
      creativeDirection, 
      advancedState, 
      updatedToggles,
      brandContext,
      designReferences,
      responsiveReq,
      techStack,
      buildRules
    );
    setPromptContent(regenerated);
  };

  // Apply Prompt Result Tone Modifier with real AI
  const handleApplyModifier = async (mod: ResultModifierType) => {
    showToast(`Applying "${mod}" with AI...`);
    const payload = {
      generatorState: {
        ideaText,
        projectDetails,
        creativeDirection,
        brandContext,
        techStack,
        advancedState,
        modifier: mod
      }
    };

    const aiRes = await requestAiGeneration(payload);
    if (aiRes.success && aiRes.result) {
      setPromptContent(aiRes.result);
      showToast(`Applied "${mod}" modifier with AI!`);
    } else {
      const fallback = generateStructuredPrompt(
        ideaText,
        projectDetails,
        creativeDirection,
        advancedState,
        sectionToggles,
        brandContext,
        designReferences,
        responsiveReq,
        techStack,
        buildRules,
        mod
      );
      setPromptContent(fallback);
      showToast(aiRes.error || `Applied "${mod}" modifier`);
    }
  };

  // Trigger Step 2 Review Modal
  const handleOpenReviewModal = () => {
    if (!ideaText.trim()) {
      setValidationError('Tell us what you want to build first.');
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    setValidationError(null);
    setIsReviewModalOpen(true);
  };

  // Confirm Generation from Review Modal — connects to real server-side AI endpoint
  const handleConfirmGenerate = async () => {
    setViewMode('transition');

    const payload = {
      generatorState: {
        ideaText,
        projectDetails,
        creativeDirection,
        brandContext,
        techStack,
        advancedState
      }
    };

    const aiRes = await requestAiGeneration(payload);

    let generatedText = '';
    if (aiRes.success && aiRes.result) {
      generatedText = aiRes.result;
    } else {
      console.warn('AI endpoint error:', aiRes.error);
      showToast(aiRes.error || 'Server error. Generated fallback website specification.');
      generatedText = generateStructuredPrompt(
        ideaText, 
        projectDetails, 
        creativeDirection, 
        advancedState, 
        sectionToggles,
        brandContext,
        designReferences,
        responsiveReq,
        techStack,
        buildRules
      );
    }

    setPromptContent(generatedText);

    // Save prompt to local storage history
    const newSavedPrompt: SavedPromptItem = {
      id: `prompt-${Date.now()}`,
      title: `${brandContext.brandName || projectDetails.websiteType} — ${projectDetails.visualStyle} Website`,
      text: generatedText,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      websiteType: projectDetails.websiteType,
      visualStyle: projectDetails.visualStyle,
      creativeDirection: { ...creativeDirection }
    };

    const updatedPrompts = savePrompt(newSavedPrompt);
    setSavedPrompts(updatedPrompts);

    if (session) {
      savePromptToDb(newSavedPrompt, payload.generatorState).then((dbSaved) => {
        if (dbSaved) {
          setSavedPrompts((prev) => [dbSaved, ...prev.filter((p) => p.id !== dbSaved.id)]);
        }
      });
    }

    setViewMode('result');
    showToast('AI website prompt generated successfully!');
  };

  const handleDeletePrompt = (id: string) => {
    const updated = deleteSavedPrompt(id);
    setSavedPrompts(updated);
    if (session) {
      deletePromptFromDb(id);
    }
    showToast('Prompt deleted');
  };

  const handleStartOver = () => {
    setViewMode('form');
  };

  return (
    <div className="min-h-screen bg-bg text-text transition-colors duration-300 flex relative">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'generator' && viewMode === 'transition') {
            setViewMode('form');
          }
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Workspace Wrapper */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Minimal Top Navigation */}
        <TopBar
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
          activeTab={activeTab}
        />

        {/* Main Body Content View Router */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto w-full">
          {activeTab === 'generator' && (
            <>
              {/* 1. Generator Form Mode */}
              {viewMode === 'form' && (
                <div className="space-y-8 animate-fadeIn">
                  {/* Hero Section */}
                  <GeneratorHero />

                  {/* Main Workspace Suite */}
                  <div className="space-y-6 max-w-4xl mx-auto">
                    {/* Quick Presets & Reset */}
                    <QuickPresets
                      onApplyPreset={handleApplyPreset}
                      onResetAll={handleResetAll}
                    />

                    {/* Prompt Readiness System */}
                    <PromptReadiness
                      ideaText={ideaText}
                      projectDetails={projectDetails}
                      creativeDirection={creativeDirection}
                      brandContext={brandContext}
                      designReferences={designReferences}
                      responsiveReq={responsiveReq}
                    />

                    {/* Live Project Summary Panel */}
                    <LiveProjectSummary
                      ideaText={ideaText}
                      projectDetails={projectDetails}
                      creativeDirection={creativeDirection}
                      advancedState={advancedState}
                    />

                    {/* Card 01: Your Website Idea */}
                    <IdeaInput
                      value={ideaText}
                      onChange={handleIdeaChange}
                      onOpenIdeasModal={() => setIsSampleModalOpen(true)}
                      validationError={validationError}
                    />

                    {/* Card 02: Project Details */}
                    <ProjectDetails
                      details={projectDetails}
                      onChange={setProjectDetails}
                    />

                    {/* Card 03: Creative Direction */}
                    <CreativeDirection
                      direction={creativeDirection}
                      onChange={setCreativeDirection}
                    />

                    {/* Card 04: Brand & Project Context */}
                    <BrandContext
                      context={brandContext}
                      onChange={setBrandContext}
                    />

                    {/* Card 05: Design References & Inspiration */}
                    <DesignReferences
                      references={designReferences}
                      onChange={setDesignReferences}
                    />

                    {/* Card 06: Responsive & Mobile Requirements */}
                    <ResponsiveRequirements
                      responsive={responsiveReq}
                      onChange={setResponsiveReq}
                    />

                    {/* Card 07: Technical Stack & Implementation */}
                    <TechnicalStack
                      stack={techStack}
                      onChange={setTechStack}
                    />

                    {/* Card 08: AI Behavior & Build Rules */}
                    <AIBuildRules
                      buildRules={buildRules}
                      onChange={setBuildRules}
                    />

                    {/* Prompt Mode Selector */}
                    <PromptModeSelector
                      value={advancedState.promptMode}
                      onChange={(mode) => setAdvancedState((prev) => ({ ...prev, promptMode: mode }))}
                    />

                    {/* Website Goal Selector */}
                    <GoalSelector
                      value={advancedState.websiteGoal}
                      onChange={(goal) => setAdvancedState((prev) => ({ ...prev, websiteGoal: goal }))}
                    />

                    {/* UX Priority & Content Direction */}
                    <UXPrioritySelector
                      uxPriority={advancedState.uxPriority}
                      onUXPriorityChange={(val) => setAdvancedState((prev) => ({ ...prev, uxPriority: val }))}
                      contentDirection={advancedState.contentDirection}
                      onContentDirectionChange={(val) => setAdvancedState((prev) => ({ ...prev, contentDirection: val }))}
                    />

                    {/* Website Features & Tech Stack */}
                    <FeatureSelector
                      selectedFeatures={advancedState.selectedFeatures}
                      onToggleFeature={handleToggleFeature}
                      techStack={advancedState.techStack}
                      onTechStackChange={(val) => setAdvancedState((prev) => ({ ...prev, techStack: val }))}
                      buildTarget={advancedState.buildTarget}
                      onBuildTargetChange={(val) => setAdvancedState((prev) => ({ ...prev, buildTarget: val }))}
                      outputStyle={advancedState.outputStyle}
                      onOutputStyleChange={(val) => setAdvancedState((prev) => ({ ...prev, outputStyle: val }))}
                    />

                    {/* Collapsible Advanced Options */}
                    <AdvancedOptions
                      options={advancedState.advancedOptions}
                      onChange={(opt) => setAdvancedState((prev) => ({ ...prev, advancedOptions: opt }))}
                    />

                    {/* Primary CTA (Triggers Review Modal) */}
                    <GenerateButton
                      onGenerate={handleOpenReviewModal}
                      isDisabled={false}
                    />
                  </div>
                </div>
              )}

              {/* 2. Transition State */}
              {viewMode === 'transition' && (
                <div className="py-24 text-center space-y-4 max-w-md mx-auto animate-pulse-subtle">
                  <div className="w-14 h-14 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center mx-auto shadow-teal-glow">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h2 className="text-lg font-extrabold text-theme-primary">
                    Preparing your website prompt...
                  </h2>
                  <p className="text-xs text-theme-secondary">
                    Formatting project details and creative direction into structured sections.
                  </p>
                </div>
              )}

              {/* 3. Prompt Result Screen Mode */}
              {viewMode === 'result' && (
                <PromptResult
                  ideaText={ideaText}
                  projectDetails={projectDetails}
                  creativeDirection={creativeDirection}
                  brandContext={brandContext}
                  advancedState={advancedState}
                  promptContent={promptContent}
                  sectionToggles={sectionToggles}
                  onToggleSection={handleToggleSectionInResult}
                  onApplyModifier={handleApplyModifier}
                  onUpdatePromptContent={setPromptContent}
                  onStartOver={handleStartOver}
                />
              )}
            </>
          )}

          {activeTab === 'my-prompts' && (
            <MyPromptsView
              savedPrompts={savedPrompts}
              onDeletePrompt={handleDeletePrompt}
              onNewPromptClick={() => { setActiveTab('generator'); setViewMode('form'); }}
            />
          )}

          {activeTab === 'examples' && (
            <ExamplesView
              onUsePrompt={handleUsePromptFromExamples}
              favoriteIds={favoriteIds}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {activeTab === 'templates' && (
            <TemplatesView
              onSelectTemplate={handleApplyTemplate}
              favoriteIds={favoriteIds}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {activeTab === 'how-it-works' && (
            <HowItWorksView />
          )}

          {activeTab === 'favorites' && (
            <FavoritesView
              favoriteIds={favoriteIds}
              onToggleFavorite={handleToggleFavorite}
              onSelectTemplate={handleApplyTemplate}
              onUsePrompt={handleUsePromptFromExamples}
              onExploreClick={() => setActiveTab('templates')}
            />
          )}
        </main>

        {/* Minimal Footer */}
        <footer className="border-t border-theme py-4 px-6 text-center text-xs text-theme-muted">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>Website Prompt Generator • Complete Professional Prompt Engine Architecture</span>
            <span className="font-semibold text-brand-500">Design System Final V6.0</span>
          </div>
        </footer>
      </div>

      {/* Preset Ideas Modal */}
      <SampleIdeasModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
        onSelectIdea={handleSelectIdeaFromModal}
      />

      {/* Step 2 Configuration Review Modal */}
      <ConfigurationReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onConfirmGenerate={handleConfirmGenerate}
        ideaText={ideaText}
        projectDetails={projectDetails}
        creativeDirection={creativeDirection}
        brandContext={brandContext}
        techStack={techStack}
        advancedState={advancedState}
      />

      {/* Action Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

export default App;
