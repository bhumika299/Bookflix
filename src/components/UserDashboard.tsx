import React from 'react';
import { motion } from 'motion/react';
import { Bookmark, Clock, Flame, BookOpen, ChevronRight, X, Award, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Badge } from '../types';

interface UserDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  badges?: Badge[];
}

export default function UserDashboard({ isOpen, onClose, badges = [] }: UserDashboardProps) {
  return (
    <motion.aside
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed right-0 top-0 z-[60] h-screen w-full max-w-sm glass-dark p-8 md:p-12 shadow-2xl"
    >
      <button 
        onClick={onClose}
        className="absolute top-8 left-8 p-2 hover:bg-white/10 rounded-full transition-all"
      >
        <X size={24} />
      </button>

      <div className="mt-16 space-y-10 overflow-y-auto max-h-[85vh] pr-2 scrollbar-hide">
        {/* Profile Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 flex-none overflow-hidden rounded-xl border-2 border-primary">
              <img 
                src="https://api.dicebear.com/7.x/pixel-art/svg?seed=BookFlix" 
                alt="User"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-xl font-black italic">READER PRO</h3>
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                <Flame size={14} fill="currentColor" />
                {badges.length > 0 ? "13 Day Streak" : "12 Day Streak"}
              </div>
            </div>
          </div>
          <Link 
            to="/profile" 
            onClick={onClose}
            className="p-2 glass rounded-lg hover:text-primary transition-colors"
            title="View Full Profile"
          >
            <ExternalLink size={18} />
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass p-4 rounded-xl text-center space-y-1">
            <p className="text-[10px] uppercase tracking-tighter text-gray-400">Books Read</p>
            <p className="text-2xl font-black">24</p>
          </div>
          <div className="glass p-4 rounded-xl text-center space-y-1">
            <p className="text-[10px] uppercase tracking-tighter text-gray-400">Rewards</p>
            <p className="text-2xl font-black text-accent">{badges.length}</p>
          </div>
        </div>

        {/* Badges Section */}
        {badges.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-bold flex items-center gap-2">
              <Award size={18} className="text-accent" />
              Achievements
            </h4>
            <div className="flex flex-wrap gap-3">
              {badges.map((badge) => (
                <div 
                  key={badge.id}
                  className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 ring-1 ring-accent/30"
                  title={badge.name}
                >
                  <Award size={20} className="text-accent" />
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 rounded bg-black px-2 py-1 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {badge.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Saved List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-bold flex items-center gap-2">
              <Bookmark size={18} className="text-primary" />
              Saved Books
            </h4>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">View All</span>
          </div>
          
          <div className="space-y-4">
            {['The Hobbit', 'Sapiens', '1984'].map((book) => (
              <div key={book} className="group flex items-center justify-between p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors border-l-2 border-transparent hover:border-primary">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-8 bg-surface-hover rounded overflow-hidden">
                    <img 
                      src="https://picsum.photos/seed/book/100/150" 
                      alt={book}
                      className="h-full w-full object-cover opacity-50 text-xs"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="text-sm font-bold group-hover:text-primary transition-colors">{book}</p>
                </div>
                <ChevronRight size={16} className="text-gray-600 transition-transform group-hover:translate-x-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Reading History */}
        <div className="space-y-6">
          <h4 className="font-bold flex items-center gap-2">
            <Clock size={18} className="text-primary" />
            Recent Activity
          </h4>
          <div className="flex items-start gap-4 pb-4">
            <div className="h-2 w-2 rounded-full bg-primary mt-2 shadow-[0_0_8px_rgba(229,9,20,0.8)]" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Finished Chapter 12 of <span className="text-white font-bold italic">Dune</span></p>
              <p className="text-[10px] text-gray-500">2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

