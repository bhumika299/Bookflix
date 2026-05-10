export async function searchBooks(query: string) {
  if (!query) return [];
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10`);
    const data = await response.json();
    
    return data.items?.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors?.[0] || 'Unknown Author',
      coverUrl: item.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://images.unsplash.com/photo-1543004218-ee141d8ed692?auto=format&fit=crop&w=800&q=80',
      rating: item.volumeInfo.averageRating || 4.0,
      description: item.volumeInfo.description || 'No description available.',
      genres: item.volumeInfo.categories || ['General'],
    })) || [];
  } catch (error) {
    console.error("Search Error:", error);
    return [];
  }
}
