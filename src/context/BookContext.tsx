import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, SAMPLE_BOOKS } from '../types';

interface UserBook extends Book {
  progress: number;
  status: 'reading' | 'completed' | 'saved';
  lastOpened?: string;
}

interface UserStats {
  streak: number;
  totalRead: number;
  favGenre: string;
}

interface Collection {
  id: string;
  name: string;
  bookIds: string[];
  color: string;
}

export type MembershipTier = 'free' | 'bronze' | 'silver' | 'gold';

interface User {
  name: string;
  email: string;
  membership: MembershipTier;
  avatar?: string;
}

interface BookContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, name: string) => void;
  logout: () => void;
  updateMembership: (tier: MembershipTier) => void;
  library: UserBook[];
  bookmarks: string[];
  collections: Collection[];
  stats: UserStats;
  toggleBookmark: (bookId: string) => void;
  updateProgress: (bookId: string, progress: number) => void;
  addToLibrary: (book: Book, status: 'reading' | 'completed' | 'saved') => void;
  searchHistory: string[];
  addSearchHistory: (query: string) => void;
  addToCollection: (bookId: string, collectionId: string) => void;
  removeFromCollection: (bookId: string, collectionId: string) => void;
  createCollection: (name: string, color: string) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [library, setLibrary] = useState<UserBook[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [stats] = useState<UserStats>({
    streak: 12,
    totalRead: 24,
    favGenre: 'Gothic'
  });
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Initialize with some sample data
  useEffect(() => {
    const initialLibrary: UserBook[] = [
      { ...SAMPLE_BOOKS[0], progress: 65, status: 'reading', lastOpened: new Date().toISOString() },
      { ...SAMPLE_BOOKS[1], progress: 20, status: 'reading', lastOpened: new Date().toISOString() },
      { ...SAMPLE_BOOKS[10], progress: 100, status: 'completed', lastOpened: new Date().toISOString() },
    ];
    setLibrary(initialLibrary);
    setBookmarks(['fourth-wing', 'dracula']);
    setSearchHistory(['Dark Academia', 'Rebecca Yarros', 'Best of 2024']);
    setCollections([
      { id: 'dark-academia', name: 'Dark Academia Collection', bookIds: ['secret-history', 'villains', 'babel'], color: 'bg-zinc-800' },
      { id: 'classics', name: 'Must Read Classics', bookIds: ['pride-prejudice', 'gatsby', '1984'], color: 'bg-stone-800' },
      { id: 'emotional', name: 'Emotional Damage shelf', bookIds: ['a-little-life', 'no-longer-human', 'norwegian-wood'], color: 'bg-red-950' },
    ]);
  }, []);

  const toggleBookmark = (bookId: string) => {
    setBookmarks(prev => 
      prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]
    );
  };

  const updateProgress = (bookId: string, progress: number) => {
    setLibrary(prev => prev.map(book => 
      book.id === bookId ? { ...book, progress, status: progress === 100 ? 'completed' : 'reading' } : book
    ));
  };

  const addToLibrary = (book: Book, status: 'reading' | 'completed' | 'saved') => {
    setLibrary(prev => {
      if (prev.find(b => b.id === book.id)) return prev;
      return [...prev, { ...book, progress: 0, status, lastOpened: new Date().toISOString() }];
    });
  };

  const addSearchHistory = (query: string) => {
    if (!query.trim()) return;
    setSearchHistory(prev => [query, ...prev.filter(q => q !== query)].slice(0, 5));
  };

  const addToCollection = (bookId: string, collectionId: string) => {
    setCollections(prev => prev.map(c => 
      c.id === collectionId 
        ? { ...c, bookIds: [...new Set([...c.bookIds, bookId])] }
        : c
    ));
  };

  const removeFromCollection = (bookId: string, collectionId: string) => {
    setCollections(prev => prev.map(c => 
      c.id === collectionId 
        ? { ...c, bookIds: c.bookIds.filter(id => id !== bookId) }
        : c
    ));
  };

  const createCollection = (name: string, color: string) => {
    const id = name.toLowerCase().replace(/\s+/g, '-');
    setCollections(prev => [...prev, { id, name, color, bookIds: [] }]);
  };

  const login = (email: string, name: string) => {
    setUser({ email, name, membership: 'free' });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateMembership = (tier: MembershipTier) => {
    setUser(prev => prev ? { ...prev, membership: tier } : null);
  };

  return (
    <BookContext.Provider value={{ 
      user,
      isAuthenticated,
      login,
      logout,
      updateMembership,
      library, 
      bookmarks, 
      collections,
      stats, 
      toggleBookmark, 
      updateProgress, 
      addToLibrary,
      searchHistory,
      addSearchHistory,
      addToCollection,
      removeFromCollection,
      createCollection
    }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
}
