import { BookOpen, Plus } from 'lucide-react'
import { useState } from 'react'
import { useBookStore } from '../store/bookStore'
import BookForm from './BookForm'
import Modal from './Modal'

export default function Navbar() {
  const [showForm, setShowForm] = useState(false)
  const addBook = useBookStore((s) => s.addBook)

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <BookOpen size={18} className="text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900 tracking-tight">
              Book Manager
            </span>
          </div>

          {/* Add book CTA */}
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-150 shadow-sm"
          >
            <Plus size={16} />
            Add Book
          </button>
        </div>
      </header>

      {/* Add Book modal */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add New Book">
        <BookForm
          onSubmit={async (data) => {
            await addBook(data)
            setShowForm(false)
          }}
          onCancel={() => setShowForm(false)}
        />
      </Modal>
    </>
  )
}
