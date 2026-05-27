import { useEffect } from 'react'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import { useBookStore } from './store/bookStore'

export default function App() {
  const fetchBooks = useBookStore((s) => s.fetchBooks)

  useEffect(() => {
    fetchBooks()
  }, [fetchBooks])

  return (
    <MainLayout>
      <HomePage />
    </MainLayout>
  )
}
