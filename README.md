# 📚 Book Manager

A clean, modern Book Management System built with React + Vite + Tailwind CSS.
Supports full CRUD operations, real-time search, genre filtering, and Google Books import.

---

## 🔗 Live Demos

| Platform | URL |
|---|---|
| Netlify | https://book-manger.netlify.app/ |

---

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Dev server and bundler |
| Tailwind CSS | Utility-first styling |
| Zustand | Global state management |
| Axios | HTTP client |
| React Hook Form | Form state and validation |
| MockAPI | Hosted mock REST API (no cold starts) |
| Google Books API | External book search and import |
| Lucide React | Icons |
| React Hot Toast | Toast notifications |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Vikstar-wi/Book-Manger.git
cd Book-Manger
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=https://YOUR-ID.mockapi.io/api/v1
VITE_GOOGLE_BOOKS_API=https://www.googleapis.com/books/v1
VITE_GOOGLE_BOOKS_KEY=YOUR_GOOGLE_API_KEY
```

### 4. Start the dev server

```bash
npm run dev
```

Open `http://localhost:5173` — that is the only command you need.
There is no separate backend to run because the API is hosted on MockAPI.

---

## 📁 Project Structure

```
src/
│
├── api/
│   ├── axiosInstance.js       # Axios base config — baseURL and timeout
│   ├── bookApi.js             # CRUD calls to MockAPI
│   └── googleBooksApi.js      # Google Books search and data normalizer
│
├── components/
│   ├── Navbar.jsx             # Sticky header with Add Book button
│   ├── Modal.jsx              # Reusable modal wrapper (Escape, backdrop click)
│   ├── SearchBar.jsx          # Debounced search input
│   ├── GenreFilter.jsx        # Genre dropdown — auto-built from book data
│   ├── BookGrid.jsx           # Responsive card grid with loading and empty states
│   ├── BookCard.jsx           # Single book card with hover edit/delete actions
│   ├── BookModal.jsx          # Full detail popup with cover image
│   ├── BookForm.jsx           # Add and Edit form using React Hook Form
│   ├── ConfirmDeleteModal.jsx # Delete confirmation dialog
│   ├── GoogleBooksSearch.jsx  # Search and import from Google Books
│   ├── SkeletonCard.jsx       # Animated loading placeholder
│   └── EmptyState.jsx        # Empty library and no-results views
│
├── hooks/
│   └── useDebounce.js         # Delays value updates to avoid excess re-renders
│
├── layouts/
│   └── MainLayout.jsx         # Page shell — Navbar + centered content area
│
├── pages/
│   └── HomePage.jsx           # Main page composing all sections and modal state
│
├── store/
│   └── bookStore.js           # Zustand store — all state and async actions
│
└── utils/
    └── genres.js              # Unique genre list helper and genre color map
```

---

## ✨ Features

- **View books** in a responsive 4-column grid with real cover images
- **Add books** via modal form with full validation
- **Edit books** with a pre-filled form — updates instantly
- **Delete books** with a confirmation dialog before removal
- **Search** by title or author with 300ms debounce
- **Filter by genre** — dropdown auto-populates from your data
- **Book detail modal** — large cover, full metadata, description
- **Skeleton loading cards** while the API responds
- **Empty state** views for no books and no search results
- **Google Books import** — search and add any book directly to your library
- **Toast notifications** for every add, update, and delete action

---

## 🌐 Deployment

Both platforms read environment variables set in their dashboards.
The `.env` file is gitignored and never pushed to GitHub.

### Netlify

1. Connect your GitHub repo in the Netlify dashboard
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add all three environment variables under **Site Settings → Environment Variables**
5. The `netlify.toml` in the root handles SPA routing automatically

### Vercel

1. Import your GitHub repo in the Vercel dashboard
2. Vercel auto-detects Vite — no build settings needed
3. Add all three environment variables under **Project Settings → Environment Variables**

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Your MockAPI base URL |
| `VITE_GOOGLE_BOOKS_API` | Google Books API base URL |
| `VITE_GOOGLE_BOOKS_KEY` | Your Google Cloud API key (Books API enabled) |

> **Never commit your `.env` file.** Add variables directly in Netlify and Vercel dashboards for live deployments.

---

## 📐 Architecture Decisions

**Why Zustand over Redux?**
The app has one data domain (books). Zustand gives the same predictable state updates with a fraction of the boilerplate. The entire store including all actions is one readable file.

**Why MockAPI over json-server?**
json-server runs locally only. MockAPI is a hosted service — no cold starts, no separate terminal command, works identically in local dev and production.

**Why React Hook Form?**
Uncontrolled inputs mean no `useState` per field. Validation rules live next to the field registration. The form re-renders only on submit or error, not on every keystroke.

**Why debounce the search?**
Without debounce, every keystroke triggers a filter computation and a Zustand state update. With 300ms debounce, the filter only runs when the user pauses — smoother on slow devices.
