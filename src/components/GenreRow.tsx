import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BookCard from './BookCard';
import { Book } from '../types';
import Tooltip from './Tooltip';

interface GenreRowProps {
  title: string;
  books: Book[];
  onBookClick?: (book: Book) => void;
}

export default function GenreRow({ title, books, onBookClick }: GenreRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const slide = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="group relative mt-6 px-4 sm:px-12 md:px-16 overflow-hidden" id={`genre-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-center justify-between mb-3 px-2">
        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white/90">
          {title}
        </h3>
        <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest cursor-pointer hover:text-primary transition-colors text-white/40">
          View All
        </span>
      </div>
      
      <div className="relative group/row">
        <Tooltip text="Scroll Left" position="right" className="h-full">
          <button 
            onClick={() => slide('left')}
            className="absolute left-0 top-0 bottom-0 z-10 hidden items-center justify-center bg-black/60 px-4 opacity-0 group-hover/row:opacity-100 transition-all font-sans hover:bg-black/90 hover:scale-x-110 md:flex"
          >
            <ChevronLeft size={48} className="text-white drop-shadow-lg" />
          </button>
        </Tooltip>

        <div 
          ref={rowRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto overflow-y-hidden pt-4 pb-12 scrollbar-hide scroll-smooth px-2"
        >
          {books.map((book, index) => (
            <div key={`${book.id}-${index}`} className="flex-shrink-0">
              <BookCard book={book} onClick={() => onBookClick?.(book)} />
            </div>
          ))}
        </div>

        <Tooltip text="Scroll Right" position="left" className="h-full">
          <button 
            onClick={() => slide('right')}
            className="absolute right-0 top-0 bottom-0 z-10 hidden items-center justify-center bg-black/60 px-4 opacity-0 group-hover/row:opacity-100 transition-all font-sans hover:bg-black/90 hover:scale-x-110 md:flex"
          >
            <ChevronRight size={48} className="text-white drop-shadow-lg" />
          </button>
        </Tooltip>
      </div>
    </section>
  );
}
