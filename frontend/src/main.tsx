
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './styles.css'
import App from './pages/Home'
import Catalog from './pages/Catalog'
import Checkout from './pages/Checkout'
import OrderView from './pages/OrderView'

function Nav() {
  return (
    <nav className="border-b border-neutral-900 px-4 py-3 flex items-center justify-between">
      <Link to="/" className="font-semibold">Game Over</Link>
      <div className="space-x-4 text-sm">
        <Link to="/catalogo">Catalogo</Link>
        <Link to="/checkout">Checkout</Link>
      </div>
    </nav>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Nav />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/ordine/:id" element={<OrderView />} />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
)
