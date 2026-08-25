import { supabase, isSupabaseConfigured } from './supabase';
import type { SavedPromptItem } from '../utils/storage';

/**
 * Fetches user's saved prompts from real Supabase database table.
 */
export async function fetchSavedPromptsFromDb(): Promise<SavedPromptItem[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session?.user) return [];

    const { data, error } = await supabase
      .from('saved_prompts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase DB fetch error:', error.message);
      return [];
    }

    return (data || []).map((row: any) => ({
      id: row.id,
      title: row.title,
      text: row.generated_prompt,
      date: new Date(row.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      websiteType: row.website_type || 'SaaS',
      visualStyle: row.visual_style || 'Modern',
      creativeDirection: row.configuration?.creativeDirection || {
        colorTheme: 'Dark',
        typography: 'Modern',
        layout: 'Minimal',
        animation: 'Smooth',
      },
    }));
  } catch (err) {
    console.error('Error fetching prompts from Supabase DB:', err);
    return [];
  }
}

/**
 * Saves a prompt to the real Supabase database table.
 */
export async function savePromptToDb(item: SavedPromptItem, payloadConfig?: any): Promise<SavedPromptItem | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;
    if (!user) return null;

    const row = {
      user_id: user.id,
      title: item.title,
      original_idea: payloadConfig?.ideaText || item.title,
      configuration: payloadConfig || {},
      generated_prompt: item.text,
      website_type: item.websiteType,
      visual_style: item.visualStyle,
      prompt_mode: payloadConfig?.advancedState?.promptMode || 'Detailed',
      output_style: payloadConfig?.advancedState?.outputStyle || 'Complete Master Specification',
    };

    const { data, error } = await supabase
      .from('saved_prompts')
      .insert(row)
      .select()
      .single();

    if (error) {
      console.error('Supabase DB insert error:', error.message);
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      text: data.generated_prompt,
      date: new Date(data.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      websiteType: data.website_type || 'SaaS',
      visualStyle: data.visual_style || 'Modern',
      creativeDirection: data.configuration?.creativeDirection || item.creativeDirection,
    };
  } catch (err) {
    console.error('Error saving prompt to Supabase DB:', err);
    return null;
  }
}

/**
 * Updates a saved prompt title in Supabase database.
 */
export async function updatePromptTitleInDb(id: string, newTitle: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  try {
    const { error } = await supabase
      .from('saved_prompts')
      .update({ title: newTitle, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Supabase update title error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error updating title in DB:', err);
    return false;
  }
}

/**
 * Deletes a saved prompt from the Supabase database.
 */
export async function deletePromptFromDb(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  try {
    const { error } = await supabase
      .from('saved_prompts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase DB delete error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error deleting prompt from DB:', err);
    return false;
  }
}

/**
 * Fetches user favorite prompt IDs from Supabase database.
 */
export async function fetchFavoritesFromDb(): Promise<string[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session?.user) return [];

    const { data, error } = await supabase
      .from('prompt_favorites')
      .select('prompt_id');

    if (error) {
      console.warn('Supabase DB fetch favorites error:', error.message);
      return [];
    }

    return (data || []).map((row: any) => row.prompt_id);
  } catch (err) {
    console.error('Error fetching favorites from DB:', err);
    return [];
  }
}

/**
 * Toggles a favorite in Supabase database.
 */
export async function toggleFavoriteInDb(promptId: string): Promise<string[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;
    if (!user) return [];

    const currentFavorites = await fetchFavoritesFromDb();
    const isFav = currentFavorites.includes(promptId);

    if (isFav) {
      await supabase
        .from('prompt_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('prompt_id', promptId);
    } else {
      await supabase
        .from('prompt_favorites')
        .insert({ user_id: user.id, prompt_id: promptId });
    }

    return await fetchFavoritesFromDb();
  } catch (err) {
    console.error('Error toggling favorite in DB:', err);
    return [];
  }
}
