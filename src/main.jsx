import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SanctuaryProvider } from './context/SanctuaryContext'
import App from './App.jsx'
import './index.css'
import './ablute-bridge'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SanctuaryProvider>
        <App />
      </SanctuaryProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
