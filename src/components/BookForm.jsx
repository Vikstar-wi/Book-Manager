import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const CURRENT_YEAR = new Date().getFullYear()

export default function BookForm({ defaultValues, onSubmit, onCancel }) {
  const [submitting, setSubmitting] = useState(false)
  const isEdit = !!defaultValues

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: defaultValues || {} })

  const submit = async (data) => {
    setSubmitting(true)
    try {
      await onSubmit({ ...data, publicationYear: Number(data.publicationYear) })
      toast.success(isEdit ? 'Book updated!' : 'Book added to your library!')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="p-6 space-y-4">

      {/* Title */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Title <span className="text-red-400">*</span>
        </label>
        <input
          {...register('title', { required: 'Title is required' })}
          placeholder="e.g. Atomic Habits"
          className={`w-full px-3.5 py-2.5 text-sm border rounded-xl bg-gray-50 focus:bg-white
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
            ${errors.title ? 'border-red-400' : 'border-gray-200'}`}
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Author */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Author <span className="text-red-400">*</span>
        </label>
        <input
          {...register('author', { required: 'Author is required' })}
          placeholder="e.g. James Clear"
          className={`w-full px-3.5 py-2.5 text-sm border rounded-xl bg-gray-50 focus:bg-white
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
            ${errors.author ? 'border-red-400' : 'border-gray-200'}`}
        />
        {errors.author && (
          <p className="mt-1 text-xs text-red-500">{errors.author.message}</p>
        )}
      </div>

      {/* Genre + Year side by side */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Genre <span className="text-red-400">*</span>
          </label>
          <input
            {...register('genre', { required: 'Genre is required' })}
            placeholder="e.g. Self Help"
            className={`w-full px-3.5 py-2.5 text-sm border rounded-xl bg-gray-50 focus:bg-white
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
              ${errors.genre ? 'border-red-400' : 'border-gray-200'}`}
          />
          {errors.genre && (
            <p className="mt-1 text-xs text-red-500">{errors.genre.message}</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Year <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            {...register('publicationYear', {
              required: 'Year is required',
              min: { value: 1000, message: 'Year must be after 1000' },
              max: { value: CURRENT_YEAR, message: `Year can't exceed ${CURRENT_YEAR}` },
            })}
            placeholder={String(CURRENT_YEAR)}
            className={`w-full px-3.5 py-2.5 text-sm border rounded-xl bg-gray-50 focus:bg-white
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
              ${errors.publicationYear ? 'border-red-400' : 'border-gray-200'}`}
          />
          {errors.publicationYear && (
            <p className="mt-1 text-xs text-red-500">{errors.publicationYear.message}</p>
          )}
        </div>
      </div>

      {/* Cover image URL */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Cover Image URL
        </label>
        <input
          {...register('coverImage', {
            validate: (v) =>
              !v || v.startsWith('http') || 'Must be a valid URL starting with http',
          })}
          placeholder="https://example.com/cover.jpg"
          className={`w-full px-3.5 py-2.5 text-sm border rounded-xl bg-gray-50 focus:bg-white
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
            ${errors.coverImage ? 'border-red-400' : 'border-gray-200'}`}
        />
        {errors.coverImage && (
          <p className="mt-1 text-xs text-red-500">{errors.coverImage.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-400">Leave blank to use a placeholder.</p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={3}
          placeholder="A short summary of the book…"
          className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50
            focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition resize-none"
        />
      </div>

      {/* Form actions */}
      <div className="flex gap-3 justify-end pt-2 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200
            rounded-xl hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white
            bg-blue-600 hover:bg-blue-700 disabled:opacity-60 rounded-xl transition-colors shadow-sm"
        >
          {submitting && <Loader2 size={14} className="animate-spin" />}
          {isEdit ? 'Save Changes' : 'Add Book'}
        </button>
      </div>
    </form>
  )
}
