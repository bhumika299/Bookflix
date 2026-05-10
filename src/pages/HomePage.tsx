import React from 'react';
import Hero from '../components/Hero';
import GenreRow from '../components/GenreRow';
import AIRecommendationSection from '../components/AIRecommendationSection';
import DailyChallenge from '../components/DailyChallenge';
import { Book, SAMPLE_BOOKS } from '../types';

interface HomePageProps {
  onBookClick: (book: Book) => void;
  onChallengeComplete: () => void;
}

export default function HomePage({ onBookClick, onChallengeComplete }: HomePageProps) {
  // Select featured books for different categories
  const featuredBook = SAMPLE_BOOKS.find(b => b.id === 'fourth-wing') || SAMPLE_BOOKS[0];
  const dailyBook = SAMPLE_BOOKS.find(b => b.id === 'silent-patient') || SAMPLE_BOOKS[0];

  // Filtering for rows
  const trendingThisWeek = SAMPLE_BOOKS.filter(b => b.trending);
  const darkAcademia = SAMPLE_BOOKS.filter(b => b.genres.includes('Dark Academia'));
  const bookTokFavs = SAMPLE_BOOKS.filter(b => b.genres.includes('BookTok'));
  const dystopianUniverse = SAMPLE_BOOKS.filter(b => b.genres.includes('Dystopian'));
  const gothicNights = SAMPLE_BOOKS.filter(b => b.genres.includes('Gothic'));
  const emotionalDamage = SAMPLE_BOOKS.filter(b => b.genres.includes('Emotional Damage'));
  const fantasyWorlds = SAMPLE_BOOKS.filter(b => b.genres.includes('Fantasy') || b.genres.includes('Epic Fantasy'));
  const psychologicalSpiral = SAMPLE_BOOKS.filter(b => b.genres.includes('Psychological'));
  const romanticCollection = SAMPLE_BOOKS.filter(b => b.genres.includes('Romance'));
  const ogClassics = SAMPLE_BOOKS.filter(b => b.genres.includes('Classics') && !b.genres.includes('Gothic'));
  const recommendedForYou = SAMPLE_BOOKS.filter(b => b.genres.includes('BookTok')).slice(2, 6);

  return (
    <main>
      <Hero featuredBook={featuredBook} onMoreInfo={onBookClick} />
      
      <div className="relative -mt-32 z-20 space-y-12 pb-20">
        <DailyChallenge 
          book={dailyBook} 
          onComplete={onChallengeComplete}
        />

        <GenreRow title="Trending This Week" books={trendingThisWeek} onBookClick={onBookClick} />
        <GenreRow title="Dark Academia" books={darkAcademia} onBookClick={onBookClick} />
        <GenreRow title="BookTok Favorites" books={bookTokFavs} onBookClick={onBookClick} />
        <GenreRow title="Dystopian Universe" books={dystopianUniverse} onBookClick={onBookClick} />
        <GenreRow title="Gothic Nights" books={gothicNights} onBookClick={onBookClick} />
        
        <AIRecommendationSection />

        <GenreRow title="Emotional Damage" books={emotionalDamage} onBookClick={onBookClick} />
        <GenreRow title="Read Before Midnight" books={ogClassics.slice(0, 5)} onBookClick={onBookClick} />
        <GenreRow title="Fantasy Worlds" books={fantasyWorlds} onBookClick={onBookClick} />
        <GenreRow title="Psychological Spiral" books={psychologicalSpiral} onBookClick={onBookClick} />
        <GenreRow title="Romantic Collection" books={romanticCollection} onBookClick={onBookClick} />
        <GenreRow title="Because You Liked “1984”" books={dystopianUniverse.filter(b => b.id !== '1984')} onBookClick={onBookClick} />
        <GenreRow title="OG Classics" books={ogClassics} onBookClick={onBookClick} />
      </div>
    </main>
  );
}
