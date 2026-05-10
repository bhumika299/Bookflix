import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  key?: React.Key;
}

export default function Tooltip({ 
  text, 
  children, 
  position = 'top',
  className 
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: position === 'top' ? 5 : position === 'bottom' ? -5 : 0, x: position === 'left' ? 5 : position === 'right' ? -5 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={cn(
              "absolute z-[200] whitespace-nowrap pointer-events-none",
              positionClasses[position],
              className
            )}
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-2xl">
              {text}
            </div>
            {/* Arrow */}
            <div className={cn(
              "absolute w-2 h-2 rotate-45 border-white/20",
              position === 'top' && "bottom-[-4px] left-1/2 -translate-x-1/2 bg-white/10 border-r border-b",
              position === 'bottom' && "top-[-4px] left-1/2 -translate-x-1/2 bg-white/10 border-l border-t",
              position === 'left' && "right-[-4px] top-1/2 -translate-y-1/2 bg-white/10 border-r border-t",
              position === 'right' && "left-[-4px] top-1/2 -translate-y-1/2 bg-white/10 border-l border-b",
            )} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
