export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  bookId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  rating: number;
  description: string;
  genres: string[];
  trending?: boolean;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  dateEarned: string;
}

export interface DailyChallenge {
  bookId: string;
  progress: number; // 0 to 100
  isCompleted: boolean;
}

export const SAMPLE_BOOKS: Book[] = [
  // Trending This Week / BookTok Favorites
  {
    id: 'fourth-wing',
    title: 'Fourth Wing',
    author: 'Rebecca Yarros',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg',
    rating: 4.8,
    description: 'Enter the elite world of a war college for dragon riders.',
    genres: ['Fantasy', 'Romance', 'BookTok', 'Trending'],
    trending: true
  },
  {
    id: 'iron-flame',
    title: 'Iron Flame',
    author: 'Rebecca Yarros',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781649374172-L.jpg',
    rating: 4.7,
    description: 'The sequel to the blockbuster Fourth Wing.',
    genres: ['Fantasy', 'Romance', 'BookTok', 'Trending'],
    trending: true
  },
  {
    id: 'song-achilles',
    title: 'The Song of Achilles',
    author: 'Madeline Miller',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780062060624-L.jpg',
    rating: 4.9,
    description: 'A breathtaking reimagining of the myth of Achilles.',
    genres: ['Mythology', 'Romance', 'BookTok'],
    trending: true
  },
  {
    id: 'a-little-life',
    title: 'A Little Life',
    author: 'Hanya Yanagihara',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780385539258-L.jpg',
    rating: 4.6,
    description: 'A deeply moving story of four friends in New York City.',
    genres: ['Literary Fiction', 'Emotional Damage', 'BookTok'],
    trending: true
  },
  {
    id: 'silent-patient',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg',
    rating: 4.5,
    description: 'A shocking psychological thriller.',
    genres: ['Thriller', 'Psychological', 'BookTok'],
    trending: true
  },
  {
    id: 'evelyn-hugo',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781501161933-L.jpg',
    rating: 4.8,
    description: 'An aging Hollywood movie icon tells her glamorous and scandalous life story.',
    genres: ['Historical Fiction', 'BookTok', 'Romance'],
    trending: true
  },
  {
    id: 'tomorrow-x3',
    title: 'Tomorrow, and Tomorrow, and Tomorrow',
    author: 'Gabrielle Zevin',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780593321201-L.jpg',
    rating: 4.7,
    description: 'A story of two friends who become creative partners in video game design.',
    genres: ['Contemporary', 'BookTok'],
    trending: true
  },
  {
    id: 'yellowface',
    title: 'Yellowface',
    author: 'R.F. Kuang',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780063250833-L.jpg',
    rating: 4.4,
    description: 'A satire on the publishing industry and a thriller about cultural appropriation.',
    genres: ['Contemporary', 'Satire', 'BookTok'],
    trending: true
  },

  // Dystopian Essentials
  {
    id: '1984',
    title: '1984',
    author: 'George Orwell',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
    rating: 4.8,
    description: 'A classic dystopian social science fiction novel.',
    genres: ['Dystopian', 'Classics']
  },
  {
    id: 'brave-new-world',
    title: 'Brave New World',
    author: 'Aldous Huxley',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780060850524-L.jpg',
    rating: 4.6,
    description: 'A novel about a society founded on scientific efficiency.',
    genres: ['Dystopian', 'Sci-Fi', 'Classics']
  },
  {
    id: 'hunger-games',
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780439023528-L.jpg',
    rating: 4.7,
    description: 'A teen girl competes in a deadly televised competition.',
    genres: ['Dystopian', 'YA']
  },
  {
    id: 'f451',
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781451673319-L.jpg',
    rating: 4.5,
    description: 'In a future where books are burned, one fireman discovers their power.',
    genres: ['Dystopian', 'Sci-Fi', 'Classics']
  },
  {
    id: 'handmaids-tale',
    title: 'The Handmaid\'s Tale',
    author: 'Margaret Atwood',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780385490818-L.jpg',
    rating: 4.7,
    description: 'A religious totalitarian state rules fixed roles for women.',
    genres: ['Dystopian', 'Literary Fiction']
  },
  {
    id: 'tender-flesh',
    title: 'Tender Is the Flesh',
    author: 'Agustina Bazterrica',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781982150921-L.jpg',
    rating: 4.3,
    description: 'A provocative dystopian novel where humans are bred for consumption.',
    genres: ['Dystopian', 'Horror']
  },

  // Gothic & Dark Academia
  {
    id: 'dracula',
    title: 'Dracula',
    author: 'Bram Stoker',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780141439846-L.jpg',
    rating: 4.6,
    description: 'The foundational gothic horror novel.',
    genres: ['Gothic', 'Horror', 'Classics']
  },
  {
    id: 'frankenstein',
    title: 'Frankenstein',
    author: 'Mary Shelley',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780141439471-L.jpg',
    rating: 4.5,
    description: 'The story of Victor Frankenstein and his tragic creation.',
    genres: ['Gothic', 'Sci-Fi', 'Classics']
  },
  {
    id: 'jane-eyre',
    title: 'Jane Eyre',
    author: 'Charlotte Brontë',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780141441146-L.jpg',
    rating: 4.8,
    description: 'A spirited governess falls in love with her mysterious employer.',
    genres: ['Gothic', 'Romance', 'Classics']
  },
  {
    id: 'dorian-gray',
    title: 'The Picture of Dorian Gray',
    author: 'Oscar Wilde',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780141439570-L.jpg',
    rating: 4.7,
    description: 'A man sells his soul for eternal youth.',
    genres: ['Gothic', 'Philosophy', 'Classics']
  },
  {
    id: 'mexican-gothic',
    title: 'Mexican Gothic',
    author: 'Silvia Moreno-Garcia',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780525620785-L.jpg',
    rating: 4.4,
    description: 'Gothic horror set in 1950s Mexico.',
    genres: ['Gothic', 'Horror']
  },
  {
    id: 'villains',
    title: 'If We Were Villains',
    author: 'M.L. Rio',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781250095282-L.jpg',
    rating: 4.6,
    description: 'Dark academia mystery centered on Shakespearean actors.',
    genres: ['Dark Academia', 'Mystery', 'Thriller']
  },
  {
    id: 'secret-history',
    title: 'The Secret History',
    author: 'Donna Tartt',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780679732259-L.jpg',
    rating: 4.8,
    description: 'Clever outcasts discover a world beyond their own.',
    genres: ['Dark Academia', 'Mystery']
  },

  // Fantasy & Sci-Fi
  {
    id: 'hobbit',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg',
    rating: 4.9,
    description: 'A hobbit leaves home to help reclaim treasure.',
    genres: ['Fantasy', 'Classics']
  },
  {
    id: 'six-of-crows',
    title: 'Six of Crows',
    author: 'Leigh Bardugo',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781627792127-L.jpg',
    rating: 4.8,
    description: 'A criminal prodigy and his crew attempt a heist.',
    genres: ['Fantasy', 'YA', 'Heist']
  },
  {
    id: 'priory-orange',
    title: 'The Priory of the Orange Tree',
    author: 'Samantha Shannon',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781635570298-L.jpg',
    rating: 4.5,
    description: 'Epic high fantasy inspired by the legend of Saint George.',
    genres: ['Fantasy', 'Epic Fantasy']
  },
  {
    id: 'babel',
    title: 'Babel',
    author: 'R.F. Kuang',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780063021426-L.jpg',
    rating: 4.7,
    description: 'Historical fantasy about the power of language.',
    genres: ['Fantasy', 'Historical Fiction', 'Dark Academia']
  },
  {
    id: 'dune',
    title: 'Dune',
    author: 'Frank Herbert',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg',
    rating: 4.8,
    description: 'The epic sci-fi masterpiece set on Arrakis.',
    genres: ['Sci-Fi', 'Epic Fantasy']
  },
  {
    id: 'name-wind',
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780756404741-L.jpg',
    rating: 4.8,
    description: 'The autobiography of a world-renowned hero.',
    genres: ['Fantasy', 'Epic Fantasy']
  },

  // Psychological Spiral
  {
    id: 'crime-punishment',
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780140449136-L.jpg',
    rating: 4.7,
    description: 'Psychological exploration of a man driven to murder.',
    genres: ['Psychological', 'Philosophy', 'Classics']
  },
  {
    id: 'bell-jar',
    title: 'The Bell Jar',
    author: 'Sylvia Plath',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780060837020-L.jpg',
    rating: 4.6,
    description: 'A young woman\'s descent into mental illness.',
    genres: ['Psychological', 'Literary Fiction']
  },
  {
    id: 'norwegian-wood',
    title: 'Norwegian Wood',
    author: 'Haruki Murakami',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780375704079-L.jpg',
    rating: 4.5,
    description: 'Story of young love and loss in 1960s Tokyo.',
    genres: ['Contemporary', 'Literary Fiction', 'Emotional Damage']
  },
  {
    id: 'no-longer-human',
    title: 'No Longer Human',
    author: 'Osamu Dazai',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780811204811-L.jpg',
    rating: 4.6,
    description: 'Novel of total alienation and self-doubt.',
    genres: ['Psychological', 'Literary Fiction', 'Emotional Damage']
  },
  {
    id: 'virgin-suicides',
    title: 'The Virgin Suicides',
    author: 'Jeffrey Eugenides',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780446670258-L.jpg',
    rating: 4.4,
    description: 'The story of five sisters in suburban America.',
    genres: ['Literary Fiction', 'Emotional Damage']
  },
  {
    id: 'year-rest',
    title: 'My Year of Rest and Relaxation',
    author: 'Ottessa Moshfegh',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780525522119-L.jpg',
    rating: 4.2,
    description: 'A woman tries to sleep for a year to reset her life.',
    genres: ['Contemporary', 'Psychological']
  },

  // OG Classics
  {
    id: 'pride-prejudice',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg',
    rating: 4.9,
    description: 'The timeless romance of Elizabeth Bennet and Mr. Darcy.',
    genres: ['Romance', 'Classics']
  },
  {
    id: 'wuthering-heights',
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780141439556-L.jpg',
    rating: 4.6,
    description: 'A dark tale of passionate and destructive love.',
    genres: ['Gothic', 'Classics', 'Romance']
  },
  {
    id: 'gatsby',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
    rating: 4.5,
    description: 'The pursuit of the American Dream in the 1920s.',
    genres: ['Classics', 'Literary Fiction']
  },
  {
    id: 'catcher-rye',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780316769488-L.jpg',
    rating: 4.3,
    description: 'Holden Caulfield\'s search for truth in NYC.',
    genres: ['Classics', 'YA']
  },
  {
    id: 'mockingbird',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg',
    rating: 4.9,
    description: 'Story of racial injustice in the American South.',
    genres: ['Classics', 'Literary Fiction']
  },
  {
    id: 'anna-karenina',
    title: 'Anna Karenina',
    author: 'Leo Tolstoy',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780143035008-L.jpg',
    rating: 4.8,
    description: 'A panoramic study of high-society life in Russia.',
    genres: ['Classics', 'Literary Fiction']
  },
  // Romantic Collection
  {
    id: 'fault-stars',
    title: 'The Fault in Our Stars',
    author: 'John Green',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780525478812-L.jpg',
    rating: 4.7,
    description: 'Two teenagers meet at a cancer support group.',
    genres: ['Romance', 'YA', 'Contemporary']
  },
  {
    id: 'me-before-you',
    title: 'Me Before You',
    author: 'Jojo Moyes',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780143124542-L.jpg',
    rating: 4.6,
    description: 'A story of an unlikely bond between a caregiver and her patient.',
    genres: ['Romance', 'Contemporary']
  },
  {
    id: 'it-ends-us',
    title: 'It Ends With Us',
    author: 'Colleen Hoover',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg',
    rating: 4.7,
    description: 'A story of love, pain, and the courage to make hard choices.',
    genres: ['Romance', 'Contemporary']
  },
  {
    id: 'love-other-words',
    title: 'Love and Other Words',
    author: 'Christina Lauren',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781501128011-L.jpg',
    rating: 4.5,
    description: 'A heartwarming story of childhood friends finding their way back to each other.',
    genres: ['Romance', 'Contemporary']
  },
  {
    id: 'love-hypothesis',
    title: 'The Love Hypothesis',
    author: 'Ali Hazelwood',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781984806093-L.jpg',
    rating: 4.4,
    description: 'A fake dating scenario in academia.',
    genres: ['Romance', 'Contemporary', 'BookTok']
  },
  {
    id: 'beach-read',
    title: 'Beach Read',
    author: 'Emily Henry',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781984806734-L.jpg',
    rating: 4.3,
    description: 'Two writers spend a summer challenging each other.',
    genres: ['Romance', 'Contemporary', 'BookTok']
  },
  {
    id: 'book-lovers',
    title: 'Book Lovers',
    author: 'Emily Henry',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780593334836-L.jpg',
    rating: 4.5,
    description: 'A literary agent finds herself in a romance trope.',
    genres: ['Romance', 'Contemporary', 'BookTok']
  },
  {
    id: 'twisted-love',
    title: 'Twisted Love',
    author: 'Ana Huang',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9798481489438-L.jpg',
    rating: 4.2,
    description: 'A dark contemporary romance.',
    genres: ['Romance', 'Contemporary', 'BookTok']
  },
  {
    id: 'archers-voice',
    title: 'Archer’s Voice',
    author: 'Mia Sheridan',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781455554379-L.jpg',
    rating: 4.6,
    description: 'A deeply emotional story of healing and love.',
    genres: ['Romance', 'Contemporary']
  },
  {
    id: 'better-than-movies',
    title: 'Better Than the Movies',
    author: 'Lynn Painter',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781534467620-L.jpg',
    rating: 4.4,
    description: 'A rom-com lover finds her own reality better than the movies.',
    genres: ['Romance', 'YA', 'Contemporary']
  },
  {
    id: 'rwrb',
    title: 'Red, White & Royal Blue',
    author: 'Casey McQuiston',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781250316776-L.jpg',
    rating: 4.7,
    description: 'A story of the son of the American President and a British Prince.',
    genres: ['Romance', 'Contemporary', 'BookTok']
  },
  {
    id: 'normal-people',
    title: 'Normal People',
    author: 'Sally Rooney',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781984822178-L.jpg',
    rating: 4.1,
    description: 'A complex story of two people navigating love and power dynamics.',
    genres: ['Romance', 'Contemporary', 'Literary Fiction']
  },
  {
    id: 'the-notebook',
    title: 'The Notebook',
    author: 'Nicholas Sparks',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780446605236-L.jpg',
    rating: 4.8,
    description: 'The legendary story of Noah and Allie.',
    genres: ['Romance', 'Contemporary', 'Classics']
  }
];
