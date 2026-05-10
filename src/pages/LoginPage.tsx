import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { useBooks } from '../context/BookContext';
import { cn } from '../lib/utils';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useBooks();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) login(email, name || email.split('@')[0]);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-950/20 blur-[120px] rounded-full translate-y-1/3 -translate-x-1/4" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2690&auto=format&fit=crop')] bg-cover bg-center opacity-10 grayscale mix-blend-overlay" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative inline-flex items-center justify-center mb-4 cursor-default group"
          >
            <div className="relative flex items-center justify-center drop-shadow-[0_0_30px_rgba(229,9,20,0.6)]">
              <BookOpen size={80} className="text-primary" fill="currentColor" />
              <span className="absolute text-black font-black text-4xl mb-1">B</span>
            </div>
          </motion.div>
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">
            Enter the Universe
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Your next great adventure starts here.</p>
        </div>

        <div className="glass border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <Sparkles size={20} className="text-primary/50" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 pl-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-primary/50 outline-none transition-all placeholder:text-gray-700"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 pl-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@bookflix.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-primary/50 outline-none transition-all placeholder:text-gray-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Password</label>
                {isLogin && <button type="button" className="text-[10px] font-black text-primary hover:underline">Forgot?</button>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-primary/50 outline-none transition-all placeholder:text-gray-700"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary py-4 rounded-2xl font-black uppercase tracking-widest text-white shadow-[0_0_30px_rgba(229,9,20,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {isLogin ? "Unlock Universe" : "Start Journey"}
              <ChevronRight size={18} />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              {isLogin ? "Don't have an account? " : "Already a member? "}
              <span className="text-primary font-black uppercase tracking-widest text-[10px] ml-1">
                {isLogin ? "Begin Your Journey" : "Enter the Universe"}
              </span>
            </button>
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-8">
           <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
                <BookOpen size={20} />
              </div>
              <span className="text-[8px] uppercase font-black tracking-widest text-gray-600">Million+ Titles</span>
           </div>
           <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
                <Sparkles size={20} />
              </div>
              <span className="text-[8px] uppercase font-black tracking-widest text-gray-600">AI Powered</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
