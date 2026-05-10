import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Loader2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getMoodBasedSuggestions, Recommendation } from '../services/geminiService';
import { cn } from '../lib/utils';

const MOODS = [
  { emoji: '🌌', name: 'Adventurous', color: 'from-blue-600 to-indigo-900' },
  { emoji: '🧠', name: 'Intellectual', color: 'from-purple-600 to-pink-900' },
  { emoji: '🕯️', name: 'Melancholy', color: 'from-gray-700 to-black' },
  { emoji: '✨', name: 'Enchanted', color: 'from-amber-500 to-red-900' },
  { emoji: '🕵️', name: 'Mysterious', color: 'from-emerald-600 to-teal-900' },
];

export default function AIRecommendationSection() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchSuggestions(mood: string) {
    setIsLoading(true);
    setSelectedMood(mood);
    const results = await getMoodBasedSuggestions(mood);
    setRecommendations(results);
    setIsLoading(false);
  }

  return (
    <section className="px-4 md:px-12 py-16" id="ai-recommendations">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-full bg-primary/20 text-primary">
          <Brain size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-black md:text-3xl tracking-tight">AI SUGGESTIONS</h2>
          <p className="text-sm text-gray-400">Curated by BookFlix Intelligence</p>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-lg font-bold mb-6 text-gray-300 italic">How are you feeling today?</h3>
        <div className="flex flex-wrap gap-4">
          {MOODS.map((mood) => (
            <button
              key={mood.name}
              onClick={() => fetchSuggestions(mood.name)}
              disabled={isLoading}
              className={cn(
                "group relative px-6 py-3 rounded-full overflow-hidden transition-all duration-300 active:scale-95",
                selectedMood === mood.name ? "ring-2 ring-white scale-105" : "glass hover:bg-white/10"
              )}
            >
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-gradient-to-r",
                mood.color
              )} />
              <span className="relative flex items-center gap-2 font-bold text-sm">
                <span>{mood.emoji}</span>
                {mood.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative min-h-[300px]">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4"
            >
              <Loader2 className="text-primary animate-spin" size={48} />
              <p className="text-primary font-bold animate-pulse tracking-widest text-xs uppercase">Analyzing your mood...</p>
            </motion.div>
          ) : recommendations.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {recommendations.map((rec, idx) => (
                <motion.div
                  key={rec.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass p-6 rounded-xl hover:bg-white/5 transition-colors border-l-4 border-primary group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-black text-xl tracking-tight group-hover:text-primary transition-colors">{rec.title}</h4>
                    <Sparkles size={16} className="text-accent opacity-50" />
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed italic">{rec.reason}</p>
                  <button className="mt-4 text-xs font-bold text-primary uppercase tracking-widest hover:underline flex items-center gap-1">
                    Details <RefreshCw size={12} />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            selectedMood === null && (
              <div className="flex items-center justify-center h-48 border-2 border-dashed border-white/5 rounded-2xl">
                <p className="text-gray-500 font-medium italic">Select a mood to uncover your next journey</p>
              </div>
            )
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
