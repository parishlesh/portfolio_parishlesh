import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer position="top-right" autoClose={3000} newestOnTop closeOnClick pauseOnHover theme="light" transition={Bounce} />
  </React.StrictMode>
)
