import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import HomePage          from './pages/HomePage'
import ProductsPage      from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ServicesPage      from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import AboutPage         from './pages/AboutPage'
import ContactPage       from './pages/ContactPage'
import UsedPage          from './pages/UsedPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"                   element={<HomePage />} />
          <Route path="/products"           element={<ProductsPage />} />
          <Route path="/products/:id"       element={<ProductDetailPage />} />
          <Route path="/used"               element={<UsedPage />} />
          <Route path="/services"           element={<ServicesPage />} />
          <Route path="/services/:slug"     element={<ServiceDetailPage />} />
          <Route path="/about"              element={<AboutPage />} />
          <Route path="/contact"            element={<ContactPage />} />
          <Route path="*"                   element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}