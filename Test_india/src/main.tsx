import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AppContentProvider from './providers/appContentProviders/AppContentProviders.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContentProvider>
      <App />
    </AppContentProvider>

  </React.StrictMode>,
)
