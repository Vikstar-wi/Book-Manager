import { Search, X } from 'lucide-react'
import { useBookStore } from '../store/bookStore'
import { useDebounce } from '../hooks/useDebounce'
import { useEffect, useState } from 'react'

export default function SearchBar() {
  const setSearchTerm = useBookStore((s) => s.setSearchTerm)
  const [value, setValue] = useState('')
  const debounced = useDebounce(value, 300)

  useEffect(() => {
    setSearchTerm(debounced)
  }, [debounced, setSearchTerm])

  return (
    <div className="relative flex-1 min-w-[240px]">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by title or author…"
        className="w-full pl-9 pr-9 py-2.5 text-sm bg-white border border-gray-200 rounded-xl
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          placeholder:text-gray-400 transition"
      />
      {value && (
        <button
          onClick={() => setValue('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
