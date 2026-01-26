import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home.tsx'
import Header from './components/Header.tsx'
import Panel_Left from './components/Panel_Left.tsx'
import Profil from './pages/Profil.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Header/>
      <div className='flex justify-center'>
        <Panel_Left/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
        <div className='w-100  h-100 px-10'/>
      </div>
    </BrowserRouter>
  </StrictMode>,
)
