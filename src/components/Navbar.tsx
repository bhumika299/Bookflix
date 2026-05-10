import React, { useState, useEffect } from 'react';
import { Search, Bell, User, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { searchBooks } from '../services/bookService';
import { Book } from '../types';
import Tooltip from './Tooltip';

interface NavbarProps {
  onProfileClick: () => void;
  onBookClick: (book: Book) => void;
}

export default function Navbar({ onProfileClick, onBookClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 2) {
        setIsSearching(true);
        const results = await searchBooks(searchQuery);
        setSearchResults(results);
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <nav 
      className={cn(
        "fixed top-0 z-50 left-20 right-0 px-4 py-4 transition-all duration-500 md:px-10",
        isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      )}
      id="main-nav"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="text-[10px] font-black tracking-[0.2em] text-accent uppercase bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
            Gold Member
          </div>
          <div className="hidden items-center gap-6 text-[11px] font-bold uppercase tracking-wider text-white/60 lg:flex">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#" className="hover:text-white transition-colors">Series</a>
            <a href="#" className="hover:text-white transition-colors">Audiobooks</a>
            <a href="#" className="hover:text-white transition-colors">New & Popular</a>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative flex items-center">
            <AnimatePresence>
              {isSearchOpen && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 240, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="bg-white/5 border border-white/10 rounded-lg py-2 pl-4 pr-10 text-xs focus:outline-none focus:bg-white/10 transition-colors"
                    placeholder="Search titles..."
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {isSearching && (
                    <Loader2 size={16} className="absolute right-12 animate-spin text-primary" />
                  )}
                  {searchQuery && (
                    <X 
                      size={16} 
                      className="absolute right-12 cursor-pointer text-gray-400 hover:text-white" 
                      onClick={() => setSearchQuery('')} 
                    />
                  )}
                </div>
              )}
            </AnimatePresence>
            <Tooltip text={isSearchOpen ? "Close Search" : "Search"} position="bottom">
              <button 
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  if (!isSearchOpen) setSearchQuery('');
                }}
                className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
                id="nav-search-btn"
              >
                <Search size={22} />
              </button>
            </Tooltip>

            {/* Live Search Results */}
            <AnimatePresence>
              {searchResults.length > 0 && isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-14 w-[320px] glass-dark rounded-xl overflow-hidden shadow-2xl border border-white/10"
                >
                  <div className="max-h-[400px] overflow-y-auto p-2 scrollbar-hide">
                    {searchResults.map((book) => (
                      <div 
                        key={book.id} 
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-colors group"
                        onClick={() => {
                          onBookClick(book);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                      >
                        <div className="h-12 w-10 flex-none bg-surface rounded overflow-hidden">
                          <img src={book.coverUrl} className="h-full w-full object-cover" alt="" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">{book.title}</p>
                          <p className="text-[10px] text-gray-400 truncate">{book.author}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <Tooltip text="Notifications" position="bottom">
            <button className="hidden p-2 hover:bg-white/10 rounded-full transition-colors md:block text-gray-400 hover:text-white" id="nav-bell-btn">
              <Bell size={22} />
            </button>
          </Tooltip>
          
          <Tooltip text="Profile Menu" position="bottom">
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={onProfileClick}
              id="nav-profile-btn"
            >
              <div className="h-9 w-9 overflow-hidden rounded-md border-2 border-transparent group-hover:border-white transition-all shadow-lg shadow-black/50">
                <img 
                  src="https://api.dicebear.com/7.x/pixel-art/svg?seed=BookFlix" 
                  alt="Profile"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <User size={18} className="hidden md:block text-gray-400 group-hover:text-white transition-colors" />
            </div>
          </Tooltip>
        </div>
      </div>
    </nav>
  );
}

