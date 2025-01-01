import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CssBaseline } from "@mui/material"
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from "react-helmet-async"
import { Provider } from 'react-redux'
import {store} from "./redux/store.js"


createRoot(document.getElementById('root')).render(

  <StrictMode>

    <Provider store={store}>

      <HelmetProvider>

        <BrowserRouter>

          <CssBaseline />

          <div onContextMenu={(e) => e.preventDefault()}>
            <App />
          </div>

        </BrowserRouter>

      </HelmetProvider>

    </Provider>

  </StrictMode>

)
