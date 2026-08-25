/// <reference types="node" />
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

export interface GeneratorStatePayload {
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
 * Builds a clear, detailed user prompt for Gemini based on the generator form state.
 */

export function buildAiPromptFromState(payload: GeneratorStatePayload): string {
  const idea = payload.ideaText?.trim() || 'A high-converting digital web application.';
  const type = payload.projectDetails?.websiteType || 'SaaS';
  const visualStyle = payload.projectDetails?.visualStyle || 'Modern';
  const audience = payload.projectDetails?.targetAudience || 'Target users';
  const pages = payload.projectDetails?.selectedPages?.join(', ') || 'Hero, Features, Pricing, Contact, Footer';
  
  const colorTheme = payload.creativeDirection?.colorTheme || 'Dark';
  const typography = payload.creativeDirection?.typography || 'Modern';
  const layout = payload.creativeDirection?.layout || 'Minimal';
  const animation = payload.creativeDirection?.animation || 'Smooth';

  const brandName = payload.brandContext?.brandName || 'Specified Brand';
  const industry = payload.brandContext?.industry || 'Technology & Digital Services';
  const brandPersonality = payload.brandContext?.brandPersonality || 'Professional, modern, trustworthy';
  const primaryCTA = payload.brandContext?.primaryCTA || 'Get Started';
  const existingColors = payload.brandContext?.existingColors || 'Dark background with vibrant teal accents';
  const refUrl = payload.brandContext?.referenceWebsiteUrl || '';

  const framework = payload.techStack?.framework || 'React';
  const isTS = payload.techStack?.useTypeScript !== false;
  const styling = payload.techStack?.styling || 'Tailwind CSS';
  const arch = payload.techStack?.componentArchitecture || 'Modular';
  const accLevel = payload.techStack?.accessibilityLevel || 'WCAG 2.1 AA';

  const promptMode = payload.advancedState?.promptMode || 'Detailed';
  const goal = payload.advancedState?.websiteGoal || 'Increase Conversions & User Engagement';
  const uxPriority = payload.advancedState?.uxPriority || 'Conversion & Usability';
  const contentDirection = payload.advancedState?.contentDirection || 'Marketing & Value Proposition Focused';
  const features = payload.advancedState?.selectedFeatures?.join(', ') || 'Hero, Interactive Features, Pricing, Testimonials, FAQ, Contact Form';
  const buildTarget = payload.advancedState?.buildTarget || 'Antigravity / AI Assistant';
  const outputStyle = payload.advancedState?.outputStyle || 'Complete Master Specification';

  const modifierNote = payload.modifier ? `\n[Tone & Improvement Instruction: ${payload.modifier}]` : '';

  return `Generate a comprehensive, production-ready Master Prompt for an AI Code Generator to build the following website:

Project Name: ${brandName}
Industry: ${industry}
Website Type: ${type} (Visual Persona: ${visualStyle})
Prompt Mode: ${promptMode}
Core Vision & Idea: ${idea}
Primary Business Goal: ${goal}
Target Audience: ${audience}
Brand Personality: ${brandPersonality}
Primary CTA: ${primaryCTA}
Color Palette & Preferences: ${colorTheme} mode foundation. (${existingColors})
Typography Style: ${typography}
Layout Style: ${layout}
Animation Level: ${animation}
Pages & Sections: ${pages}
Key Features: ${features}
UX Focus: ${uxPriority}
Content Direction: ${contentDirection}
Reference Benchmark: ${refUrl || 'N/A'}
Technical Framework: ${framework} (${isTS ? 'TypeScript' : 'JavaScript'}), ${styling}, ${arch} components
Accessibility Goal: ${accLevel}
Target Output Tool: ${buildTarget} (${outputStyle})
${modifierNote}

Format the resulting prompt with numbered section headers (Role & Objective, Brand Context, Visual & UI Design, Color System, Page Structure, Features, Technical Architecture) so it is ready to copy and paste into an AI builder.`;
}

/**
 * Handles incoming POST requests to /api/ai/test
 */
export async function handleAiTestRequest(req: any, res: any): Promise<void> {
  let bodyStr = '';
  req.on('data', (chunk: any) => {
    bodyStr += chunk;
  });

  req.on('end', async () => {
    try {
      let body: any = {};
      try {
        body = JSON.parse(bodyStr || '{}');
      } catch {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Invalid JSON body.' }));
        return;
      }

      const rawPrompt = body.prompt;
      const generatorState = body.generatorState;

      // 1. Input Validation
      if (rawPrompt === undefined && !generatorState) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Request must contain a non-empty prompt string or generatorState object.' }));
        return;
      }

      if (rawPrompt !== undefined) {
        if (typeof rawPrompt !== 'string' || !rawPrompt.trim()) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: 'Prompt must be a non-empty string.' }));
          return;
        }
      }

      // 2. Load API key server-side only
      let apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;
      if (!apiKey) {
        try {
          const envLocalPath = path.resolve(process.cwd(), '.env.local');
          if (fs.existsSync(envLocalPath)) {
            const envContent = fs.readFileSync(envLocalPath, 'utf8');
            const match = envContent.match(/GEMINI_API_KEY=(.*)/) || envContent.match(/AI_API_KEY=(.*)/);
            if (match && match[1].trim()) {
              apiKey = match[1].trim();
            }
          }
        } catch (e) {
          // ignore read error
        }
      }

      if (!apiKey) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Server AI configuration missing: API key is not configured.' }));
        return;
      }

      // 3. Construct prompt text
      let promptText = '';
      if (generatorState) {
        promptText = buildAiPromptFromState(generatorState);
      } else {
        promptText = rawPrompt;
      }

      const systemInstruction = `You are a master AI Prompt Architect and Senior UI/UX Architect.
Your role is to write structured, highly detailed, production-grade MASTER PROMPTS that developers can feed into AI code generators (like Antigravity, Cursor, v0, or Claude) to build high-converting websites and web applications.

Rules for your output:
- Produce a complete, beautifully organized markdown master prompt.
- Use numbered section headers (e.g. ## 01 — ROLE & STRATEGIC OBJECTIVE, ## 02 — CONCEPT & BRAND CONTEXT, etc.).
- Ensure all parameters from the user's input (brand name, industry, colors, visual style, pages, features, stack) are woven into the prompt cleanly.
- Output ONLY the generated master prompt specification. Do NOT enclose in meta commentary or conversation wrappers.`;

      // 4. Call Gemini REST API
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
        const errorText = await apiResponse.text();
        console.error('Gemini API Error Status:', apiResponse.status, errorText);
        res.statusCode = apiResponse.status >= 500 ? 502 : 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'AI provider error. Failed to generate content.' }));
        return;
      }

      const data: any = await apiResponse.json();
      const resultText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!resultText) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'No content returned from AI provider.' }));
        return;
      }

      // 5. Success Return
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        success: true,
        result: resultText,
      }));

    } catch (err: any) {
      console.error('Server AI Handler Error:', err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, error: 'Internal server error processing AI request.' }));
    }
  });
}
