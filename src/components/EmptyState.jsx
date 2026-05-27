import { BookOpen, SearchX } from 'lucide-react'

export default function EmptyState({ hasFilters }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        {hasFilters
          ? <SearchX size={28} className="text-gray-400" />
          : <BookOpen size={28} className="text-gray-400" />}
      </div>
      <h3 className="text-base font-semibold text-gray-700 mb-1">
        {hasFilters ? 'No books match your search' : 'Your library is empty'}
      </h3>
      <p className="text-sm text-gray-400 max-w-xs">
        {hasFilters
          ? 'Try adjusting your search term or genre filter.'
          : 'Add your first book using the "Add Book" button above.'}
      </p>
    </div>
  )
}
