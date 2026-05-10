import React, { useState } from 'react';
import { Bookmark, Heart, FolderPlus, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Book } from '../types';
import Tooltip from './Tooltip';
import { useBooks } from '../context/BookContext';
import { cn } from '../lib/utils';

interface BookCardProps {
  book: Book;
  onClick?: () => void;
  key?: string | number;
}

export default function BookCard({ book, onClick }: BookCardProps) {
  const { bookmarks, toggleBookmark, library, collections, addToCollection, removeFromCollection } = useBooks();
  const [showCollections, setShowCollections] = useState(false);
  
  const isBookmarked = bookmarks.includes(book.id);
  const userBook = library.find(b => b.id === book.id);
  const progress = userBook ? userBook.progress : 0;

  const toggleCollection = (e: React.MouseEvent, collectionId: string) => {
    e.stopPropagation();
    const collection = collections.find(c => c.id === collectionId);
    if (collection?.bookIds.includes(book.id)) {
      removeFromCollection(book.id, collectionId);
    } else {
      addToCollection(book.id, collectionId);
    }
  };

  return (
    <motion.div 
      onClick={onClick}
      className="group relative flex-none w-[150px] md:w-[180px] cursor-pointer"
      whileHover={{ y: -5 }}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg border border-white/10 transition-all duration-300 shadow-lg group-hover:shadow-primary/20">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {/* Bookmark Badge */}
        {isBookmarked && (
          <div className="absolute top-0 right-3 z-10">
            <div className="bg-primary pt-2 pb-1 px-1 rounded-b-sm shadow-lg animate-in slide-in-from-top duration-300">
              <Bookmark size={12} fill="white" className="text-white" />
            </div>
          </div>
        )}
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <div className="absolute top-2 left-2 flex gap-1">
            <Tooltip text="Reader Rating" position="right">
              <div className="text-[10px] bg-white/10 backdrop-blur-md font-bold px-1.5 py-0.5 rounded shadow-lg text-white border border-white/10 text-center">
                {book.rating.toFixed(1)}
              </div>
            </Tooltip>
          </div>

          {/* Inline Collection Menu */}
          <AnimatePresence>
            {showCollections && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 z-20 glass m-2 rounded-lg p-2 flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-2 px-1">
                  <span className="text-[8px] font-black uppercase text-gray-400">Add to:</span>
                  <X size={10} className="cursor-pointer" onClick={() => setShowCollections(false)} />
                </div>
                <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                   {collections.map(c => {
                     const isIn = c.bookIds.includes(book.id);
                     return (
                       <button
                         key={c.id}
                         onClick={(e) => toggleCollection(e, c.id)}
                         className={cn(
                           "w-full text-left px-2 py-1 rounded text-[10px] font-bold flex items-center justify-between transition-colors",
                           isIn ? "bg-primary text-white" : "hover:bg-white/10 text-gray-300"
                         )}
                       >
                         {c.name.split(' ')[0]}
                         {isIn && <Check size={8} />}
                       </button>
                     );
                   })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="bg-gradient-to-t from-black/80 to-transparent p-2 -mx-3 -mb-3 space-y-2">
            <div className="flex gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onClick?.();
                }}
                className="flex-1 bg-white text-black py-1.5 rounded text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-gray-200 transition-colors"
                id={`read-btn-${book.id}`}
              >
                Read
              </button>
              <div className="flex gap-1">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(book.id);
                  }}
                  className={cn(
                    "p-1.5 rounded transition-colors group/heart",
                    isBookmarked ? "bg-primary text-white" : "glass hover:bg-white/10"
                  )}
                  id={`bookmark-btn-${book.id}`}
                >
                  <Heart size={14} className={cn(isBookmarked && "fill-white")} />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCollections(!showCollections);
                  }}
                  className={cn(
                    "p-1.5 rounded transition-colors",
                    showCollections ? "bg-primary text-white" : "glass hover:bg-white/10"
                  )}
                >
                  <FolderPlus size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full">
            <div 
              className="h-full bg-primary shadow-[0_0_5px_#E50914] transition-all duration-1000" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        )}
      </div>

      {/* Book Labels Below Poster */}
      <div className="mt-3 px-1">
        <h4 className="text-xs font-bold truncate text-white group-hover:text-primary transition-colors leading-tight">
          {book.title}
        </h4>
        <p className="text-[10px] text-gray-500 truncate mt-0.5">
          {book.author}
        </p>
      </div>
    </motion.div>
  );
}
