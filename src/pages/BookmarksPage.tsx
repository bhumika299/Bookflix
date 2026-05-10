import React, { useState } from 'react';
import { Bookmark, Heart, List, Plus, LayoutGrid, Share2, MoreVertical, FolderOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, SAMPLE_BOOKS } from '../types';
import BookCard from '../components/BookCard';
import { useBooks } from '../context/BookContext';
import Tooltip from '../components/Tooltip';

const COLLECTIONS = [
  { id: 'dark-academia', name: 'Dark Academia Collection', count: 12, color: 'bg-zinc-800' },
  { id: 'classics', name: 'Must Read Classics', count: 8, color: 'bg-stone-800' },
  { id: 'emotional', name: 'Emotional Damage shelf', count: 5, color: 'bg-red-950' },
];

export default function BookmarksPage({ onBookClick }: { onBookClick: (book: Book) => void }) {
  const { bookmarks, collections } = useBooks();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
  const [showShareNotification, setShowShareNotification] = useState(false);

  const selectedCollection = collections.find(c => c.id === selectedCollectionId);
  const savedBooks = SAMPLE_BOOKS.filter(b => bookmarks.includes(b.id));
  
  const displayBooks = selectedCollection 
    ? SAMPLE_BOOKS.filter(b => selectedCollection.bookIds.includes(b.id))
    : savedBooks;

  const handleShare = (e: React.MouseEvent, collectionName: string) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/library?collection=${collectionName.toLowerCase().replace(/\s+/g, '-')}`;
    navigator.clipboard.writeText(shareUrl);
    setShowShareNotification(true);
    setTimeout(() => setShowShareNotification(false), 3000);
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-8 pb-20 max-w-7xl mx-auto space-y-12">
      <AnimatePresence>
        {showShareNotification && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] bg-white text-black px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-3 text-sm md:text-base w-[90%] md:w-auto"
          >
            <Share2 size={18} /> Link copied! Share with friends.
          </motion.div>
        )}
      </AnimatePresence>

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            {selectedCollectionId && (
              <button 
                onClick={() => setSelectedCollectionId(null)}
                className="text-xs font-black uppercase text-primary hover:underline tracking-widest"
              >
                ← All Collections
              </button>
            )}
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-2 flex items-center justify-center md:justify-start gap-3 tracking-tighter">
            {selectedCollection ? (
              <><FolderOpen className="text-primary" /> {selectedCollection.name}</>
            ) : (
              <><Bookmark className="text-primary fill-primary" /> My List</>
            )}
          </h1>
          <p className="text-sm md:text-base text-gray-400">
            {selectedCollection ? `Collection with ${selectedCollection.bookIds.length} curated items.` : "Everything you've saved to read later."}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10 w-full sm:w-auto">
            <button 
              onClick={() => setViewMode('grid')}
              className={`flex-1 sm:flex-none p-2 rounded-lg transition-all flex justify-center ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-500'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`flex-1 sm:flex-none p-2 rounded-lg transition-all flex justify-center ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-500'}`}
            >
              <List size={18} />
            </button>
          </div>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-primary/20">
            <Plus size={18} /> New Collection
          </button>
        </div>
      </header>

      {/* Collections Row */}
      {!selectedCollectionId && (
        <section className="space-y-6 px-2">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <FolderOpen size={14} /> Custom Collections
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {collections.map((c) => (
              <motion.div 
                key={c.id}
                layoutId={c.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedCollectionId(c.id)}
                className={`relative overflow-hidden h-32 rounded-3xl p-6 flex flex-col justify-end border border-white/10 group cursor-pointer ${c.color} transition-all active:scale-95`}
              >
                <div 
                  className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                  onClick={(e) => handleShare(e, c.name)}
                >
                  <Tooltip text="Share Collection" position="left">
                    <Share2 size={18} />
                  </Tooltip>
                </div>
                <h3 className="text-xl font-black tracking-tight">{c.name}</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{c.bookIds.length} items</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Saved Books Grid */}
      <section className="space-y-8 px-2">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-500">
          {selectedCollection ? (
            <><List size={14} /> Curated Books ({displayBooks.length})</>
          ) : (
            <><Heart size={14} className="text-primary fill-primary" /> Saved Books ({displayBooks.length})</>
          )}
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 sm:gap-x-6 gap-y-10 md:gap-y-12">
            <AnimatePresence mode="popLayout">
              {displayBooks.map((book) => (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <BookCard book={book} onClick={() => onBookClick(book)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="space-y-4">
            {displayBooks.map((book) => (
              <motion.div 
                key={book.id}
                layout
                className="flex items-center gap-4 sm:gap-6 glass p-3 sm:p-4 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => onBookClick(book)}
              >
                <img src={book.coverUrl} className="w-12 sm:w-16 aspect-[2/3] object-cover rounded-md shadow-lg" alt="" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm sm:text-base truncate">{book.title}</h4>
                  <p className="text-xs text-gray-500 truncate">{book.author}</p>
                </div>
                <div className="flex items-center gap-1 sm:gap-3">
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-gray-400">
                    {book.genres[0]}
                  </div>
                  <button 
                    className="p-2 text-gray-500 hover:text-white transition-colors"
                    onClick={(e) => handleShare(e, book.title)}
                  >
                    <Share2 size={16} />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-white transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {displayBooks.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
              <Bookmark size={32} className="text-gray-700" />
            </div>
            <div className="text-gray-500 font-medium">This collection is currently empty.</div>
            <p className="text-sm text-gray-600">Add books from your list or explore new ones.</p>
          </div>
        )}
      </section>
    </div>
  );
}
