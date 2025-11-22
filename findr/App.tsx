import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { StudentPortal } from './components/StudentPortal';
import { TeacherPortal } from './components/TeacherPortal';
import { Login } from './components/Login';
import { ViewState, LostItem } from './types';
import { getItems, saveItem, deleteItem, updateItem } from './services/storageService';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('student');
  const [items, setItems] = useState<LostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Load items and theme on mount
  useEffect(() => {
    loadItems();
    
    // Check local storage for theme
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const loadItems = async () => {
    setLoading(true);
    const data = await getItems();
    setItems(data);
    setLoading(false);
  };

  // Handlers for data manipulation
  const handleAddItem = async (item: LostItem) => {
    await saveItem(item);
    await loadItems(); // Refresh state from "DB"
  };

  const handleDeleteItem = async (id: string) => {
    await deleteItem(id);
    await loadItems();
  };

  const handleClaimItem = async (id: string, studentName: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      const updated = { ...item, claimedBy: studentName };
      await updateItem(updated);
      await loadItems();
    }
  };

  // Handlers for navigation
  const handleLogin = () => {
    setView('teacher-dashboard');
  };

  const handleLogout = () => {
    setView('student');
  };

  return (
    <Layout 
      currentView={view} 
      onNavigate={setView}
      onLogout={handleLogout}
      isDarkMode={isDarkMode}
      onToggleTheme={toggleTheme}
    >
      {loading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <>
          {view === 'student' && (
            <StudentPortal 
              items={items} 
              onClaim={handleClaimItem}
            />
          )}

          {view === 'teacher-login' && (
            <Login 
              onLogin={handleLogin} 
              onBack={() => setView('student')} 
            />
          )}

          {view === 'teacher-dashboard' && (
            <TeacherPortal 
              items={items}
              onAdd={handleAddItem}
              onDelete={handleDeleteItem}
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default App;