import { useState } from 'react'
import { Search, PlusCircle, Loader2, BookMarked } from 'lucide-react'
import { searchGoogleBooks } from '../api/googleBooksApi'
import { useBookStore } from '../store/bookStore'
import { genreColor } from '../utils/genres'
import { useDebounce } from '../hooks/useDebounce'
import toast from 'react-hot-toast'

export default function GoogleBooksSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [addingId, setAddingId] = useState(null)
  const [searched, setSearched] = useState(false)
  const addBook = useBookStore((s) => s.addBook)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setSearching(true)
    setSearched(true)
    try {
      const data = await searchGoogleBooks(query)
      setResults(data)
    } catch {
      toast.error('Google Books search failed.')
    } finally {
      setSearching(false)
    }
  }

  const handleAdd = async (book) => {
    setAddingId(book.googleId)
    try {
      await addBook({
        title: book.title,
        author: book.author,
        genre: book.genre,
        publicationYear: book.publicationYear,
        description: book.description,
        coverImage: book.coverImage,
      })
      toast.success(`"${book.title}" added to your library!`)
      // Remove from results so it can't be added twice
      setResults((r) => r.filter((b) => b.googleId !== book.googleId))
    } catch {
      toast.error('Failed to add book.')
    } finally {
      setAddingId(null)
    }
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-5">
      {/* Section header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center">
          <BookMarked size={14} className="text-violet-600" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Import from Google Books</h2>
          <p className="text-xs text-gray-400">Search and add books directly to your library</p>
        </div>
      </div>

      {/* Search form */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Google Books…"
            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50
              focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
          />
        </div>
        <button
          type="submit"
          disabled={searching || !query.trim()}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white
            bg-violet-600 hover:bg-violet-700 disabled:opacity-60 rounded-xl transition-colors shrink-0"
        >
          {searching ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
          Search
        </button>
      </form>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-4 space-y-2 max-h-72 overflow-y-auto pr-1">
          {results.map((book) => (
            <div
              key={book.googleId}
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition"
            >
              {/* Tiny cover thumbnail */}
              {book.coverImage ? (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-9 h-12 object-cover rounded-md shrink-0 shadow-sm"
                />
              ) : (
                <div className="w-9 h-12 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                  <BookMarked size={14} className="text-gray-300" />
                </div>
              )}

              {/* Book info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{book.title}</p>
                <p className="text-xs text-gray-500 truncate">{book.author} · {book.publicationYear}</p>
                <span className={`mt-1 inline-block text-xs px-2 py-0.5 rounded-full ${genreColor(book.genre)}`}>
                  {book.genre}
                </span>
              </div>

              {/* Add button */}
              <button
                onClick={() => handleAdd(book)}
                disabled={addingId === book.googleId}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-violet-600
                  border border-violet-200 bg-violet-50 hover:bg-violet-100 disabled:opacity-60
                  rounded-lg transition-colors shrink-0"
              >
                {addingId === book.googleId
                  ? <Loader2 size={12} className="animate-spin" />
                  : <PlusCircle size={12} />}
                Add
              </button>
            </div>
          ))}
        </div>
      )}

      {searched && !searching && results.length === 0 && (
        <p className="mt-4 text-sm text-gray-400 text-center py-4">
          No results found. Try a different search.
        </p>
      )}
    </div>
  )
}
