import { useState } from 'react'
import { Edit2, Trash2, BookOpen } from 'lucide-react'
import { genreColor } from '../utils/genres'
import { useBookStore } from '../store/bookStore'

export default function BookCard({ book, onEdit, onDelete }) {
  const setSelectedBook = useBookStore((s) => s.setSelectedBook)
  const [imgError, setImgError] = useState(false)

  return (
    <div
      className="group bg-white rounded-2xl border border-gray-100 shadow-card
        hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 overflow-hidden cursor-pointer"
      onClick={() => setSelectedBook(book)}
    >
      {/* Cover image area */}
      <div className="relative h-52 bg-gray-100 overflow-hidden">
        {book.coverImage && !imgError ? (
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        ) : (
          // Fallback placeholder when no image or broken URL
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-50 to-indigo-100">
            <BookOpen size={36} className="text-blue-300" />
            <span className="text-xs text-blue-400 font-medium">No cover</span>
          </div>
        )}

        {/* Dark gradient at bottom of cover for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Genre pill overlaid on image */}
        <span
          className={`absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full
            backdrop-blur-sm bg-white/80 ${genreColor(book.genre)}`}
        >
          {book.genre}
        </span>

        {/* Action buttons – only visible on hover (desktop) */}
        <div
          className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onEdit(book)}
            className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center
              text-gray-600 hover:text-blue-600 hover:bg-white shadow-sm transition-colors"
            title="Edit book"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => onDelete(book)}
            className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center
              text-gray-600 hover:text-red-600 hover:bg-white shadow-sm transition-colors"
            title="Delete book"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mb-1">
          {book.title}
        </h3>
        <p className="text-xs text-gray-500 mb-3">{book.author}</p>
        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
          {book.description || 'No description available.'}
        </p>
        <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
          <span className="text-xs text-gray-400">{book.publicationYear}</span>
          <span className="text-xs text-blue-500 font-medium group-hover:underline">
            View details →
          </span>
        </div>
      </div>
    </div>
  )
}
