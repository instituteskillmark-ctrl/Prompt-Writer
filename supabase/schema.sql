-- ============================================================================
-- SUPABASE DATABASE SCHEMA — WEBSITE PROMPT GENERATOR
-- ============================================================================

-- 1. SAVED PROMPTS TABLE
CREATE TABLE IF NOT EXISTS public.saved_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  original_idea TEXT NOT NULL,
  configuration JSONB DEFAULT '{}'::jsonb,
  generated_prompt TEXT NOT NULL,
  prompt_mode TEXT DEFAULT 'Detailed',
  output_style TEXT DEFAULT 'Complete Master Specification',
  website_type TEXT DEFAULT 'SaaS',
  visual_style TEXT DEFAULT 'Modern',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast user prompt lookups
CREATE INDEX IF NOT EXISTS idx_saved_prompts_user_id ON public.saved_prompts(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_prompts_created_at ON public.saved_prompts(created_at DESC);

-- Enable RLS
ALTER TABLE public.saved_prompts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for saved_prompts
CREATE POLICY "Users can view their own saved prompts"
  ON public.saved_prompts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved prompts"
  ON public.saved_prompts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved prompts"
  ON public.saved_prompts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved prompts"
  ON public.saved_prompts FOR DELETE
  USING (auth.uid() = user_id);


-- 2. PROMPT FAVORITES TABLE
CREATE TABLE IF NOT EXISTS public.prompt_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT unique_user_favorite UNIQUE(user_id, prompt_id)
);

CREATE INDEX IF NOT EXISTS idx_prompt_favorites_user_id ON public.prompt_favorites(user_id);

-- Enable RLS
ALTER TABLE public.prompt_favorites ENABLE ROW LEVEL SECURITY;

-- RLS Policies for prompt_favorites
CREATE POLICY "Users can view their own favorites"
  ON public.prompt_favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites"
  ON public.prompt_favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
  ON public.prompt_favorites FOR DELETE
  USING (auth.uid() = user_id);


-- 3. USAGE TRACKING TABLE
CREATE TABLE IF NOT EXISTS public.usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL DEFAULT 'generate',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_usage_tracking_user_id ON public.usage_tracking(user_id, created_at DESC);

-- Enable RLS
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;

-- RLS Policies for usage_tracking
CREATE POLICY "Users can view their own usage records"
  ON public.usage_tracking FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own usage records"
  ON public.usage_tracking FOR INSERT
  WITH CHECK (auth.uid() = user_id);
