import React from 'react';
import { Play, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { Book } from '../types';
import Tooltip from './Tooltip';

interface HeroProps {
  featuredBook: Book;
  onMoreInfo?: (book: Book) => void;
}

export default function Hero({ featuredBook, onMoreInfo }: HeroProps) {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden" id="hero-section">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0">
        <img 
          src={featuredBook.coverUrl}
          alt={featuredBook.title}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mt-0 h-full px-6 sm:px-12 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="bg-primary text-[10px] font-bold px-2 py-0.5 rounded shadow-lg uppercase tracking-wider">
              Book of the week
            </span>
            <span className="text-[10px] text-white/60 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-white/40" />
              {featuredBook.genres[0]}
            </span>
          </div>

          <h1 className="mb-4 text-4xl sm:text-6xl font-black tracking-tight md:text-8xl leading-[1] sm:leading-[0.9] uppercase drop-shadow-2xl">
            {featuredBook.title}
          </h1>
          
          <p className="mb-8 text-sm sm:text-base text-white/70 max-w-sm sm:max-w-md mt-4 leading-relaxed line-clamp-3 md:line-clamp-none">
            {featuredBook.description}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Tooltip text="Start Reading" position="top" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-md bg-white px-8 py-3 font-bold text-black text-sm transition-transform hover:scale-105 active:scale-95 shadow-xl">
                <Play fill="currentColor" size={16} />
                Read Now
              </button>
            </Tooltip>
            <Tooltip text="Book Details" position="top" className="w-full sm:w-auto">
              <button 
                onClick={() => onMoreInfo?.(featuredBook)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-md bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-3 font-bold text-white text-sm transition-all hover:bg-white/20 active:scale-95"
              >
                <Info size={16} />
                More Info
              </button>
            </Tooltip>
          </div>
        </motion.div>
      </div>

      {/* Subtle Glow at the bottom */}
      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
