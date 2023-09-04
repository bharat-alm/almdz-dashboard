// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
// import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../src/App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <BrowserRouter>
  <App />
  
  </BrowserRouter>
  </>,
)
