import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Bot, RefreshCw, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { Book, SAMPLE_BOOKS } from '../types';
import { useBooks } from '../context/BookContext';
import BookCard from './BookCard';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function AIRecommendationBot({ onBookClick }: { onBookClick: (book: Book) => void }) {
  const { library } = useBooks();
  const [isThinking, setIsThinking] = useState(false);
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [analysis, setAnalysis] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const analyzeAndRecommend = async () => {
    if (library.length === 0) {
      setAnalysis("Your library is empty! Start reading and I'll analyze your style.");
      return;
    }

    setIsThinking(true);
    setError(null);

    try {
      const readBookTitles = library.map(b => b.title).join(', ');
      const availableBookInfo = SAMPLE_BOOKS.map(b => `${b.id}: ${b.title} (${b.genres.join(', ')})`).join('\n');
      
      const prompt = `
        User has these books in their library: ${readBookTitles}.
        Based on these, analyze their reading taste in 2 short sentences.
        Then, pick exactly 4 unique books from this list that they DON'T have:
        ${availableBookInfo}
        
        Return ONLY a JSON object:
        {
          "analysis": "string",
          "recommendedIds": ["id1", "id2", "id3", "id4"]
        }
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const data = JSON.parse(response.text);
      setAnalysis(data.analysis);
      
      const suggested = SAMPLE_BOOKS.filter(b => data.recommendedIds.includes(b.id));
      setRecommendations(suggested);
    } catch (err) {
      console.error("AI Recommendation Error:", err);
      setError("Failed to connect to AI server. Showing fallback recommendations.");
      // Fallback: just pick some random ones
      setRecommendations(SAMPLE_BOOKS.slice(0, 4));
      setAnalysis("I'm having trouble thinking today, but here are some popular picks!");
    } finally {
      setIsThinking(false);
    }
  };

  useEffect(() => {
    analyzeAndRecommend();
  }, []);

  return (
    <section className="bg-white/5 rounded-3xl p-10 border border-white/10 overflow-hidden relative min-h-[400px]">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32" />
      
      <div className="relative z-10 flex flex-col md:flex-row gap-12">
        {/* Bot Character */}
        <div className="md:w-1/3 flex flex-col items-center text-center">
          <div className="relative mb-6">
            <motion.div 
              animate={{ 
                scale: isThinking ? [1, 1.1, 1] : 1,
                rotate: isThinking ? [0, 5, -5, 0] : 0
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border border-primary/30 shadow-[0_0_50px_rgba(229,9,20,0.2)]"
            >
              <Bot size={48} className="text-primary" />
            </motion.div>
            <motion.div 
              animate={{ opacity: isThinking ? 1 : 0 }}
              className="absolute -top-1 -right-1 bg-primary text-white p-1 rounded-full text-[8px] font-black uppercase"
            >
              Thinking
            </motion.div>
          </div>
          
          <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
            AI Reading Bot <Sparkles size={20} className="text-primary" />
          </h2>
          
          <div className="glass p-6 rounded-2xl border border-white/10 text-sm text-gray-300 leading-relaxed min-h-[100px] flex items-center">
            {isThinking ? (
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }}
                    className="w-1.5 h-1.5 bg-primary rounded-full"
                  />
                ))}
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.p 
                  key={analysis}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="italic"
                >
                  "{analysis}"
                </motion.p>
              </AnimatePresence>
            )}
          </div>

          <button 
            onClick={analyzeAndRecommend}
            disabled={isThinking}
            className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:text-white transition-colors disabled:opacity-50"
          >
            <RefreshCw size={14} className={isThinking ? "animate-spin" : ""} /> 
            Re-Analyze tastes
          </button>
        </div>

        {/* Recommendations Grid */}
        <div className="flex-1 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black uppercase tracking-wider text-gray-500">
              Personalized Picks
            </h3>
            <div className="h-[1px] flex-1 bg-white/5 mx-6" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {isThinking ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <motion.div 
                    key={`skeleton-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="animate-pulse bg-white/5 aspect-[2/3] rounded-lg" 
                  />
                ))
              ) : (
                recommendations.map((book, i) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <BookCard book={book} onClick={() => onBookClick(book)} />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {!isThinking && recommendations.length === 0 && !error && (
             <div className="h-full flex items-center justify-center text-gray-600 italic">
               No new recommendations found...
             </div>
          )}

          {error && (
            <div className="text-xs text-red-500/50 italic text-center">
              {error}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
