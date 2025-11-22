import React, { useState } from 'react';
import { Lock, AlertCircle, Map } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  onBack: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@school.edu') && password.length > 4) {
      onLogin();
    } else {
      setError('Please use a school email and valid password.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-md w-full space-y-8 bg-parchment-50 dark:bg-stone-900 p-10 rounded-2xl shadow-2xl border-4 border-white dark:border-stone-800 transition-colors duration-200 relative overflow-hidden">
        
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-coffee-700 via-amber-600 to-orange-500"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-amber-100 dark:bg-amber-900/20 rounded-full blur-3xl opacity-50"></div>
        
        <div className="text-center relative z-10">
          <div className="mx-auto h-20 w-20 bg-amber-100 dark:bg-stone-800 rounded-full flex items-center justify-center text-amber-700 dark:text-amber-500 mb-6 animate-float border-4 border-white dark:border-stone-700 shadow-lg">
            <Lock className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-map font-black text-coffee-900 dark:text-parchment-50 tracking-tight uppercase">Staff Login</h2>
          <p className="mt-3 text-sm text-coffee-600 dark:text-stone-400 font-medium">
            Please log in to manage items.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="group">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-5 py-4 border-2 border-coffee-200 dark:border-stone-700 placeholder-coffee-400 dark:placeholder-stone-500 text-coffee-900 dark:text-white bg-white dark:bg-stone-800 rounded-xl focus:outline-none focus:ring-0 focus:border-amber-600 dark:focus:border-amber-500 transition-all font-medium"
                placeholder="Credentials (e.g. teacher@school.edu)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="group">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-5 py-4 border-2 border-coffee-200 dark:border-stone-700 placeholder-coffee-400 dark:placeholder-stone-500 text-coffee-900 dark:text-white bg-white dark:bg-stone-800 rounded-xl focus:outline-none focus:ring-0 focus:border-amber-600 dark:focus:border-amber-500 transition-all font-medium"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-700 dark:text-red-300 text-sm bg-red-50 dark:bg-red-900/20 p-4 rounded-lg animate-shake border-l-4 border-red-500">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-amber-700 hover:bg-amber-800 transition-all hover:shadow-lg hover:shadow-amber-900/20 transform hover:-translate-y-0.5 uppercase tracking-wide"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={onBack}
              className="group relative w-full flex justify-center py-3.5 px-4 border-2 border-coffee-200 dark:border-stone-700 text-sm font-bold rounded-xl text-coffee-600 dark:text-stone-400 bg-transparent hover:bg-parchment-100 dark:hover:bg-stone-800 transition-all"
            >
              Return to Gallery
            </button>
          </div>
        </form>
        
        <div className="text-center text-xs text-coffee-400 dark:text-stone-500 mt-4 font-mono">
            Hint: <span className="bg-coffee-100 dark:bg-stone-800 px-1 py-0.5 rounded">admin@school.edu</span>
        </div>
      </div>
    </div>
  );
};