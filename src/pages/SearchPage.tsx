import React, { useState, useEffect } from 'react';
import { Search, X, Mic, History, TrendingUp, Sparkles, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SAMPLE_BOOKS, Book } from '../types';
import BookCard from '../components/BookCard';
import Tooltip from '../components/Tooltip';
import { useBooks } from '../context/BookContext';

const MOODES = [
  { label: 'Sad', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { label: 'Dark', color: 'bg-zinc-800 text-zinc-400 border-zinc-700' },
  { label: 'Cozy', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  { label: 'Mysterious', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  { label: 'Romantic', color: 'bg-pink-500/20 text-pink-400 border-pink-500/30' },
];

const GENRES = ['Fantasy', 'Gothic', 'Dystopian', 'Classic', 'Thriller', 'Romance'];

export default function SearchPage({ onBookClick }: { onBookClick: (book: Book) => void }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const { searchHistory, addSearchHistory } = useBooks();
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    let results = SAMPLE_BOOKS;
    
    if (query) {
      results = results.filter(b => 
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase()) ||
        b.genres.some(g => g.toLowerCase().includes(query.toLowerCase()))
      );
    }

    if (activeMood) {
      // Simplification: mapping moods to genres or descriptions
      results = results.filter(b => 
        b.genres.some(g => g.toLowerCase().includes(activeMood.toLowerCase())) ||
        b.description.toLowerCase().includes(activeMood.toLowerCase())
      );
    }

    setFilteredBooks(results);
  }, [query, activeMood]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) addSearchHistory(query);
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-8 pb-20 max-w-7xl mx-auto">
      {/* Expanding Search Bar Container */}
      <motion.div 
        layout
        className="relative max-w-2xl mx-auto mb-10 md:mb-16"
      >
        <form onSubmit={handleSearch} className="relative group">
          <motion.div
            animate={{
              boxShadow: isFocused 
                ? "0 0 40px rgba(229, 9, 20, 0.15), 0 0 0 2px rgba(229, 9, 20, 0.5)" 
                : "0 10px 30px rgba(0,0,0,0.5)",
              scale: isFocused ? 1.02 : 1
            }}
            className="flex items-center gap-2 md:gap-4 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl px-4 md:px-6 py-3 md:py-4 transition-all duration-500"
          >
            <Search className={isFocused ? "text-primary" : "text-gray-400"} size={isFocused ? 20 : 18} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Search dystopian, gothic, fantasy..."
              className="flex-1 bg-transparent border-none outline-none text-sm md:text-lg text-white placeholder:text-gray-500 font-medium"
            />
            {query && (
              <button 
                type="button" 
                onClick={() => setQuery('')}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            )}
            <div className="hidden sm:block w-[1px] h-6 bg-white/10 mx-1" />
            <Tooltip text="Voice Search" position="top" className="hidden sm:block">
              <button type="button" className="p-2 text-gray-400 hover:text-white transition-colors">
                <Mic size={20} />
              </button>
            </Tooltip>
          </motion.div>
        </form>

        {/* Search Suggestions Dropdown */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 15, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full left-0 right-0 z-50 bg-black/90 backdrop-blur-3xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-3 sm:mb-4 text-xs font-black uppercase tracking-widest text-gray-500">
                    <History size={14} /> Recent Searches
                  </div>
                  <div className="flex flex-col gap-2">
                    {searchHistory.map((h, i) => (
                      <button 
                        key={i}
                        onClick={() => setQuery(h)}
                        className="text-left py-1 text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {h}
                      </button>
                    ))}
                    {searchHistory.length === 0 && <span className="text-xs text-gray-700 italic">No history yet</span>}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3 sm:mb-4 text-xs font-black uppercase tracking-widest text-gray-500">
                    <TrendingUp size={14} /> Trending Now
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['A Little Life', 'Fourth Wing', '1984', 'Gothic'].map((t, i) => (
                      <button 
                        key={i}
                        onClick={() => setQuery(t)}
                        className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Mood Filters */}
      <div className="flex flex-col items-center mb-12">
        <div className="flex items-center gap-2 mb-4 text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-500">
          <Filter size={14} /> Filter by Mood
        </div>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {MOODES.map((mood) => (
            <button
              key={mood.label}
              onClick={() => setActiveMood(activeMood === mood.label ? null : mood.label)}
              className={`px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeMood === mood.label 
                  ? 'bg-primary border-primary text-white scale-110 shadow-[0_0_20px_rgba(229,9,20,0.3)]' 
                  : mood.color + ' hover:scale-105 active:scale-95'
              }`}
            >
              {mood.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            {query || activeMood ? (
              <>Search Results <span className="text-sm font-normal text-gray-500">({filteredBooks.length} items)</span></>
            ) : (
              <><Sparkles className="text-primary" size={20} /> AI Recommendations for You</>
            )}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-12">
          {filteredBooks.map((book) => (
            <BookCard 
              key={book.id} 
              book={book} 
              onClick={() => onBookClick(book)} 
            />
          ))}
          {filteredBooks.length === 0 && (
            <div className="col-span-full py-20 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <Search size={32} className="text-gray-700" />
              </div>
              <div className="text-gray-500 font-medium">No books found matching your criteria.</div>
              <button 
                onClick={() => { setQuery(''); setActiveMood(null); }}
                className="text-primary text-sm font-bold underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
