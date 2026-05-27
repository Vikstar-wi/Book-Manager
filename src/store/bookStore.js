import { create } from 'zustand'
import { bookApi } from '../api/bookApi'

export const useBookStore = create((set, get) => ({
  // ── State ───
  books: [],
  loading: false,
  error: null,
  selectedBook: null,
  searchTerm: '',
  genreFilter: 'All',

  filteredBooks: () => {
    const { books, searchTerm, genreFilter } = get()
    const q = searchTerm.toLowerCase()
    return books.filter((b) => {
      const matchSearch =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
      const matchGenre = genreFilter === 'All' || b.genre === genreFilter
      return matchSearch && matchGenre
    })
  },

  // ── Actions ──

  fetchBooks: async () => {
    set({ loading: true, error: null })
    try {
      const res = await bookApi.getAll()
      set({ books: res.data, loading: false })
    } catch (err) {
      set({ error: err.message, loading: false })
    }
  },

  addBook: async (bookData) => {
    const res = await bookApi.create(bookData)
    set((s) => ({ books: [res.data, ...s.books] }))
    return res.data
  },

  updateBook: async (id, bookData) => {
    const res = await bookApi.update(id, bookData)
    set((s) => ({
      books: s.books.map((b) => (b.id === id ? res.data : b)),
      selectedBook: s.selectedBook?.id === id ? res.data : s.selectedBook,
    }))
    return res.data
  },

  deleteBook: async (id) => {
    await bookApi.remove(id)
    set((s) => ({
      books: s.books.filter((b) => b.id !== id),
      selectedBook: null,
    }))
  },


  setSelectedBook: (book) => set({ selectedBook: book }),

  setSearchTerm: (term) => set({ searchTerm: term }),

  setGenreFilter: (genre) => set({ genreFilter: genre }),
}))
