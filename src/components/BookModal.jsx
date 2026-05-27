import { useState } from 'react'
import { Edit2, Trash2, BookOpen, Calendar, User, Tag } from 'lucide-react'
import { useBookStore } from '../store/bookStore'
import { genreColor } from '../utils/genres'
import Modal from './Modal'
import BookForm from './BookForm'
import ConfirmDeleteModal from './ConfirmDeleteModal'

export default function BookModal() {
  const selectedBook = useBookStore((s) => s.selectedBook)
  const setSelectedBook = useBookStore((s) => s.setSelectedBook)
  const updateBook = useBookStore((s) => s.updateBook)
  const deleteBook = useBookStore((s) => s.deleteBook)

  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [imgError, setImgError] = useState(false)

  if (!selectedBook) return null

  const handleEdit = async (data) => {
    await updateBook(selectedBook.id, { ...selectedBook, ...data })
    setShowEdit(false)
  }

  const handleDelete = async () => {
    await deleteBook(selectedBook.id)
    setShowDelete(false)
  }

  return (
    <>
      <Modal
        isOpen={!!selectedBook && !showEdit && !showDelete}
        onClose={() => setSelectedBook(null)}
        title="Book Details"
        size="lg"
      >
        <div className="p-6">
          <div className="flex gap-6 flex-col sm:flex-row">

            {/* Large cover */}
            <div className="shrink-0 w-full sm:w-44 h-64 sm:h-60 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 shadow-md">
              {selectedBook.coverImage && !imgError ? (
                <img
                  src={selectedBook.coverImage}
                  alt={selectedBook.title}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                  <BookOpen size={40} className="text-blue-300" />
                  <span className="text-xs text-blue-400">No cover</span>
                </div>
              )}
            </div>

            {/* Book details */}
            <div className="flex-1 min-w-0">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${genreColor(selectedBook.genre)}`}>
                {selectedBook.genre}
              </span>
              <h2 className="mt-3 text-xl font-bold text-gray-900 leading-tight">
                {selectedBook.title}
              </h2>

              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User size={14} className="text-gray-400 shrink-0" />
                  <span>{selectedBook.author}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={14} className="text-gray-400 shrink-0" />
                  <span>{selectedBook.publicationYear}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Tag size={14} className="text-gray-400 shrink-0" />
                  <span>{selectedBook.genre}</span>
                </div>
              </div>

              {selectedBook.description && (
                <p className="mt-4 text-sm text-gray-500 leading-relaxed line-clamp-3">
                  {selectedBook.description}
                </p>
              )}
            </div>
          </div>

          {/* Full description below the two-column area */}
          {selectedBook.description && (
            <div className="mt-6 pt-5 border-t border-gray-100">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                About this book
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {selectedBook.description}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-6 pt-5 border-t border-gray-100 flex gap-3 justify-end">
            <button
              onClick={() => setShowDelete(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600
                border border-red-200 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
            >
              <Trash2 size={14} />
              Delete
            </button>
            <button
              onClick={() => setShowEdit(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white
                bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
            >
              <Edit2 size={14} />
              Edit Book
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit modal (sub-modal) */}
      <Modal isOpen={showEdit} onClose={() => setShowEdit(false)} title="Edit Book">
        <BookForm
          defaultValues={selectedBook}
          onSubmit={handleEdit}
          onCancel={() => setShowEdit(false)}
        />
      </Modal>

      {/* Delete confirmation modal */}
      <ConfirmDeleteModal
        isOpen={showDelete}
        book={selectedBook}
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
      />
    </>
  )
}
