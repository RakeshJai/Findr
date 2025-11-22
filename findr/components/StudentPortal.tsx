import React, { useState, useMemo } from 'react';
import { Search, Calendar, UserCheck, Sparkles, HelpCircle } from 'lucide-react';
import { LostItem, Category } from '../types';

interface StudentPortalProps {
  items: LostItem[];
  onClaim: (id: string, studentName: string) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({ items, onClaim }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<LostItem | null>(null);
  
  // Claim Flow State
  const [claimName, setClaimName] = useState('');
  const [isClaiming, setIsClaiming] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categories = ['All', ...Object.values(Category)];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.item_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  const handleClaimSubmit = () => {
    if (selectedItem && claimName.trim()) {
      onClaim(selectedItem.id, claimName);
      setIsClaiming(false);
      setClaimName('');
      setSelectedItem(null); // Close modal after claiming
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero / Search Section with Animation */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 transition-all duration-300 animate-fade-in group">
        {/* Background Decorative Blobs - Removed pulse animation for stability */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-60 delay-700 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs font-semibold tracking-wide uppercase animate-slide-up">
              <Sparkles className="w-3 h-3" />
              Lost & Found Manager
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight animate-slide-up [animation-delay:100ms]">
              Lost something? <br />
              <span className="text-indigo-600 dark:text-indigo-400">Let's track it down.</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto md:mx-0 animate-slide-up [animation-delay:200ms]">
              Browse the gallery below to find your missing items. Claim them instantly to notify the office.
            </p>
            
            {/* Animated Search Bar */}
            <div className={`relative mt-6 transform transition-all duration-300 ${isSearchFocused ? 'scale-105' : 'scale-100'} animate-slide-up [animation-delay:300ms]`}>
              <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 ${isSearchFocused ? 'text-indigo-600' : 'text-slate-400'}`}>
                <Search className={`h-6 w-6 ${isSearchFocused ? 'animate-bounce-subtle' : ''}`} />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-4 border-2 border-slate-200 dark:border-slate-700 rounded-2xl leading-5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-500 dark:focus:border-indigo-500 focus:shadow-lg transition-all"
                placeholder="Search for 'hoodie', 'water bottle'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          {/* Animated Illustration - Smoother float */}
          <div className="hidden md:flex w-1/3 justify-center items-center relative h-48">
            <div className="absolute animate-float">
               <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center rotate-3">
                  <Search className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
               </div>
            </div>
            <div className="absolute -right-4 top-0 animate-float-delayed">
               <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center -rotate-6">
                  <HelpCircle className="w-8 h-8 text-orange-500" />
               </div>
            </div>
             <div className="absolute -left-4 bottom-0 animate-float-delayed [animation-delay:1s]">
               <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center rotate-12">
                  <span className="text-2xl">🎒</span>
               </div>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 no-scrollbar animate-slide-up [animation-delay:400ms]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:shadow-md'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 text-slate-500 dark:text-slate-400 animate-fade-in">
          <div className="mb-6 inline-flex p-6 bg-slate-100 dark:bg-slate-800 rounded-full animate-float">
            <Search className="w-10 h-10 text-slate-400 dark:text-slate-500" />
          </div>
          <p className="text-lg font-medium">No items found matching your criteria.</p>
          <p className="text-sm mt-2 opacity-70">Try using broader keywords or checking "All" categories.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedItem(item);
                setIsClaiming(false);
                setClaimName('');
              }}
              className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer relative hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                <img
                  src={item.image_url}
                  alt={item.item_name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${item.claimedBy ? 'opacity-70 grayscale' : 'group-hover:scale-110'}`}
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 shadow-lg transform transition-transform group-hover:scale-105">
                  {item.category}
                </div>

                {/* Overlay for unclaimed items on hover */}
                {!item.claimedBy && (
                  <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full font-bold shadow-lg transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      View Details
                    </div>
                  </div>
                )}

                {item.claimedBy && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
                     <span className="bg-yellow-100 dark:bg-yellow-900/90 text-yellow-800 dark:text-yellow-100 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 border border-yellow-200 dark:border-yellow-800 shadow-lg animate-pulse-slow">
                       <UserCheck className="w-3 h-3" /> CLAIM PENDING
                     </span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{item.item_name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-xs text-slate-400 dark:text-slate-500 gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(item.timestamp).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal with Animation */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all animate-fade-in" onClick={() => setSelectedItem(null)}>
          <div 
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-white/20 dark:border-slate-800 transform transition-all animate-slide-up" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-slate-100 dark:bg-slate-800 p-8">
              <img src={selectedItem.image_url} alt={selectedItem.item_name} className="w-full h-full object-contain drop-shadow-xl" />
              
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-white/50 dark:bg-black/50 p-2 rounded-full hover:bg-white dark:hover:bg-black transition-colors text-slate-900 dark:text-white"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              {selectedItem.claimedBy && (
                <div className="absolute bottom-4 left-4 right-4 bg-yellow-50/95 dark:bg-yellow-900/90 backdrop-blur-sm border border-yellow-100 dark:border-yellow-800 p-3 rounded-xl text-center text-sm text-yellow-800 dark:text-yellow-200 font-medium flex items-center justify-center gap-2 shadow-lg">
                  <UserCheck className="w-4 h-4" />
                  Claimed by {selectedItem.claimedBy}
                </div>
              )}
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 mb-3">
                    {selectedItem.category}
                  </span>
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">{selectedItem.item_name}</h2>
                </div>
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed text-lg">
                {selectedItem.description}
              </p>

              {/* Claim Section */}
              {!selectedItem.claimedBy ? (
                <div className="space-y-4">
                  {!isClaiming ? (
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setSelectedItem(null)}
                        className="py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-2xl transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setIsClaiming(true)}
                        className="py-3.5 bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 text-white font-bold rounded-2xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                      >
                        <UserCheck className="w-5 h-5" />
                        That's Mine!
                      </button>
                    </div>
                  ) : (
                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border-2 border-indigo-100 dark:border-indigo-900/30 animate-slide-up">
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Who is claiming this?</label>
                      <div className="flex gap-3">
                        <input 
                          type="text" 
                          value={claimName}
                          onChange={(e) => setClaimName(e.target.value)}
                          placeholder="Enter your full name"
                          className="flex-1 px-4 py-3 border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:ring-0 focus:border-indigo-500 outline-none font-medium transition-colors"
                          autoFocus
                        />
                        <button 
                          onClick={handleClaimSubmit}
                          disabled={!claimName.trim()}
                          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:shadow-none transition-all"
                        >
                          Submit
                        </button>
                      </div>
                      <button 
                        onClick={() => setIsClaiming(false)}
                        className="text-xs text-slate-500 dark:text-slate-400 mt-3 hover:text-slate-700 dark:hover:text-slate-300 font-medium"
                      >
                        Cancel Claim
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-center">
                  <p className="text-slate-500 dark:text-slate-400 text-sm">This item is waiting for teacher approval.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};