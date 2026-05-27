import { useBookStore } from '../store/bookStore'
import { getUniqueGenres } from '../utils/genres'

export default function GenreFilter() {
  const books = useBookStore((s) => s.books)
  const genreFilter = useBookStore((s) => s.genreFilter)
  const setGenreFilter = useBookStore((s) => s.setGenreFilter)

  const genres = getUniqueGenres(books)

  return (
    <select
      value={genreFilter}
      onChange={(e) => setGenreFilter(e.target.value)}
      className="py-2.5 pl-3 pr-8 text-sm bg-white border border-gray-200 rounded-xl
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        text-gray-700 cursor-pointer transition"
    >
      {genres.map((g) => (
        <option key={g} value={g}>
          {g === 'All' ? 'All Genres' : g}
        </option>
      ))}
    </select>
  )
}
