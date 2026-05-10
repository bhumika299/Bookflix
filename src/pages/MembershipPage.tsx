import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Star, Shield, Zap, Sparkles, BookOpen, Smartphone, Headphones, Layers, Crown, ArrowRight, Bot } from 'lucide-react';
import { useBooks, MembershipTier } from '../context/BookContext';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

const PLANS = [
  {
    id: 'bronze' as MembershipTier,
    name: 'Bronze Membership',
    tagline: 'Best for casual readers',
    color: 'from-orange-800 to-amber-900',
    glow: 'shadow-[0_0_40px_rgba(146,64,14,0.3)]',
    borderColor: 'border-orange-500/30',
    icon: <BookOpen className="text-orange-400" />,
    features: [
      'Access to basic library',
      'Limited AI recommendations',
      'Bookmark books',
      'Reading progress tracker',
      'Standard themes',
      '1 device login',
      'Ads supported'
    ]
  },
  {
    id: 'silver' as MembershipTier,
    name: 'Silver Membership',
    tagline: 'Best for regular readers',
    color: 'from-zinc-400 to-zinc-600',
    glow: 'shadow-[0_0_40px_rgba(255,255,255,0.1)]',
    borderColor: 'border-white/30',
    icon: <Star className="text-white" />,
    popular: true,
    features: [
      'Everything in Bronze',
      'Unlimited bookmarks',
      'Personalized recommendations',
      'Offline reading',
      'Dark & aesthetic premium themes',
      'Reading streak analytics',
      'Early access to trending books',
      '3 device support',
      'Reduced ads'
    ]
  },
  {
    id: 'gold' as MembershipTier,
    name: 'Gold Membership',
    tagline: 'Ultimate immersive experience',
    color: 'from-yellow-600 to-yellow-800',
    glow: 'shadow-[0_0_60px_rgba(234,179,8,0.3)]',
    borderColor: 'border-yellow-500/50',
    icon: <Crown className="text-yellow-400" />,
    features: [
      'Everything in Silver',
      'AI mood-based recommendations',
      'Exclusive premium collections',
      'Audiobooks access',
      'Animated immersive reading mode',
      'Custom bookshelf creation',
      'Advanced reading analytics',
      'No ads',
      'Unlimited devices',
      'VIP gothic/fantasy collections'
    ]
  }
];

export default function MembershipPage() {
  const { user, updateMembership, logout } = useBooks();
  const [selectedPlan, setSelectedPlan] = useState<MembershipTier>(user?.membership || 'free');
  const navigate = useNavigate();

  const handleUpgrade = (tier: MembershipTier) => {
    updateMembership(tier);
    navigate('/profile');
  };

  return (
    <div className="min-h-screen pt-32 px-4 md:px-8 pb-20 max-w-7xl mx-auto space-y-20 relative">
      {/* Cinematic Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto relative">
        <button 
          onClick={logout}
          className="absolute -top-12 right-0 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
        >
          Sign Out
        </button>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-4"
        >
          <Sparkles size={12} /> Membership Universe
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
          Choose Your <span className="text-primary italic">Reading Universe</span>
        </h1>
        <p className="text-lg text-gray-400 font-medium leading-relaxed">
          Unlock premium features, exclusive collections, and personalized AI recommendations to transform your reading journey.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "relative glass border rounded-[40px] p-8 flex flex-col group transition-all duration-500",
              plan.borderColor,
              plan.popular && "md:scale-110 md:-translate-y-4 z-10"
            )}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-2xl">
                <Zap size={12} fill="black" /> Most Popular
              </div>
            )}

            <div className="mb-8">
              <div className={cn(
                "w-16 h-16 rounded-3xl bg-gradient-to-br flex items-center justify-center mb-6 shadow-2xl transition-transform group-hover:scale-110 duration-500",
                plan.color
              )}>
                {React.cloneElement(plan.icon as React.ReactElement, { size: 32 })}
              </div>
              <h2 className="text-3xl font-black leading-tight mb-2 uppercase tracking-tighter">{plan.name}</h2>
              <p className="text-gray-400 text-sm font-medium">{plan.tagline}</p>
            </div>

            <div className="space-y-4 mb-10 flex-1">
              {plan.features.map((feature, j) => (
                <div key={j} className="flex items-start gap-3">
                  <div className="mt-1 w-4 h-4 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Check size={10} className="text-primary" />
                  </div>
                  <span className="text-xs text-gray-300 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleUpgrade(plan.id)}
              className={cn(
                "w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95",
                plan.id === 'gold' 
                  ? "bg-yellow-600 text-black hover:bg-yellow-500 shadow-[0_0_30px_rgba(202,138,4,0.3)]" 
                  : "bg-white text-black hover:bg-gray-200"
              )}
            >
              {user?.membership === plan.id ? "Current Plan" : "Begin Your Journey"}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Why Upgrade Section */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-black uppercase tracking-tighter">Why Upgrade Your Shelf?</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BenefitCard 
            icon={<Bot size={32} />} 
            title="Smarter Recommendations" 
            desc="Our advanced AI bots analyze your reading soul to find your next favorite story before you even know it." 
          />
          <BenefitCard 
            icon={<Layers size={32} />} 
            title="Immersive Experience" 
            desc="Animated reading modes, custom ambient sounds, and premium themes that pull you into the book's world." 
          />
          <BenefitCard 
            icon={<Sparkles size={32} />} 
            title="Exclusive Collections" 
            desc="Access to VIP gothic, fantasy, and dark academia collections curated by literary experts." 
          />
        </div>
      </section>

      {/* AI Librarian Feature */}
      <section className="glass rounded-[40px] p-12 border border-yellow-500/30 overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-yellow-500/10 blur-[100px] -mr-32 -mt-32" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="w-24 h-24 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center text-yellow-500 animate-pulse">
            <Bot size={48} />
          </div>
          <div className="flex-1 space-y-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-yellow-500">Gold Exclusive</div>
            <h2 className="text-4xl font-black tracking-tighter">Personal AI Librarian</h2>
            <p className="text-gray-400 max-w-xl">
              Gold members get direct access to their personal AI curator. Ask for books based on vague moods, hyper-specific tropes, or your recent reading logs.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Midnight Gothic', 'Royal Library', 'Dark Academia', 'Crimson Cinema'].map(theme => (
                <span key={theme} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-500">
                  {theme}
                </span>
              ))}
            </div>
          </div>
          <button className="bg-yellow-600 text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-transform">
            Go Gold
          </button>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="space-y-8 pb-20">
        <h2 className="text-2xl font-black uppercase tracking-tighter text-center">Compare The Universes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-6 px-4 text-xs font-black uppercase tracking-widest text-gray-500">Feature</th>
                <th className="py-6 px-4 text-xs font-black uppercase tracking-widest text-orange-400">Bronze</th>
                <th className="py-6 px-4 text-xs font-black uppercase tracking-widest text-zinc-300">Silver</th>
                <th className="py-6 px-4 text-xs font-black uppercase tracking-widest text-yellow-500">Gold</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <Row title="Bookmarks" bronze="Limited" silver="Unlimited" gold="Unlimited" />
              <Row title="AI Recommendations" bronze="Basic" silver="Advanced" gold="Personalized" />
              <Row title="Offline Reading" bronze="❌" silver="✅" gold="✅" />
              <Row title="Ads" bronze="Supported" silver="Minimal" gold="No Ads" />
              <Row title="Premium Themes" bronze="❌" silver="✅" gold="✅" />
              <Row title="Audiobooks" bronze="❌" silver="❌" gold="✅" />
              <Row title="Device Support" bronze="1" silver="3" gold="Unlimited" />
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function BenefitCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="glass border border-white/5 p-8 rounded-3xl text-center space-y-4 hover:border-primary/30 transition-all duration-500"
    >
      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto text-primary group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function Row({ title, bronze, silver, gold }: { title: string, bronze: string, silver: string, gold: string }) {
  return (
    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
      <td className="py-4 px-4 font-bold text-gray-400 group-hover:text-white transition-colors">{title}</td>
      <td className="py-4 px-4 text-gray-500 font-medium">{bronze}</td>
      <td className="py-4 px-4 text-gray-500 font-medium">{silver}</td>
      <td className="py-4 px-4 text-gray-500 font-black text-yellow-500/80">{gold}</td>
    </tr>
  );
}
