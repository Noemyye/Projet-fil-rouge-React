import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Home from './pages/Home.tsx'
import Header from './components/Header.tsx'
import Profil from './pages/Profil.tsx'
import Auth from './pages/Auth.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Header/>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/marvel" replace />} />
          <Route path="/marvel" element={<Home sagaId="marvel" />} />
          <Route path="/the-hunger-games" element={<Home sagaId="hunger-games" />} />
          <Route path="/star-wars" element={<Home sagaId="star-wars" />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/auth/:mode" element={<Auth />} />
          <Route path="/login" element={<Navigate to="/auth/login" replace />} />
          <Route path="/signup" element={<Navigate to="/auth/signup" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>,
)
