import React from 'react'
import ReactDOM from 'react-dom/client'
import { ForecastContext } from "/src/Context-Api/ForecastContext"
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ForecastContext>
        <App />
      </ForecastContext>
    </BrowserRouter>

  </React.StrictMode>,
)
