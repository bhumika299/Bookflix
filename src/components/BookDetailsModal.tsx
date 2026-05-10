import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Plus, Share2, MessageSquare, Star as StarIcon, Check, FolderPlus } from 'lucide-react';
import { Book, Review } from '../types';
import StarRating from './StarRating';
import { cn } from '../lib/utils';
import Tooltip from './Tooltip';
import { useBooks } from '../context/BookContext';

interface BookDetailsModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookDetailsModal({ book, isOpen, onClose }: BookDetailsModalProps) {
  const { collections, addToCollection, removeFromCollection } = useBooks();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCollectionMenu, setShowCollectionMenu] = useState(false);
  const [showShareNotification, setShowShareNotification] = useState(false);

  // Mock initial reviews
  useEffect(() => {
    if (book) {
      const initialReviews: Review[] = [
        {
          id: 'm1',
          userId: 'u1',
          userName: 'Alex Rivers',
          userAvatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Alex',
          bookId: book.id,
          rating: 5,
          comment: 'Absolutely masterpiece. The atmosphere is haunting and definitely stuck with me for weeks.',
          date: '2026-04-12'
        },
        {
          id: 'm2',
          userId: 'u2',
          userName: 'Sam Quest',
          userAvatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Sam',
          bookId: book.id,
          rating: 4,
          comment: 'Well written, though some parts were a bit slow. Recommended for fans of the genre.',
          date: '2026-05-01'
        }
      ];
      setReviews(initialReviews);
    }
  }, [book]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !book) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const review: Review = {
        id: Date.now().toString(),
        userId: 'current-user',
        userName: 'Reader Pro',
        userAvatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=BookFlix',
        bookId: book.id,
        rating: newRating,
        comment: newComment,
        date: new Date().toISOString().split('T')[0]
      };

      setReviews([review, ...reviews]);
      setNewComment('');
      setNewRating(5);
      setIsSubmitting(false);
    }, 800);
  };

  const toggleCollection = (collectionId: string) => {
    if (!book) return;
    const collection = collections.find(c => c.id === collectionId);
    if (collection?.bookIds.includes(book.id)) {
      removeFromCollection(book.id, collectionId);
    } else {
      addToCollection(book.id, collectionId);
    }
  };

  const handleShare = () => {
    if (!book) return;
    const shareUrl = `${window.location.origin}/library?book=${book.id}`;
    navigator.clipboard.writeText(shareUrl);
    setShowShareNotification(true);
    setTimeout(() => setShowShareNotification(false), 3000);
  };

  if (!book) return null;

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : book.rating;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />

          {/* Share Notification */}
          <AnimatePresence>
            {showShareNotification && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] bg-white text-black px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-3"
              >
                <Share2 size={18} /> Book link copied!
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl max-h-[95vh] md:max-h-[85vh] overflow-y-auto rounded-3xl bg-surface border border-white/10 shadow-2xl scrollbar-hide"
          >
            {/* Header / Hero Section */}
            <div className="relative h-72 md:h-80 w-full">
              <img 
                src={book.coverUrl} 
                className="h-full w-full object-cover opacity-50 blur-sm brightness-50" 
                alt=""
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent" />
              
              <Tooltip text="Close" position="left">
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/80 transition-all font-sans"
                >
                  <X size={24} />
                </button>
              </Tooltip>

              <div className="absolute bottom-0 left-0 p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-end">
                <img 
                  src={book.coverUrl} 
                  className="h-40 md:h-48 w-28 md:w-32 rounded-lg shadow-2xl ring-1 ring-white/20 flex-none object-cover mx-auto md:mx-0" 
                  alt={book.title}
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-3 text-center md:text-left">
                   <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <span className="bg-primary text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded shadow-lg uppercase tracking-wider">
                      Book Details
                    </span>
                    <StarRating rating={Number(averageRating)} />
                    <span className="text-xs text-accent font-black">{averageRating}</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">{book.title}</h2>
                  <p className="text-white/60 font-bold italic">By {book.author}</p>
                </div>
              </div>
            </div>

            {/* Main Content Areas */}
            <div className="p-6 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {/* Left Column: Description & Actions */}
              <div className="md:col-span-2 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    Synopsis
                  </h3>
                  <p className="text-white/70 leading-relaxed text-sm">
                    {book.description}
                  </p>
                </div>

                <div className="flex gap-4 relative">
                  <Tooltip text="Start Reading Now" position="top" className="flex-1">
                    <button className="w-full bg-white text-black py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                      <Play size={18} fill="currentColor" /> Read Now
                    </button>
                  </Tooltip>
                  
                  <div className="relative">
                    <Tooltip text="Add to Collection" position="top">
                      <button 
                        onClick={() => setShowCollectionMenu(!showCollectionMenu)}
                        className={cn(
                          "p-3 glass rounded-lg hover:bg-white/10 transition-colors h-full",
                          showCollectionMenu && "bg-white/10 text-primary border-primary/50"
                        )}
                      >
                        <FolderPlus size={20} />
                      </button>
                    </Tooltip>
                    
                    <AnimatePresence>
                      {showCollectionMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: -220, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute bottom-full mb-2 right-0 w-64 glass border border-white/10 rounded-2xl p-4 shadow-2xl z-[120] space-y-3"
                        >
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 px-2 flex justify-between items-center">
                            Collections 
                            <X size={10} className="cursor-pointer" onClick={() => setShowCollectionMenu(false)} />
                          </h4>
                          <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                            {collections.map(c => {
                              const isIn = c.bookIds.includes(book.id);
                              return (
                                <button
                                  key={c.id}
                                  onClick={() => toggleCollection(c.id)}
                                  className={cn(
                                    "w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors",
                                    isIn ? "bg-primary/20 text-primary" : "hover:bg-white/5 text-gray-300"
                                  )}
                                >
                                  {c.name}
                                  {isIn && <Check size={14} />}
                                </button>
                              );
                            })}
                          </div>
                          <button className="w-full mt-2 py-2 px-3 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-center hover:bg-white/5 transition-colors">
                            + New Collection
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Tooltip text="Share Book" position="top">
                    <button 
                      onClick={handleShare}
                      className="p-3 glass rounded-lg hover:bg-white/10 transition-colors h-full"
                    >
                      <Share2 size={20} />
                    </button>
                  </Tooltip>
                </div>

                {/* Review Form */}
                <div className="space-y-6 pt-8 border-t border-white/5">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <MessageSquare size={20} className="text-primary" />
                    Write a Review
                  </h3>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-white/40 uppercase">Your Rating:</span>
                      <StarRating 
                        rating={newRating} 
                        interactive 
                        onRatingChange={setNewRating} 
                        size={20} 
                      />
                    </div>
                    <textarea
                      placeholder="Share your thoughts on this journey..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 min-h-[100px] transition-all"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting || !newComment.trim()}
                      className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-bold py-2.5 px-8 rounded-full text-sm transition-all shadow-lg shadow-primary/20"
                    >
                      {isSubmitting ? 'Posting...' : 'Post Review'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Column: Reviews List */}
              <div className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-white/40">
                  Reader Reviews ({reviews.length})
                </h3>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="space-y-3 glass p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        <img 
                          src={review.userAvatar} 
                          className="w-8 h-8 rounded-full" 
                          alt={review.userName}
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold truncate">{review.userName}</p>
                          <StarRating rating={review.rating} size={10} />
                        </div>
                      </div>
                      <p className="text-xs text-white/70 italic leading-relaxed">"{review.comment}"</p>
                      <p className="text-[9px] text-white/30 uppercase font-bold tracking-widest">{review.date}</p>
                    </div>
                  ))}
                  {reviews.length === 0 && (
                    <p className="text-xs text-white/30 italic text-center py-8">Be the first to review this book.</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
