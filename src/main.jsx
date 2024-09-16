import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CssBaseline } from "@mui/material"
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from "react-helmet-async"


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>

        <CssBaseline />
        <App />

      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>

)
