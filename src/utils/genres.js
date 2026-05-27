
export function getUniqueGenres(books) {
  const genres = books.map((b) => b.genre)
  return ['All', ...Array.from(new Set(genres)).sort()]
}

export const GENRE_COLORS = {
  'Self Help':   'bg-emerald-100 text-emerald-700',
  Productivity:  'bg-blue-100 text-blue-700',
  Finance:       'bg-yellow-100 text-yellow-700',
  'Sci-Fi':      'bg-violet-100 text-violet-700',
  Dystopian:     'bg-red-100 text-red-700',
  Programming:   'bg-cyan-100 text-cyan-700',
  Fiction:       'bg-orange-100 text-orange-700',
  Business:      'bg-indigo-100 text-indigo-700',
  History:       'bg-stone-100 text-stone-700',
  Romance:       'bg-pink-100 text-pink-700',
  Classic:       'bg-teal-100 text-teal-700',
  General:       'bg-gray-100 text-gray-600',
}

export function genreColor(genre) {
  return GENRE_COLORS[genre] || 'bg-gray-100 text-gray-600'
}
