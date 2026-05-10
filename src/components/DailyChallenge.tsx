import React, { useState, useEffect } from 'react';
import { Trophy, Clock, Play, CheckCircle2, Flame, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, DailyChallenge as ChallengeType } from '../types';
import { cn } from '../lib/utils';
import Tooltip from './Tooltip';

interface DailyChallengeProps {
  book: Book;
  onComplete: () => void;
}

export default function DailyChallenge({ book, onComplete }: DailyChallengeProps) {
  const [progress, setProgress] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const simulateReading = () => {
    if (isCompleted || isSimulating) return;
    setIsSimulating(true);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          setIsCompleted(true);
          onComplete();
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  return (
    <section className="px-4 md:px-12 py-12" id="daily-challenge">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface to-black p-8 md:p-12 shadow-2xl"
      >
        {/* Background Accent */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
        
        <div className="relative flex flex-col md:flex-row gap-8 items-center">
          {/* Book Cover */}
          <div className="relative flex-none shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <img 
              src={book.coverUrl} 
              alt={book.title} 
              className="h-72 w-52 rounded-xl object-cover ring-1 ring-white/20 shadow-2xl"
              referrerPolicy="no-referrer"
            />
            {isCompleted && (
              <Tooltip text="Challenge Master" position="right">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-4 -top-4 rounded-full bg-primary p-2 text-white shadow-xl"
                >
                  <Trophy size={24} />
                </motion.div>
              </Tooltip>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div>
              <div className="mb-2 flex items-center justify-center md:justify-start gap-2">
                <span className="flex items-center gap-1 rounded-full bg-accent/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-accent ring-1 ring-accent/30">
                  <Flame size={12} fill="currentColor" />
                  Daily Challenge
                </span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Expires in 14h 22m
                </span>
              </div>
              <h2 className="text-3xl font-black md:text-4xl tracking-tight text-glow-red">
                BOOK OF THE DAY
              </h2>
              <p className="mt-2 text-xl font-medium text-gray-400">
                {book.title} <span className="text-sm font-normal text-gray-600">by {book.author}</span>
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-bold text-gray-300">
                  <Clock size={16} className="text-primary" />
                  Goal: Read for 15 minutes
                </span>
                <span className="font-mono text-primary font-bold">{progress}%</span>
              </div>
              
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div 
                  className="h-full bg-primary shadow-[0_0_15px_rgba(229,9,20,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <Tooltip 
                  text={isCompleted ? "Goal Achieved" : isSimulating ? "Focus Mode Active" : "Start Reading Challenge"} 
                  position="top"
                >
                  <button 
                    onClick={simulateReading}
                    disabled={isSimulating || isCompleted}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-8 py-3 font-black uppercase tracking-widest transition-all active:scale-95",
                      isCompleted 
                        ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]" 
                        : "bg-white text-black hover:bg-gray-200"
                    )}
                  >
                    {isCompleted ? (
                      <><CheckCircle2 size={18} /> Challenge Complete</>
                    ) : isSimulating ? (
                      <><Clock size={18} className="animate-spin" /> Reading...</>
                    ) : (
                      <><Play size={18} fill="currentColor" /> Start Challenge</>
                    )}
                  </button>
                </Tooltip>
                
                {isCompleted && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-accent font-bold"
                  >
                    <Award size={20} />
                    <span>Reward Earned: Daily Master Badge</span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
