import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Settings, 
  Bookmark, 
  Clock, 
  Flame, 
  Award, 
  BookOpen, 
  TrendingUp, 
  Moon, 
  Sun,
  ChevronRight,
  Heart,
  LogOut
} from 'lucide-react';
import { Badge, SAMPLE_BOOKS, Book } from '../types';
import { cn } from '../lib/utils';
import Tooltip from '../components/Tooltip';
import { useBooks } from '../context/BookContext';

interface ProfilePageProps {
  earnedBadges: Badge[];
  recentlyViewed?: Book[];
}

export default function ProfilePage({ earnedBadges, recentlyViewed = [] }: ProfilePageProps) {
  const { logout } = useBooks();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  const favoriteGenres = ['Sci-Fi', 'Dystopian', 'Historical Fiction', 'Philosophy'];
  const savedBooks = SAMPLE_BOOKS.slice(0, 3);
  const readingHistory = SAMPLE_BOOKS.slice(2, 5);

  const displayRecentlyViewed = recentlyViewed.length > 0 ? recentlyViewed : SAMPLE_BOOKS.slice(0, 3);

  return (
    <div className="min-h-screen pt-24 px-4 md:px-12 pb-20 max-w-7xl mx-auto">
      {/* Profile Header */}
      <section className="relative mb-12 flex flex-col md:flex-row items-center gap-8 glass p-8 rounded-3xl border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative group">
          <div className="h-32 w-32 rounded-2xl overflow-hidden border-4 border-primary shadow-2xl">
            <img 
              src="https://api.dicebear.com/7.x/pixel-art/svg?seed=BookFlix" 
              alt="Profile"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <Tooltip text="Settings" position="top">
            <button className="absolute -bottom-2 -right-2 p-2 bg-white text-black rounded-lg shadow-xl hover:scale-110 transition-transform">
              <Settings size={16} />
            </button>
          </Tooltip>
        </div>

        <div className="flex-1 space-y-4 text-center md:text-left">
          <div>
            <h1 className="text-4xl font-black italic tracking-tight">READER PRO</h1>
            <p className="text-gray-400 font-medium">bhumika@bookflix.com</p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-full ring-1 ring-primary/30 text-primary font-bold text-sm">
              <Flame size={18} fill="currentColor" />
              {earnedBadges.length > 0 ? "13 Day Streak" : "12 Day Streak"}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-full ring-1 ring-accent/30 text-accent font-bold text-sm">
              <Award size={18} />
              {earnedBadges.length} Achievements
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Tooltip text="Logout" position="left">
            <button 
              onClick={logout}
              className="p-3 glass rounded-xl hover:bg-primary/20 text-gray-400 hover:text-primary transition-colors"
            >
              <LogOut size={20} />
            </button>
          </Tooltip>
          <Tooltip text={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"} position="left">
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-3 glass rounded-xl hover:bg-white/10 transition-colors"
            >
              {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </Tooltip>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Current Progress */}
          <section className="glass rounded-2xl p-6 border-white/5">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <BookOpen size={20} className="text-primary" />
              Currently Reading
            </h3>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 p-4 bg-white/5 rounded-xl border border-white/10">
                <img 
                  src={SAMPLE_BOOKS[2].coverUrl} 
                  className="h-32 w-24 rounded-lg object-cover shadow-lg" 
                  alt="Dune"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-xl">Dune</h4>
                      <p className="text-sm text-gray-500">Frank Herbert</p>
                    </div>
                    <span className="text-primary font-black">72%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '72%' }}
                      className="h-full bg-primary shadow-[0_0_10px_#E50914]"
                    />
                  </div>
                  <p className="text-xs text-gray-500 italic">4 chapters left • 45 mins remaining</p>
                </div>
              </div>
            </div>
          </section>

          {/* Reading History */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Clock size={20} className="text-primary" />
              Reading History
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {readingHistory.map((book) => (
                <div key={book.id} className="flex items-center gap-4 p-4 glass rounded-xl border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <img 
                    src={book.coverUrl} 
                    className="h-16 w-12 rounded object-cover" 
                    alt={book.title}
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate group-hover:text-primary transition-colors">{book.title}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{book.author}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400">Completed</p>
                    <p className="text-[10px] text-gray-600">May 12, 2026</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI Suggestions (Compact) */}
          <section className="glass rounded-2xl p-6 border-white/5 bg-gradient-to-br from-primary/5 to-transparent">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <TrendingUp size={20} className="text-accent" />
                AI Personalized Picks
              </h3>
              <button className="text-xs font-bold text-accent uppercase tracking-widest hover:underline">Refresh</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-accent/10 italic text-sm text-gray-300">
                "Since you loved <span className="text-white font-bold">1984</span>, you might find the philosophical depth of <span className="text-accent font-bold">Brave New World</span> intriguing."
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-accent/10 italic text-sm text-gray-300">
                "The epic scale of your recent read <span className="text-white font-bold">Dune</span> aligns perfectly with <span className="text-accent font-bold">The Foundation</span>."
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Stats Summary */}
          <section className="grid grid-cols-2 gap-4">
            <div className="glass p-6 rounded-2xl border-white/5 text-center">
              <p className="text-2xl font-black text-primary">24</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Books Read</p>
            </div>
            <div className="glass p-6 rounded-2xl border-white/5 text-center">
              <p className="text-2xl font-black text-accent">8.4k</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Total Pages</p>
            </div>
          </section>

          {/* Favorite Genres */}
          <section className="glass rounded-2xl p-6 border-white/5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
              <Heart size={16} className="text-primary" />
              Favorite Genres
            </h3>
            <div className="flex flex-wrap gap-2">
              {favoriteGenres.map((genre) => (
                <span key={genre} className="px-3 py-1.5 glass rounded-lg text-xs font-medium hover:bg-primary hover:text-white transition-colors cursor-default">
                  {genre}
                </span>
              ))}
            </div>
          </section>

          {/* Saved Books */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Bookmark size={16} className="text-primary" />
                Saved Books
              </h3>
              <button className="text-[10px] font-bold text-gray-500 hover:text-white transition-colors">SEE ALL</button>
            </div>
            <div className="space-y-3">
              {savedBooks.map((book) => (
                <div key={book.id} className="flex items-center justify-between p-3 glass rounded-xl border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <img src={book.coverUrl} className="h-10 w-8 rounded object-cover shadow-md" alt="" referrerPolicy="no-referrer" />
                    <span className="text-sm font-bold group-hover:text-primary transition-colors">{book.title}</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-600 group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </div>
          </section>

          {/* Achievements (Badges) */}
          <section className="glass rounded-2xl p-6 border-white/5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
              <Award size={16} className="text-accent" />
              Achievements
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {earnedBadges.map((badge) => (
                <Tooltip key={badge.id} text={badge.name} position="top">
                  <div 
                    className="aspect-square glass rounded-full flex items-center justify-center text-accent ring-1 ring-accent/30 hover:scale-110 transition-transform"
                  >
                    <Award size={20} />
                  </div>
                </Tooltip>
              ))}
              {earnedBadges.length === 0 && (
                <div className="col-span-4 py-4 text-center text-xs text-gray-600 italic">
                  Complete challenges to earn badges
                </div>
              )}
            </div>
          </section>

          {/* Recently Viewed */}
          <section className="glass rounded-2xl p-6 border-white/5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              Recently Viewed
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {displayRecentlyViewed.map((book) => (
                <div key={book.id} className="flex-none w-20 group cursor-pointer">
                  <img 
                    src={book.coverUrl} 
                    className="h-28 w-full object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform" 
                    alt="" 
                    referrerPolicy="no-referrer"
                  />
                  <p className="mt-2 text-[10px] font-bold truncate group-hover:text-primary transition-colors">{book.title}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
