export interface SavedPromptItem {
  id: string;
  title: string;
  text: string;
  date: string;
  websiteType: string;
  visualStyle: string;
  creativeDirection: {
    colorTheme: string;
    typography: string;
    layout: string;
    animation: string;
  };
}

const STORAGE_PROMPTS_KEY = 'wpg_saved_prompts';
const STORAGE_FAVORITES_KEY = 'wpg_favorite_ids';

export function getSavedPrompts(): SavedPromptItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_PROMPTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePrompt(prompt: SavedPromptItem): SavedPromptItem[] {
  try {
    const current = getSavedPrompts();
    const updated = [prompt, ...current.filter((p) => p.id !== prompt.id)];
    localStorage.setItem(STORAGE_PROMPTS_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function deleteSavedPrompt(id: string): SavedPromptItem[] {
  try {
    const current = getSavedPrompts();
    const updated = current.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_PROMPTS_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function getFavoriteIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleFavoriteId(id: string): string[] {
  try {
    const current = getFavoriteIds();
    const isFav = current.includes(id);
    let updated: string[];
    if (isFav) {
      updated = current.filter((fav) => fav !== id);
    } else {
      updated = [...current, id];
    }
    localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function isFavorite(id: string): boolean {
  return getFavoriteIds().includes(id);
}
