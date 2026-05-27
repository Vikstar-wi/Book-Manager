import { Loader2, Trash2 } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Modal from './Modal'

export default function ConfirmDeleteModal({ isOpen, book, onConfirm, onCancel }) {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await onConfirm()
      toast.success(`"${book?.title}" was deleted.`)
    } catch {
      toast.error('Could not delete. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="Delete Book" size="sm">
      <div className="p-6">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <Trash2 size={20} className="text-red-500" />
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-gray-900">"{book?.title}"</span>?
          This action cannot be undone.
        </p>
        <div className="flex gap-3 mt-6 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200
              rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white
              bg-red-500 hover:bg-red-600 disabled:opacity-60 rounded-xl transition-colors"
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </Modal>
  )
}
