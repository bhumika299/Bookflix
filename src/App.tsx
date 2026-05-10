import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserDashboard from './components/UserDashboard';
import Sidebar from './components/Sidebar';
import BookDetailsModal from './components/BookDetailsModal';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import LibraryPage from './pages/LibraryPage';
import BookmarksPage from './pages/BookmarksPage';
import MembershipPage from './pages/MembershipPage';
import LoginPage from './pages/LoginPage';
import { SAMPLE_BOOKS, Badge, Book } from './types';
import { BookProvider, useBooks } from './context/BookContext';

export default function App() {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Book[]>([]);
  const location = useLocation();

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setRecentlyViewed(prev => {
      const filtered = prev.filter(b => b.id !== book.id);
      return [book, ...filtered].slice(0, 10);
    });
  };
  
  const handleChallengeComplete = () => {
    const dailyMasterBadge: Badge = {
      id: `daily-master-${new Date().toISOString()}`,
      name: 'Daily Master',
      icon: 'award',
      dateEarned: new Date().toLocaleDateString()
    };
    
    if (!earnedBadges.some(b => b.name === 'Daily Master')) {
      setEarnedBadges(prev => [...prev, dailyMasterBadge]);
    }
  };

  return (
    <BookProvider>
      <AppContent />
    </BookProvider>
  );
}

function AppContent() {
  const { isAuthenticated, user } = useBooks();
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Book[]>([]);

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setRecentlyViewed(prev => {
      const filtered = prev.filter(b => b.id !== book.id);
      return [book, ...filtered].slice(0, 10);
    });
  };

  const handleChallengeComplete = () => {
    const dailyMasterBadge: Badge = {
      id: `daily-master-${new Date().toISOString()}`,
      name: 'Daily Master',
      icon: 'award',
      dateEarned: new Date().toLocaleDateString()
    };
    
    if (!earnedBadges.some(b => b.name === 'Daily Master')) {
      setEarnedBadges(prev => [...prev, dailyMasterBadge]);
    }
  };

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  if (user?.membership === 'free') {
    return (
      <div className="min-h-screen bg-background">
        <MembershipPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 flex flex-col md:flex-row overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 md:ml-16 relative">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 overflow-hidden pointer-events-none" />

        <Navbar onProfileClick={() => setIsDashboardOpen(true)} onBookClick={handleBookClick} />
        
        <UserDashboard 
          isOpen={isDashboardOpen} 
          onClose={() => setIsDashboardOpen(false)} 
          badges={earnedBadges}
        />

        <BookDetailsModal 
          book={selectedBook}
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
        />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                onBookClick={handleBookClick} 
                onChallengeComplete={handleChallengeComplete} 
              />
            } 
          />
          <Route 
            path="/search" 
            element={<SearchPage onBookClick={handleBookClick} />} 
          />
          <Route 
            path="/library" 
            element={<LibraryPage onBookClick={handleBookClick} />} 
          />
          <Route 
            path="/bookmarks" 
            element={<BookmarksPage onBookClick={handleBookClick} />} 
          />
          <Route 
            path="/profile" 
            element={
              <ProfilePage 
                earnedBadges={earnedBadges} 
                recentlyViewed={recentlyViewed}
              />
            } 
          />
          <Route path="/membership" element={<MembershipPage />} />
        </Routes>

        <footer className="mt-20 border-t border-white/5 bg-black py-12 px-4 md:px-12 text-gray-500">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <h5 className="text-white font-bold text-sm">BOOKFLIX</h5>
              <p className="text-xs">Immersive reading for the modern soul.</p>
            </div>
            <div className="space-y-2 text-xs">
              <a href="#" className="block hover:underline">Help Center</a>
              <a href="#" className="block hover:underline">Support</a>
              <a href="#" className="block hover:underline">Contact Us</a>
            </div>
            <div className="space-y-2 text-xs">
              <a href="#" className="block hover:underline">Privacy Policy</a>
              <a href="#" className="block hover:underline">Terms of Use</a>
              <a href="#" className="block hover:underline">Cookie Preferences</a>
            </div>
            <div className="space-y-2 text-xs text-right">
              <p>© 2026 BookFlix Inc.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}


