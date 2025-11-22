import React, { useState, useMemo } from 'react';
import { Search, Calendar, UserCheck, MapPin, Navigation, Anchor, Archive } from 'lucide-react';
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
    <div className="space-y-10">
      {/* Hero / Search Section with Treasure Map Theme */}
      <div className="relative overflow-hidden bg-parchment-100 dark:bg-stone-900 p-8 md:p-12 rounded-3xl shadow-xl shadow-amber-900/5 border-2 border-amber-900/10 dark:border-stone-700 transition-all duration-300 animate-fade-in group">
        
        {/* Dashed Map Path Decoration */}
        <div className="absolute top-10 left-10 w-full border-t-2 border-dashed border-amber-900/10 dark:border-stone-600/30 -rotate-3 pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-full border-b-2 border-dashed border-amber-900/10 dark:border-stone-600/30 rotate-2 pointer-events-none"></div>

        {/* Coffee Stain / Gold Blobs */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-200 dark:bg-amber-900/20 rounded-full blur-3xl opacity-40 pointer-events-none mix-blend-multiply dark:mix-blend-normal"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-200 dark:bg-stone-800 rounded-full blur-3xl opacity-40 delay-700 pointer-events-none mix-blend-multiply dark:mix-blend-normal"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-bold tracking-widest uppercase animate-slide-up border border-amber-900/10 dark:border-amber-700/30">
              <Navigation className="w-3 h-3" />
              Lost & Found
            </div>
            <h2 className="text-4xl md:text-5xl font-map font-black text-coffee-900 dark:text-parchment-100 tracking-tight animate-slide-up [animation-delay:100ms]">
              Lost something? <br />
              <span className="text-amber-700 dark:text-amber-500">Let's find it.</span>
            </h2>
            <p className="text-coffee-600 dark:text-stone-400 max-w-md mx-auto md:mx-0 animate-slide-up [animation-delay:200ms] font-medium">
              Browse the gallery below to identify your missing belongings. Claim an item to notify the office.
            </p>
            
            {/* Animated Search Bar - Map Style */}
            <div className={`relative mt-8 transform transition-all duration-300 ${isSearchFocused ? 'scale-105' : 'scale-100'} animate-slide-up [animation-delay:300ms]`}>
              <div className={`absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors duration-300 ${isSearchFocused ? 'text-amber-700' : 'text-stone-400'}`}>
                <Search className={`h-6 w-6 ${isSearchFocused ? 'animate-bounce-subtle' : ''}`} />
              </div>
              <input
                type="text"
                className="block w-full pl-14 pr-4 py-5 border-2 border-dashed border-amber-900/20 dark:border-stone-600 rounded-2xl leading-5 bg-white/50 dark:bg-stone-800 text-coffee-900 dark:text-parchment-50 placeholder-coffee-400 dark:placeholder-stone-500 focus:outline-none focus:bg-white dark:focus:bg-stone-800 focus:border-amber-600 dark:focus:border-amber-500 focus:border-solid focus:shadow-xl transition-all font-medium"
                placeholder="Search for 'hoodie', 'water bottle', 'keys'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          {/* Animated Illustration - Treasure Items */}
          <div className="hidden md:flex w-1/3 justify-center items-center relative h-48">
            <div className="absolute animate-float">
               <div className="w-24 h-24 bg-white dark:bg-stone-800 rounded-2xl shadow-xl border border-amber-900/10 dark:border-stone-600 flex items-center justify-center rotate-3">
                  <MapPin className="w-12 h-12 text-amber-700 dark:text-amber-500" />
               </div>
            </div>
            <div className="absolute -right-4 top-0 animate-float-delayed">
               <div className="w-16 h-16 bg-parchment-50 dark:bg-stone-800 rounded-2xl shadow-lg border border-amber-900/10 dark:border-stone-600 flex items-center justify-center -rotate-6">
                  <Anchor className="w-8 h-8 text-coffee-500 dark:text-stone-400" />
               </div>
            </div>
             <div className="absolute -left-4 bottom-0 animate-float-delayed [animation-delay:1s]">
               <div className="w-14 h-14 bg-orange-50 dark:bg-stone-800 rounded-2xl shadow-lg border border-amber-900/10 dark:border-stone-600 flex items-center justify-center rotate-12">
                  <span className="text-2xl grayscale-[0.2]">🎒</span>
               </div>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-10 flex gap-3 overflow-x-auto pb-2 no-scrollbar animate-slide-up [animation-delay:400ms]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 border-2 ${
                selectedCategory === cat
                  ? 'bg-amber-700 border-amber-700 text-white shadow-lg shadow-amber-900/20'
                  : 'bg-parchment-50 dark:bg-stone-800 border-amber-900/10 dark:border-stone-700 text-coffee-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700 hover:border-amber-300 dark:hover:border-stone-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-24 text-coffee-500 dark:text-stone-500 animate-fade-in border-2 border-dashed border-amber-900/5 dark:border-stone-800 rounded-3xl">
          <div className="mb-6 inline-flex p-6 bg-parchment-100 dark:bg-stone-800 rounded-full animate-float text-amber-700 dark:text-stone-400">
            <Archive className="w-12 h-12 opacity-50" />
          </div>
          <h3 className="text-xl font-map font-bold mb-2">No items found</h3>
          <p className="text-sm opacity-70">Try changing your search or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedItem(item);
                setIsClaiming(false);
                setClaimName('');
              }}
              className="group bg-white dark:bg-stone-900 rounded-xl overflow-hidden border-2 border-amber-900/5 dark:border-stone-800 shadow-md hover:shadow-xl hover:shadow-amber-900/10 dark:hover:shadow-black/50 transition-all duration-300 cursor-pointer relative hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="aspect-square w-full overflow-hidden bg-stone-100 dark:bg-stone-800 relative">
                <img
                  src={item.image_url}
                  alt={item.item_name}
                  className={`w-full h-full object-cover transition-transform duration-500 sepia-[0.1] ${item.claimedBy ? 'opacity-50 grayscale sepia' : 'group-hover:scale-110 group-hover:sepia-0'}`}
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 right-3 bg-parchment-50/95 dark:bg-stone-900/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-coffee-800 dark:text-parchment-100 shadow-md border border-amber-900/10 dark:border-stone-700">
                  {item.category}
                </div>

                {/* Overlay for unclaimed items on hover */}
                {!item.claimedBy && (
                  <div className="absolute inset-0 bg-amber-900/0 group-hover:bg-amber-900/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-white dark:bg-stone-800 text-amber-700 dark:text-amber-500 px-5 py-2 rounded-lg font-bold shadow-lg transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 border-2 border-amber-500/20">
                      View Details
                    </div>
                  </div>
                )}

                {item.claimedBy && (
                  <div className="absolute inset-0 flex items-center justify-center bg-stone-900/20 backdrop-blur-[1px]">
                     <span className="bg-amber-100 dark:bg-amber-900/90 text-amber-900 dark:text-amber-100 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 border-2 border-amber-200 dark:border-amber-800 shadow-lg animate-pulse-slow rotate-3">
                       <UserCheck className="w-3 h-3" /> CLAIM PENDING
                     </span>
                  </div>
                )}
              </div>
              <div className="p-5 relative">
                {/* Card texture overlay */}
                <div className="absolute inset-0 bg-parchment-50/50 dark:bg-transparent pointer-events-none opacity-50"></div>
                
                <h3 className="relative font-map font-bold text-coffee-900 dark:text-white truncate text-lg group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors">{item.item_name}</h3>
                <p className="relative text-sm text-coffee-600 dark:text-stone-400 mt-1 line-clamp-2 font-medium">{item.description}</p>
                <div className="relative mt-4 flex items-center justify-between pt-4 border-t border-amber-900/5 dark:border-stone-800">
                  <div className="flex items-center text-xs text-coffee-400 dark:text-stone-500 gap-1.5 font-mono uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(item.timestamp).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal with Map Style */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm transition-all animate-fade-in" onClick={() => setSelectedItem(null)}>
          <div 
            className="bg-parchment-50 dark:bg-stone-900 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border-4 border-white dark:border-stone-700 transform transition-all animate-slide-up relative" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-amber-700/20 dark:border-amber-500/20 rounded-tl-xl pointer-events-none z-20"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-amber-700/20 dark:border-amber-500/20 rounded-br-xl pointer-events-none z-20"></div>

            <div className="relative aspect-video bg-stone-200 dark:bg-stone-950 p-8 pattern-grid-lg text-stone-300">
              <img src={selectedItem.image_url} alt={selectedItem.item_name} className="w-full h-full object-contain drop-shadow-xl" />
              
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-white/80 dark:bg-black/50 p-2 rounded-full hover:bg-amber-500 hover:text-white transition-colors text-coffee-900 dark:text-white"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              {selectedItem.claimedBy && (
                <div className="absolute bottom-4 left-4 right-4 bg-amber-100/95 dark:bg-amber-900/90 backdrop-blur-sm border-2 border-amber-200 dark:border-amber-800 p-3 rounded-xl text-center text-sm text-amber-900 dark:text-amber-100 font-bold flex items-center justify-center gap-2 shadow-lg">
                  <UserCheck className="w-4 h-4" />
                  Claimed by {selectedItem.claimedBy}
                </div>
              )}
            </div>
            <div className="p-8 bg-parchment-50 dark:bg-stone-900">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-bold bg-coffee-100 dark:bg-stone-800 text-coffee-800 dark:text-stone-300 mb-3 border border-coffee-200 dark:border-stone-700 uppercase tracking-wider">
                    {selectedItem.category}
                  </span>
                  <h2 className="text-3xl font-map font-black text-coffee-900 dark:text-parchment-50 leading-tight">{selectedItem.item_name}</h2>
                </div>
              </div>
              
              <p className="text-coffee-700 dark:text-stone-300 mb-8 leading-relaxed text-lg font-medium border-l-4 border-amber-300 dark:border-amber-700 pl-4 italic">
                "{selectedItem.description}"
              </p>

              {/* Claim Section */}
              {!selectedItem.claimedBy ? (
                <div className="space-y-4">
                  {!isClaiming ? (
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setSelectedItem(null)}
                        className="py-3.5 bg-stone-200 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 text-coffee-900 dark:text-stone-200 font-bold rounded-xl transition-colors border-2 border-transparent"
                      >
                        Keep Looking
                      </button>
                      <button
                        onClick={() => setIsClaiming(true)}
                        className="py-3.5 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20 border-2 border-amber-700"
                      >
                        <MapPin className="w-5 h-5" />
                        It's Mine!
                      </button>
                    </div>
                  ) : (
                    <div className="bg-white dark:bg-stone-800 p-6 rounded-xl border-2 border-amber-200 dark:border-amber-900/50 animate-slide-up relative overflow-hidden">
                      {/* Decorative corner triangle */}
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-amber-100 dark:border-t-amber-900 border-r-transparent"></div>

                      <label className="block text-sm font-bold text-coffee-800 dark:text-stone-300 mb-3 font-map uppercase tracking-wider">Your Name</label>
                      <div className="flex gap-3">
                        <input 
                          type="text" 
                          value={claimName}
                          onChange={(e) => setClaimName(e.target.value)}
                          placeholder="Enter full name..."
                          className="flex-1 px-4 py-3 border-2 border-coffee-200 dark:border-stone-600 bg-parchment-50 dark:bg-stone-900 text-coffee-900 dark:text-white rounded-lg focus:ring-0 focus:border-amber-600 outline-none font-medium transition-colors"
                          autoFocus
                        />
                        <button 
                          onClick={handleClaimSubmit}
                          disabled={!claimName.trim()}
                          className="px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-bold shadow-md disabled:opacity-50 disabled:shadow-none transition-all"
                        >
                          Claim
                        </button>
                      </div>
                      <button 
                        onClick={() => setIsClaiming(false)}
                        className="text-xs text-coffee-500 dark:text-stone-500 mt-3 hover:text-coffee-800 dark:hover:text-stone-300 font-bold underline decoration-dotted"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-stone-100 dark:bg-stone-800/50 p-4 rounded-lg text-center border border-stone-200 dark:border-stone-700">
                  <p className="text-coffee-500 dark:text-stone-400 text-sm font-medium">This item is currently in holding pending verification.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};