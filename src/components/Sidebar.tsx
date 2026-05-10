import React from 'react';
import { Home, Search, BookOpen, Bookmark } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import Tooltip from './Tooltip';
import { useBooks } from '../context/BookContext';

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const { user } = useBooks();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-16 hover:w-64 border-r border-white/5 bg-black/95 hidden md:flex flex-col py-10 z-50 transition-all duration-300 ease-in-out group overflow-hidden">
        <div className="flex px-3 mb-10 items-center justify-center group-hover:justify-start gap-3 transition-all overflow-hidden whitespace-nowrap">
          <Link to="/" className="relative flex items-center justify-center flex-shrink-0">
            <BookOpen size={32} className="text-primary drop-shadow-[0_0_10px_rgba(229,9,20,0.5)]" fill="currentColor" />
            <span className="absolute text-black font-black text-sm mb-0.5">B</span>
          </Link>
          <span className="text-xl font-black tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            BOOKFLIX
          </span>
        </div>
        
        <nav className="flex flex-col gap-4 px-3 overflow-hidden">
          <NavItem 
            to="/" 
            icon={<Home size={22} />} 
            label="Home" 
            active={isActive('/')} 
          />
          <NavItem 
            to="/search" 
            icon={<Search size={22} />} 
            label="Search" 
            active={isActive('/search')} 
          />
          <NavItem 
            to="/library" 
            icon={<BookOpen size={22} />} 
            label="My Library" 
            active={isActive('/library')} 
          />
          <NavItem 
            to="/bookmarks" 
            icon={<Bookmark size={22} />} 
            label="My List" 
            active={isActive('/bookmarks')} 
          />
        </nav>

        <div className="mt-auto mb-6 px-3">
          <Link 
            to="/profile" 
            className={cn(
              "flex items-center gap-4 p-2 rounded-xl border border-transparent transition-all",
              isActive('/profile') ? "bg-white/5 border-white/10" : "hover:bg-white/5"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-full border-2 p-0.5 overflow-hidden flex-shrink-0 transition-transform",
              isActive('/profile') ? "border-primary" : "border-primary/30"
            )}>
              <div className="w-full h-full bg-gradient-to-tr from-primary to-red-400 rounded-full flex items-center justify-center text-[10px] font-black text-black">
                {user?.name?.slice(0, 2).toUpperCase() || 'JD'}
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              <p className="text-xs font-black truncate max-w-[120px]">{user?.name || 'Reader'}</p>
              <p className="text-[10px] text-primary font-black uppercase tracking-widest">{user?.membership || 'Free'} Reader</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-black/90 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-4 z-[100]">
        <MobileNavItem to="/" icon={<Home size={20} />} active={isActive('/')} />
        <MobileNavItem to="/search" icon={<Search size={20} />} active={isActive('/search')} />
        <MobileNavItem to="/library" icon={<BookOpen size={20} />} active={isActive('/library')} />
        <MobileNavItem to="/bookmarks" icon={<Bookmark size={20} />} active={isActive('/bookmarks')} />
        <Link 
          to="/profile" 
          className={cn(
            "w-8 h-8 rounded-full border p-0.5",
            isActive('/profile') ? "border-primary" : "border-white/20"
          )}
        >
          <div className="w-full h-full bg-gradient-to-tr from-primary to-red-400 rounded-full flex items-center justify-center text-[8px] font-black text-black">
            {user?.name?.slice(0, 1).toUpperCase() || 'J'}
          </div>
        </Link>
      </nav>
    </>
  );
}

function MobileNavItem({ to, icon, active }: { to: string, icon: React.ReactNode, active: boolean }) {
  return (
    <Link 
      to={to} 
      className={cn(
        "p-3 transition-colors relative",
        active ? "text-primary" : "text-gray-500"
      )}
    >
      {active && React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement, { fill: "currentColor" }) : icon}
      {active && (
        <motion.div 
          layoutId="mobile-active-dot"
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_5px_rgba(229,9,20,0.8)]"
        />
      )}
    </Link>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

function NavItem({ to, icon, label, active }: NavItemProps) {
  return (
    <Tooltip text={label} position="right" className="group-hover:hidden">
      <Link 
        to={to} 
        className={cn(
          "flex items-center gap-4 p-3 rounded-xl transition-all duration-300 relative overflow-hidden",
          active 
            ? "text-primary bg-primary/10" 
            : "text-white/30 hover:text-white hover:bg-white/5"
        )}
      >
        <div className="flex-shrink-0">
          {active && React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement, { fill: "currentColor" }) : icon}
        </div>
        <span className={cn(
          "font-bold text-sm whitespace-nowrap transition-all duration-300",
          "opacity-0 group-hover:opacity-100"
        )}>
          {label}
        </span>
        {active && (
          <motion.div 
            layoutId="active-pill"
            className="absolute left-0 w-1 h-2/3 bg-primary rounded-full"
          />
        )}
      </Link>
    </Tooltip>
  );
}
