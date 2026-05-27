import axiosInstance from './axiosInstance'

export const bookApi = {
  // GET /books  →  returns array of all books
  getAll: () => axiosInstance.get('/books'),

  // POST /books  →  creates a new book, returns created object with id
  create: (data) => axiosInstance.post('/books', data),

  // PUT /books/:id  →  replaces book entirely, returns updated object
  update: (id, data) => axiosInstance.put(`/books/${id}`, data),

  // DELETE /books/:id  →  removes the books
  remove: (id) => axiosInstance.delete(`/books/${id}`),
}
