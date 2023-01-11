import React from 'react'
import ReactDOM from 'react-dom/client'
import User from './pages/user'
import Oper from './pages/oper'
import './index.css'
import { Routes, Route, Outlet, NavLink } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <BrowserRouter>
      <Routes>
          <Route path="user/:code/:name/:email/:sede" element={<User />} />
          <Route path="oper" element={<Oper />} />
      </Routes>
      </BrowserRouter>
  </React.StrictMode>
)
