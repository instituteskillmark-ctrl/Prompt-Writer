/// <reference types="node" />
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { createClient } from '@supabase/supabase-js';

// In-memory rate limiting map as fallback (userId -> timestamps[])
const userRequestLogs = new Map<string, number[]>();

export interface ProductionGeneratePayload {
  ideaText?: string;
  projectDetails?: {
    websiteType?: string;
    visualStyle?: string;
    targetAudience?: string;
    selectedPages?: string[];
  };
  creativeDirection?: {
    colorTheme?: string;
    typography?: string;
    layout?: string;
    animation?: string;
  };
  brandContext?: {
    brandName?: string;
    industry?: string;
    targetLocation?: string;
    brandPersonality?: string;
    primaryCTA?: string;
    existingColors?: string;
    referenceWebsiteUrl?: string;
  };
  techStack?: {
    framework?: string;
    useTypeScript?: boolean;
    styling?: string;
    componentArchitecture?: string;
    accessibilityLevel?: string;
  };
  advancedState?: {
    promptMode?: string;
    websiteGoal?: string;
    uxPriority?: string;
    contentDirection?: string;
    selectedFeatures?: string[];
    buildTarget?: string;
    outputStyle?: string;
  };
  modifier?: string;
}

/**
 * Constructs a comprehensive 17-section AI prompt specification server-side.
 */
export function buildProductionAiInstruction(payload: ProductionGeneratePayload): string {
  const idea = payload.ideaText?.trim() || 'A high-converting, modern digital web application.';
  const type = payload.projectDetails?.websiteType || 'SaaS';
  const visualStyle = payload.projectDetails?.visualStyle || 'Modern';
  const audience = payload.projectDetails?.targetAudience || 'Tech-savvy users and industry leads';
  const pages = payload.projectDetails?.selectedPages?.join(', ') || 'Hero, Features, Pricing, Testimonials, Contact, Footer';
  
  const colorTheme = payload.creativeDirection?.colorTheme || 'Dark';
  const typography = payload.creativeDirection?.typography || 'Modern';
  const layout = payload.creativeDirection?.layout || 'Minimal';
  const animation = payload.creativeDirection?.animation || 'Smooth';

  const brandName = payload.brandContext?.brandName || 'Digital Studio';
  const industry = payload.brandContext?.industry || 'Technology & Digital Services';
  const brandPersonality = payload.brandContext?.brandPersonality || 'Sleek, authoritative, intelligent, modern';
  const primaryCTA = payload.brandContext?.primaryCTA || 'Get Started Now';
  const existingColors = payload.brandContext?.existingColors || 'Dark obsidian foundation with vibrant Teal accents';
  const refUrl = payload.brandContext?.referenceWebsiteUrl || '';

  const framework = payload.techStack?.framework || 'React';
  const isTS = payload.techStack?.useTypeScript !== false;
  const styling = payload.techStack?.styling || 'Tailwind CSS';
  const arch = payload.techStack?.componentArchitecture || 'Modular';
  const accLevel = payload.techStack?.accessibilityLevel || 'WCAG 2.1 AA';

  const promptMode = payload.advancedState?.promptMode || 'Detailed';
  const goal = payload.advancedState?.websiteGoal || 'Launch a SaaS & Convert Visitors';
  const uxPriority = payload.advancedState?.uxPriority || 'Conversion & Usability';
  const contentDirection = payload.advancedState?.contentDirection || 'Marketing & Value Proposition Focused';
  const features = payload.advancedState?.selectedFeatures?.join(', ') || 'Contact Form, Pricing Calculator, Testimonials, FAQ, Navigation Drawer';
  const buildTarget = payload.advancedState?.buildTarget || 'Antigravity / AI Code Generator';
  const outputStyle = payload.advancedState?.outputStyle || 'Complete Master Specification';

  const modifierNote = payload.modifier ? `\n[Tone & Improvement Modifier: ${payload.modifier}]` : '';

  return `Construct a 17-part Master Website Specification Prompt for an AI Code Generator to build the following web application:

1. PROJECT OBJECTIVE:
- Brand Name: ${brandName}
- Industry: ${industry}
- Website Type: ${type}
- Primary Business Goal: ${goal}
- Primary CTA: ${primaryCTA}
- Output Style: ${outputStyle} (${promptMode} Mode)
- Target Builder Tool: ${buildTarget}

2. BRAND / BUSINESS CONTEXT:
- Vision & Core Idea: ${idea}
- Brand Tone: ${brandPersonality}
- Content Direction: ${contentDirection}
- Palette Preference: ${colorTheme} Mode (${existingColors})
${refUrl ? `- Reference Benchmark: ${refUrl}` : ''}

3. TARGET AUDIENCE:
- Persona: ${audience}
- UX Focus: ${uxPriority}

4. VISUAL DIRECTION:
- Visual Persona: ${visualStyle}
- Layout Architecture: ${layout} grid layout with generous whitespace, crisp structural alignments, and card elevations.

5. COLOR SYSTEM:
- Background: ${colorTheme === 'Dark' ? 'Obsidian deep charcoal (#090d16 / #111726)' : 'Clean crisp slate white (#f8fafc / #ffffff)'}
- Accent Color: Strategic Teal (#14b8a6) used for CTAs, active indicators, and focus states.

6. TYPOGRAPHY:
- Font Hierarchy: ${typography} sans-serif font family (e.g., Plus Jakarta Sans or Inter). Tight heading tracking (-0.02em) and relaxed body line-height (1.6).

7. PAGE / SECTION STRUCTURE:
- Mandatory Pages & Components: ${pages}

8. UI / UX REQUIREMENTS:
- High contrast CTA placement (${primaryCTA})
- Intuitive navigation, interactive inputs with focus rings and error states.

9. FEATURES:
- Required Interactive Features: ${features}

10. ANIMATIONS & INTERACTIONS:
- Motion Profile: ${animation} micro-interactions, smooth hover lifts, and 200–300ms cubic-bezier transitions.

11. RESPONSIVE BEHAVIOR:
- Fully responsive on Desktop (1280px+), Tablet (768px-1024px), and Mobile (<768px). Touch targets 44px+.

12. ACCESSIBILITY:
- WCAG Standard: ${accLevel}. Contrast compliance, aria labels, and focus rings.

13. SEO:
- Semantic HTML5 structure, title tags, meta descriptions, single h1 per page.

14. PERFORMANCE:
- Minimal layout shifts, lightweight CSS transforms and opacity.

15. TECHNICAL STACK:
- Framework: ${framework} (${isTS ? 'TypeScript Strict' : 'JavaScript ES6+'})
- Styling Engine: ${styling}
- Component Architecture: ${arch}

16. AI BUILD RULES:
- Avoid generic low-contrast gray text, enforce crisp visual contrast hierarchy.

17. FINAL IMPLEMENTATION INSTRUCTIONS:
- Deliver clean, production-grade modular code ready to run immediately.
${modifierNote}

Organize the final response into clean numbered sections:
## 01 — PROJECT OBJECTIVE
## 02 — BRAND & BUSINESS CONTEXT
...
## 17 — FINAL IMPLEMENTATION INSTRUCTIONS`;
}

/**
 * Handles POST /api/generate
 */
export async function handleProductionGenerate(req: any, res: any): Promise<void> {
  let bodyStr = '';
  req.on('data', (chunk: any) => { bodyStr += chunk; });

  req.on('end', async () => {
    try {
      // 1. Read Environment Variables
      let supabaseUrl = process.env.VITE_SUPABASE_URL || '';
      let supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
      let apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;

      if (!apiKey || !supabaseUrl || !supabaseAnonKey) {
        try {
          const envLocalPath = path.resolve(process.cwd(), '.env.local');
          if (fs.existsSync(envLocalPath)) {
            const envContent = fs.readFileSync(envLocalPath, 'utf8');
            if (!apiKey) {
              const m = envContent.match(/GEMINI_API_KEY=(.*)/) || envContent.match(/AI_API_KEY=(.*)/);
              if (m && m[1].trim()) apiKey = m[1].trim();
            }
            if (!supabaseUrl) {
              const m = envContent.match(/VITE_SUPABASE_URL=(.*)/);
              if (m && m[1].trim()) supabaseUrl = m[1].trim();
            }
            if (!supabaseAnonKey) {
              const m = envContent.match(/VITE_SUPABASE_ANON_KEY=(.*)/);
              if (m && m[1].trim()) supabaseAnonKey = m[1].trim();
            }
          }
        } catch (e) {
          // ignore
        }
      }

      if (!apiKey) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Server AI configuration error: API key missing.' }));
        return;
      }

      // Clean Supabase URL
      supabaseUrl = supabaseUrl.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
      supabaseAnonKey = supabaseAnonKey.trim();

      // 2. Server Authorization Check (Supabase JWT)
      const authHeader = req.headers['authorization'] || req.headers['x-supabase-auth'] || '';
      const token = authHeader.replace(/^Bearer\s+/i, '').trim();

      let authenticatedUserId = 'anonymous';
      if (supabaseUrl && supabaseAnonKey && token) {
        try {
          const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
          const { data: userData, error: authErr } = await supabaseClient.auth.getUser(token);
          if (!authErr && userData?.user) {
            authenticatedUserId = userData.user.id;
          }
        } catch (e) {
          console.warn('Token verification error:', e);
        }
      }

      // If token was provided but invalid:
      if (token && authenticatedUserId === 'anonymous') {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Invalid or expired authentication session.' }));
        return;
      }

      // 3. Rate Control Protection
      const now = Date.now();
      const windowMs = 10 * 60 * 1000; // 10 minutes
      const maxRequests = 20;

      const userLogs = userRequestLogs.get(authenticatedUserId) || [];
      const recentLogs = userLogs.filter((t) => now - t < windowMs);

      if (recentLogs.length >= maxRequests) {
        res.statusCode = 429;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Rate limit exceeded. Maximum 20 generations per 10 minutes.' }));
        return;
      }

      recentLogs.push(now);
      userRequestLogs.set(authenticatedUserId, recentLogs);

      // 4. Request Validation
      let body: any = {};
      try {
        body = JSON.parse(bodyStr || '{}');
      } catch {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Invalid JSON request payload.' }));
        return;
      }

      const rawPrompt = body.prompt;
      const generatorState = body.generatorState;

      if (!rawPrompt && !generatorState) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Request body must contain generatorState or prompt.' }));
        return;
      }

      // 5. Construct AI Prompt Text
      let promptText = '';
      if (generatorState) {
        promptText = buildProductionAiInstruction(generatorState);
      } else {
        promptText = rawPrompt;
      }

      const systemInstruction = `You are a Senior AI Prompt Architect and Lead UI/UX Engineer.
Your task is to write structured, highly detailed, production-ready MASTER PROMPTS that developers can feed into AI code generators (like Antigravity, Cursor, v0, or Claude) to build high-converting websites and web applications.

Rules for your output:
- Produce a complete, beautifully organized markdown master prompt.
- Structure it into numbered section headers (## 01 — PROJECT OBJECTIVE, ## 02 — BRAND & BUSINESS CONTEXT, etc.).
- Weave all user preferences (brand name, visual style, palette, features, stack) into the specification.
- Output ONLY the generated master prompt specification. Do NOT enclose in meta commentary or conversation wrappers.`;

      // 6. Invoke Gemini REST API
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;

      const apiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemInstruction }],
          },
          contents: [
            {
              parts: [{ text: promptText }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          },
        }),
      });

      if (!apiResponse.ok) {
        const errText = await apiResponse.text();
        console.error('Gemini API Error Status:', apiResponse.status, errText);
        res.statusCode = apiResponse.status >= 500 ? 502 : 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'AI generation service failed. Please try again.' }));
        return;
      }

      const data: any = await apiResponse.json();
      const resultText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!resultText) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'No content returned from AI service.' }));
        return;
      }

      // 7. Log Usage to Supabase if authenticated
      if (authenticatedUserId !== 'anonymous' && supabaseUrl && supabaseAnonKey) {
        try {
          const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
            global: { headers: { Authorization: `Bearer ${token}` } }
          });
          await supabaseClient.from('usage_tracking').insert({
            user_id: authenticatedUserId,
            action: body.modifier ? `improve_${body.modifier}` : 'generate'
          });
        } catch (e) {
          // ignore tracking logging failure
        }
      }

      // 8. Return Clean Response
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        success: true,
        result: resultText,
        timestamp: new Date().toISOString(),
        userId: authenticatedUserId
      }));

    } catch (err: any) {
      console.error('Production AI Handler Error:', err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, error: 'Internal server error processing AI generation.' }));
    }
  });
}
