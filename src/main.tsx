import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './index.css'
import Home from './pages/Home.tsx'
import Header from './components/Header.tsx'
import Profil from './pages/Profil.tsx'
import Auth from './pages/Auth.tsx'
import Movie from './pages/Movie.tsx'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Header/>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/marvel" replace />} />
          <Route path="/marvel" element={<Home sagaId="marvel" />} />
          <Route path="/the-hunger-games" element={<Home sagaId="hungergames" />} />
          <Route path="/star-wars" element={<Home sagaId="starwars" />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/auth/:mode" element={<Auth />} />
          <Route path="/login" element={<Navigate to="/auth/login" replace />} />
          <Route path="/signup" element={<Navigate to="/auth/signup" replace />} />
          <Route path="/film/:id" element={<Movie />}/>
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>,
)
