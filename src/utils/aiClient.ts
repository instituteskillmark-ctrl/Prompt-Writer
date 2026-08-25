import type { ProductionGeneratePayload } from '../../server/aiServer';
import { supabase } from '../lib/supabase';

export interface AiResponse {
  success: boolean;
  result?: string;
  error?: string;
}

/**
 * Sends a POST request to the production AI endpoint /api/generate.
 * Authenticates using Supabase session token in Authorization header.
 * The client browser NEVER receives or exposes the server's GEMINI_API_KEY.
 */
export async function requestAiGeneration(
  payload: { prompt?: string; generatorState?: ProductionGeneratePayload }
): Promise<AiResponse> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Attach user Supabase auth session token if present
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (e) {
      // ignore token fetch error
    }

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        error: data.error || `Server returned error status ${response.status}`,
      };
    }

    return {
      success: true,
      result: data.result,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Network connection failed while calling production AI endpoint.',
    };
  }
}
