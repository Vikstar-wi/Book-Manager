import { useState } from 'react'
import { useBookStore } from '../store/bookStore'
import SearchBar from '../components/SearchBar'
import GenreFilter from '../components/GenreFilter'
import BookGrid from '../components/BookGrid'
import BookModal from '../components/BookModal'
import BookForm from '../components/BookForm'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal'
import GoogleBooksSearch from '../components/GoogleBooksSearch'
import Modal from '../components/Modal'
import toast from 'react-hot-toast'

export default function HomePage() {
  const books = useBookStore((s) => s.books)
  const updateBook = useBookStore((s) => s.updateBook)
  const deleteBook = useBookStore((s) => s.deleteBook)
  const setSelectedBook = useBookStore((s) => s.setSelectedBook)

  const [editTarget, setEditTarget] = useState(null)   // book being edited
  const [deleteTarget, setDeleteTarget] = useState(null) // book to delete

  const handleEdit = (book) => {
    setSelectedBook(null) // close detail modal if open
    setEditTarget(book)
  }

  const handleDelete = (book) => {
    setSelectedBook(null)
    setDeleteTarget(book)
  }

  const handleEditSubmit = async (data) => {
    await updateBook(editTarget.id, { ...editTarget, ...data })
    toast.success('Book updated!')
    setEditTarget(null)
  }

  const handleDeleteConfirm = async () => {
    await deleteBook(deleteTarget.id)
    setDeleteTarget(null)
  }

  return (
    <>
      {/* Page header with stats */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Your Library</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {books.length} {books.length === 1 ? 'book' : 'books'} in your collection
        </p>
      </div>

      {/* Search + filter toolbar */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <SearchBar />
        <GenreFilter />
      </div>

      {/* Main book grid */}
      <BookGrid onEdit={handleEdit} onDelete={handleDelete} />

      {/* Google Books import section */}
      <div className="mt-10">
        <GoogleBooksSearch />
      </div>

      {/* Detail modal (self-managed via Zustand selectedBook) */}
      <BookModal />

      {/* Edit modal (triggered from card or detail modal) */}
      <Modal
        isOpen={!!editTarget}
        onClose={() => setEditTarget(null)}
        title="Edit Book"
      >
        <BookForm
          defaultValues={editTarget}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditTarget(null)}
        />
      </Modal>

      {/* Delete confirmation */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        book={deleteTarget}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  )
}
