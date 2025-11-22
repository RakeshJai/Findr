import React from 'react';
import { Map, Lock, LogOut, Moon, Sun, LayoutDashboard } from 'lucide-react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onLogout?: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentView, 
  onNavigate, 
  onLogout, 
  isDarkMode, 
  onToggleTheme 
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-parchment-50 dark:bg-stone-900 transition-colors duration-200 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#292524_1px,transparent_1px)] [background-size:16px_16px]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-parchment-50/90 dark:bg-stone-900/90 backdrop-blur-md shadow-sm border-b border-amber-900/10 dark:border-stone-700 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('student')}
          >
            <div className="bg-amber-700 dark:bg-amber-600 p-2 rounded-xl shadow-md group-hover:rotate-12 transition-transform duration-300">
              <Map className="w-6 h-6 text-amber-50" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-coffee-900 dark:text-amber-50 font-map tracking-wide">
                FINDR
              </h1>
              <span className="text-xs font-medium text-amber-700 dark:text-amber-400 uppercase tracking-widest -mt-1">
                Lost & Found
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full hover:bg-amber-100 dark:hover:bg-stone-800 text-coffee-600 dark:text-stone-400 transition-colors border border-transparent hover:border-amber-200 dark:hover:border-stone-600"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {currentView === 'student' && (
              <button
                onClick={() => onNavigate('teacher-login')}
                className="flex items-center gap-2 text-sm font-bold text-coffee-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-400 transition-colors px-4 py-2 rounded-lg hover:bg-amber-50 dark:hover:bg-stone-800"
              >
                <Lock className="w-4 h-4" />
                Staff Portal
              </button>
            )}

            {(currentView === 'teacher-dashboard') && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-coffee-600 dark:text-stone-400 hidden sm:inline font-medium bg-amber-100 dark:bg-stone-800 px-3 py-1 rounded-full">
                  <LayoutDashboard className="w-3 h-3 inline mr-2" />
                  Staff Dashboard
                </span>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 text-sm font-bold text-red-700 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow relative">
        {/* Background Map texture overlay (subtle) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-parchment-100 dark:bg-stone-900 border-t border-amber-900/10 dark:border-stone-700 py-8 mt-auto transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 text-center text-coffee-600/60 dark:text-stone-600 text-sm font-map">
          <p>&copy; {new Date().getFullYear()} Findr Lost & Found.</p>
        </div>
      </footer>
    </div>
  );
};