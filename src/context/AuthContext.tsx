import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  signUp: (email: string, password: string) => Promise<{ data: any; error: any }>;
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ data: any; error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const isConfigured = isSupabaseConfigured();

  useEffect(() => {
    let mounted = true;

    // Fetch initial session
    const initAuth = async () => {
      try {
        if (isConfigured) {
          const { data, error } = await supabase.auth.getSession();
          if (!error && mounted) {
            setSession(data.session);
            setUser(data.session?.user ?? null);
          }
        }
      } catch (err) {
        console.error('Failed to get Supabase session:', err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initAuth();

    // Listen for auth state changes
    let subscription: any = null;
    if (isConfigured) {
      const { data } = supabase.auth.onAuthStateChange((_event, currentSession) => {
        if (mounted) {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          setLoading(false);
        }
      });
      subscription = data.subscription;
    } else {
      setLoading(false);
    }

    return () => {
      mounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [isConfigured]);

  const signUp = async (email: string, password: string) => {
    return await supabase.auth.signUp({
      email,
      password,
    });
  };

  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  const signOut = async () => {
    const result = await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    return result;
  };

  const resetPassword = async (email: string) => {
    const redirectTo = window.location.origin;
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isConfigured,
        signUp,
        signIn,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
