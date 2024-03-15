import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import UserContextProvider from './context/UserContextProvider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <UserContextProvider>
    <ToastContainer />
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </UserContextProvider>
    
  // </React.StrictMode>,
)
