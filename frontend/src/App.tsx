
import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="rounded-3xl border border-neutral-800 p-8 bg-neutral-900/40">
      <h1 className="text-3xl font-bold">Game Over – Digital Services</h1>
      <p className="text-neutral-300 mt-2">Profili PS4/PS5 e servizi streaming (demo). Consegna immediata e checkout mock.</p>
      <div className="mt-4 space-x-3">
        <Link to="/catalogo" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20">Vai al catalogo</Link>
        <Link to="/checkout" className="px-4 py-2 rounded-xl bg-emerald-600/80 hover:bg-emerald-600">Checkout</Link>
      </div>
    </div>
  )
}
