import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#1e293b',
          color: '#f8fafc',
          borderRadius: '10px',
          fontSize: '14px',
          padding: '12px 16px',
        },
        success: {
          iconTheme: { primary: '#22c55e', secondary: '#f8fafc' },
        },
        error: {
          iconTheme: { primary: '#ef4444', secondary: '#f8fafc' },
        },
      }}
    />
  </React.StrictMode>,
)
