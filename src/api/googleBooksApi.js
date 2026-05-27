import axios from 'axios'

const BASE = import.meta.env.VITE_GOOGLE_BOOKS_API
const KEY  = import.meta.env.VITE_GOOGLE_BOOKS_KEY

export const searchGoogleBooks = async (query) => {
  const res = await axios.get(`${BASE}/volumes`, {
    params: {
      q: query,
      maxResults: 12,
      key: KEY,
    },
  })

  return (res.data.items || []).map((item) => {
    const info = item.volumeInfo
    return {
      googleId: item.id,
      title: info.title || 'Unknown Title',
      author: info.authors?.join(', ') || 'Unknown Author',
      genre: info.categories?.[0] || 'General',
      publicationYear: info.publishedDate
        ? parseInt(info.publishedDate.slice(0, 4))
        : new Date().getFullYear(),
      description: info.description || '',
      coverImage:
        info.imageLinks?.thumbnail?.replace('http://', 'https://') || '',
    }
  })
}
