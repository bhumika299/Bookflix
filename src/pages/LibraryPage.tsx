import React from 'react';
import { BookOpen, CheckCircle2, History, TrendingUp, Award, Calendar, Book as BookIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Book } from '../types';
import BookCard from '../components/BookCard';
import GenreRow from '../components/GenreRow';
import AIRecommendationBot from '../components/AIRecommendationBot';
import { useBooks } from '../context/BookContext';
import { cn } from '../lib/utils';

export default function LibraryPage({ onBookClick }: { onBookClick: (book: Book) => void }) {
  const { library, stats } = useBooks();

  const currentlyReading = library.filter(b => b.status === 'reading');
  const completedBooks = library.filter(b => b.status === 'completed');

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-8 pb-20 max-w-7xl mx-auto space-y-12 md:space-y-16">
      {/* Stats Dashboard */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 px-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-1 md:col-span-2 bg-gradient-to-br from-primary/20 to-transparent border border-white/10 rounded-3xl p-6 md:p-8 flex items-center gap-6"
        >
          <div className="relative w-20 md:w-24 h-20 md:h-24 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-white/5"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 * (1 - 0.75)}
                className="text-primary drop-shadow-[0_0_8px_rgba(229,9,20,0.5)]"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl md:text-2xl font-black">75%</span>
              <span className="text-[8px] uppercase tracking-widest text-gray-400">Monthly</span>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg md:text-xl font-black">Great progress!</h3>
            <p className="text-xs md:text-sm text-gray-400">You've read 18 books this year. Keep it up!</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4">
              <div className="flex items-center gap-1.5 text-[10px] font-black text-accent uppercase tracking-tighter">
                <Award size={14} /> 12 Badges
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-400 uppercase tracking-tighter">
                <TrendingUp size={14} /> Top 5% Global
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center text-center gap-2"
          >
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-400 mb-1">
              <Calendar size={20} />
            </div>
            <div className="text-2xl md:text-3xl font-black">{stats.streak}</div>
            <div className="text-[8px] md:text-[10px] uppercase tracking-widest text-gray-500 font-black">Day Streak</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center text-center gap-2"
          >
            <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-1">
              <BookIcon size={20} />
            </div>
            <div className="text-2xl md:text-3xl font-black">{stats.totalRead}</div>
            <div className="text-[8px] md:text-[10px] uppercase tracking-widest text-gray-500 font-black">Books Finished</div>
          </motion.div>
        </div>
      </section>

      {/* Continue Reading Section */}
      <section className="space-y-8 px-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black flex items-center gap-3">
            <BookOpen className="text-primary" /> Continue Reading
          </h2>
          <button className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">View All History</button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-10">
          {currentlyReading.map((book) => (
            <div key={book.id} className="relative">
              <BookCard book={book} onClick={() => onBookClick(book)} />
              <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-black text-white">
                {book.progress}%
              </div>
            </div>
          ))}
          {currentlyReading.length === 0 && (
            <div className="col-span-full py-12 glass rounded-3xl flex flex-col items-center justify-center gap-4 border-dashed border-white/10">
              <BookOpen size={40} className="text-gray-700" />
              <p className="text-gray-500">Pick up a book and start your journey!</p>
            </div>
          )}
        </div>
      </section>

      {/* Completed Books */}
      <GenreRow 
        title="Completed Books" 
        books={completedBooks} 
        onBookClick={onBookClick} 
      />

      <AIRecommendationBot onBookClick={onBookClick} />
    </div>
  );
}
