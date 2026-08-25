import React, { useState } from 'react';
import { 
  Zap, 
  Sparkles, 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Loader2, 
  AlertCircle, 
  CheckCircle2,
  ChevronLeft,
  ShieldCheck,
  KeyRound
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from '../ThemeToggle';

interface AuthScreenProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  initialMode?: AuthMode;
  onNavigate?: (path: string) => void;
}

type AuthMode = 'login' | 'signup' | 'forgot-password';

export const AuthScreen: React.FC<AuthScreenProps> = ({ 
  theme, 
  onToggleTheme, 
  initialMode = 'login',
  onNavigate 
}) => {
  const { signIn, signUp, resetPassword } = useAuth();

  const [mode, setMode] = useState<AuthMode>(initialMode);
  
  // Form input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const clearMessagesAndErrors = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setFieldErrors({});
  };

  const switchMode = (newMode: AuthMode) => {
    clearMessagesAndErrors();
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setMode(newMode);
    if (onNavigate) {
      if (newMode === 'login') onNavigate('/login');
      else if (newMode === 'signup') onNavigate('/signup');
      else if (newMode === 'forgot-password') onNavigate('/forgot-password');
    }
  };

  const validateEmail = (val: string) => {
    if (!val.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val.trim())) return 'Please enter a valid email address';
    return null;
  };

  const validatePassword = (val: string) => {
    if (!val) return 'Password is required';
    if (val.length < 6) return 'Password must be at least 6 characters';
    return null;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessagesAndErrors();

    const errors: { [key: string]: string } = {};
    const emailErr = validateEmail(email);
    if (emailErr) errors.email = emailErr;

    if (!password) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signIn(email.trim(), password);
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setErrorMsg('Invalid email or password. Please try again.');
        } else {
          setErrorMsg(error.message || 'Failed to sign in.');
        }
      } else {
        setSuccessMsg('Signed in successfully! Redirecting...');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessagesAndErrors();

    const errors: { [key: string]: string } = {};
    const emailErr = validateEmail(email);
    if (emailErr) errors.email = emailErr;

    const passErr = validatePassword(password);
    if (passErr) errors.password = passErr;

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await signUp(email.trim(), password);
      if (error) {
        const msg = error.message || '';
        if (msg.includes('already registered')) {
          setErrorMsg('An account with this email already exists. Try logging in.');
        } else if (msg.includes('rate limit') || msg.includes('over_email_send_rate_limit')) {
          setErrorMsg('Email rate limit exceeded. Please wait a few minutes or disable email confirmation in Supabase Dashboard.');
        } else if (msg.includes('Failed to fetch') || msg.includes('fetch')) {
          setErrorMsg('Failed to connect to authentication server. Please check your Supabase Environment Variables on Vercel.');
        } else {
          setErrorMsg(msg || 'Failed to sign up.');
        }
      } else {
        if (data?.session) {
          setSuccessMsg('Account created successfully! Redirecting to workspace...');
        } else {
          setSuccessMsg('Account created! Please check your email to confirm your sign up.');
        }
      }
    } catch (err: any) {
      const msg = err?.message || '';
      if (msg.includes('Failed to fetch') || msg.includes('fetch')) {
        setErrorMsg('Failed to connect to authentication server. Please check your Supabase Environment Variables on Vercel.');
      } else {
        setErrorMsg(msg || 'An unexpected error occurred during sign up.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessagesAndErrors();

    const errors: { [key: string]: string } = {};
    const emailErr = validateEmail(email);
    if (emailErr) errors.email = emailErr;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await resetPassword(email.trim());
      if (error) {
        setErrorMsg(error.message || 'Failed to send password reset email.');
      } else {
        setSuccessMsg('Password reset link sent! Check your inbox to reset your password.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while sending reset email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-gradient flex flex-col justify-between selection:bg-brand-500/30 selection:text-brand-400 font-sans transition-colors duration-300">
      
      {/* Top Header Bar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10">
        <div 
          onClick={() => onNavigate?.('/')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-teal-glow text-white transition-transform duration-300 group-hover:scale-105">
            <Zap className="w-5 h-5 fill-current text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-extrabold tracking-widest text-theme-primary uppercase leading-none">
              WEBSITE
            </span>
            <span className="text-xs font-semibold tracking-widest text-brand-500 uppercase leading-tight mt-1">
              PROMPT GENERATOR
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} variant="compact" />
        </div>
      </header>

      {/* Main Authentication Card Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 z-10">
        <div className="w-full max-w-md animate-fadeIn">
          
          {/* Card Wrapper */}
          <div className="bg-surface border border-theme rounded-2xl p-6 sm:p-8 shadow-card hover:shadow-card-hover transition-all duration-300 relative overflow-hidden backdrop-blur-xl">
            
            {/* Top Subtle Decorative Teal Accent Glow Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-600 via-teal-400 to-brand-500" />

            {/* Header Content */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-500/10 text-brand-500 mb-4 border border-brand-500/20">
                {mode === 'forgot-password' ? (
                  <KeyRound className="w-6 h-6" />
                ) : mode === 'signup' ? (
                  <Sparkles className="w-6 h-6" />
                ) : (
                  <ShieldCheck className="w-6 h-6" />
                )}
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-theme-primary transition-colors">
                {mode === 'login' && 'Welcome Back'}
                {mode === 'signup' && 'Create Your Account'}
                {mode === 'forgot-password' && 'Reset Password'}
              </h1>
              
              <p className="text-xs text-theme-secondary mt-2 leading-relaxed">
                {mode === 'login' && 'Sign in to access your Website Prompt Generator workspace.'}
                {mode === 'signup' && 'Join now to generate production-ready prompts for web apps.'}
                {mode === 'forgot-password' && "Enter your email address and we'll send you a password reset link."}
              </p>
            </div>

            {/* Global Error Banner */}
            {errorMsg && (
              <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-medium flex items-start space-x-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="flex-1 leading-snug">{errorMsg}</span>
              </div>
            )}

            {/* Global Success Banner */}
            {successMsg && (
              <div className="mb-6 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-medium flex items-start space-x-2.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="flex-1 leading-snug">{successMsg}</span>
              </div>
            )}

            {/* Dynamic Form Area with Smooth Transition */}
            <div className="transition-all duration-300">
              
              {/* LOGIN FORM */}
              {mode === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-4" noValidate>
                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-semibold text-theme-secondary mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-theme-muted">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                        }}
                        placeholder="alex@example.com"
                        className={`w-full pl-10 pr-4 py-2.5 bg-surface-elevated border ${
                          fieldErrors.email ? 'border-rose-500 focus:ring-rose-500/30' : 'border-theme focus:border-brand-500 focus:ring-brand-500/30'
                        } rounded-xl text-xs font-medium text-theme-primary placeholder:text-theme-muted transition-all outline-none focus:ring-2`}
                      />
                    </div>
                    {fieldErrors.email && (
                      <p className="text-[11px] text-rose-500 mt-1 font-medium">{fieldErrors.email}</p>
                    )}
                  </div>

                  {/* Password Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-theme-secondary">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => switchMode('forgot-password')}
                        className="text-xs font-semibold text-brand-500 hover:text-brand-400 transition-colors focus:outline-none"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-theme-muted">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: '' });
                        }}
                        placeholder="••••••••"
                        className={`w-full pl-10 pr-10 py-2.5 bg-surface-elevated border ${
                          fieldErrors.password ? 'border-rose-500 focus:ring-rose-500/30' : 'border-theme focus:border-brand-500 focus:ring-brand-500/30'
                        } rounded-xl text-xs font-medium text-theme-primary placeholder:text-theme-muted transition-all outline-none focus:ring-2`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-theme-muted hover:text-theme-primary transition-colors focus:outline-none"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {fieldErrors.password && (
                      <p className="text-[11px] text-rose-500 mt-1 font-medium">{fieldErrors.password}</p>
                    )}
                  </div>

                  {/* CTA Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-teal-500 text-white text-xs font-bold tracking-wide shadow-teal-glow hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In to Workspace</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* SIGN UP FORM */}
              {mode === 'signup' && (
                <form onSubmit={handleSignUpSubmit} className="space-y-4" noValidate>
                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-semibold text-theme-secondary mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-theme-muted">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                        }}
                        placeholder="alex@example.com"
                        className={`w-full pl-10 pr-4 py-2.5 bg-surface-elevated border ${
                          fieldErrors.email ? 'border-rose-500 focus:ring-rose-500/30' : 'border-theme focus:border-brand-500 focus:ring-brand-500/30'
                        } rounded-xl text-xs font-medium text-theme-primary placeholder:text-theme-muted transition-all outline-none focus:ring-2`}
                      />
                    </div>
                    {fieldErrors.email && (
                      <p className="text-[11px] text-rose-500 mt-1 font-medium">{fieldErrors.email}</p>
                    )}
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-xs font-semibold text-theme-secondary mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-theme-muted">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: '' });
                        }}
                        placeholder="At least 6 characters"
                        className={`w-full pl-10 pr-10 py-2.5 bg-surface-elevated border ${
                          fieldErrors.password ? 'border-rose-500 focus:ring-rose-500/30' : 'border-theme focus:border-brand-500 focus:ring-brand-500/30'
                        } rounded-xl text-xs font-medium text-theme-primary placeholder:text-theme-muted transition-all outline-none focus:ring-2`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-theme-muted hover:text-theme-primary transition-colors focus:outline-none"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {fieldErrors.password && (
                      <p className="text-[11px] text-rose-500 mt-1 font-medium">{fieldErrors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password Input */}
                  <div>
                    <label className="block text-xs font-semibold text-theme-secondary mb-1.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-theme-muted">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (fieldErrors.confirmPassword) setFieldErrors({ ...fieldErrors, confirmPassword: '' });
                        }}
                        placeholder="Re-enter your password"
                        className={`w-full pl-10 pr-10 py-2.5 bg-surface-elevated border ${
                          fieldErrors.confirmPassword ? 'border-rose-500 focus:ring-rose-500/30' : 'border-theme focus:border-brand-500 focus:ring-brand-500/30'
                        } rounded-xl text-xs font-medium text-theme-primary placeholder:text-theme-muted transition-all outline-none focus:ring-2`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-theme-muted hover:text-theme-primary transition-colors focus:outline-none"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {fieldErrors.confirmPassword && (
                      <p className="text-[11px] text-rose-500 mt-1 font-medium">{fieldErrors.confirmPassword}</p>
                    )}
                  </div>

                  {/* CTA Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-teal-500 text-white text-xs font-bold tracking-wide shadow-teal-glow hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Free Account</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* FORGOT PASSWORD FORM */}
              {mode === 'forgot-password' && (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4" noValidate>
                  <div>
                    <label className="block text-xs font-semibold text-theme-secondary mb-1.5">
                      Account Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-theme-muted">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                        }}
                        placeholder="alex@example.com"
                        className={`w-full pl-10 pr-4 py-2.5 bg-surface-elevated border ${
                          fieldErrors.email ? 'border-rose-500 focus:ring-rose-500/30' : 'border-theme focus:border-brand-500 focus:ring-brand-500/30'
                        } rounded-xl text-xs font-medium text-theme-primary placeholder:text-theme-muted transition-all outline-none focus:ring-2`}
                      />
                    </div>
                    {fieldErrors.email && (
                      <p className="text-[11px] text-rose-500 mt-1 font-medium">{fieldErrors.email}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-teal-500 text-white text-xs font-bold tracking-wide shadow-teal-glow hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Sending Link...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Reset Link</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="w-full py-2.5 text-xs font-semibold text-theme-secondary hover:text-theme-primary flex items-center justify-center space-x-1.5 transition-colors focus:outline-none"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back to Sign In</span>
                  </button>
                </form>
              )}

            </div>

            {/* Card Footer Mode Toggle Link */}
            {mode !== 'forgot-password' && (
              <div className="mt-8 pt-6 border-t border-theme text-center">
                <p className="text-xs text-theme-secondary">
                  {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                  <button
                    type="button"
                    onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
                    className="font-bold text-brand-500 hover:text-brand-400 transition-colors underline-offset-4 hover:underline focus:outline-none"
                  >
                    {mode === 'login' ? 'Sign up free' : 'Log in'}
                  </button>
                </p>
              </div>
            )}

          </div>

          {/* Footer Copyright Notice */}
          <p className="text-[11px] text-center text-theme-muted mt-6">
            Protected by Supabase Authentication &bull; Terms & Privacy
          </p>

        </div>
      </main>

      <footer className="py-4 text-center text-xs text-theme-muted z-10" />
    </div>
  );
};
