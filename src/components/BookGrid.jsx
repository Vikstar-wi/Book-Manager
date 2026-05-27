import { useBookStore } from '../store/bookStore'
import BookCard from './BookCard'
import SkeletonCard from './SkeletonCard'
import EmptyState from './EmptyState'

export default function BookGrid({ onEdit, onDelete }) {
  const loading = useBookStore((s) => s.loading)
  const filteredBooks = useBookStore((s) => s.filteredBooks)
  const searchTerm = useBookStore((s) => s.searchTerm)
  const genreFilter = useBookStore((s) => s.genreFilter)

  const books = filteredBooks()

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <EmptyState
        hasFilters={!!searchTerm || genreFilter !== 'All'}
      />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
