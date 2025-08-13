
import React, { useMemo, useState } from 'react'
import { useCart } from '../store/cart'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {
  const items = useCart(s => s.items)
  const clear = useCart(s => s.clear)
  const [email, setEmail] = useState('')
  const nav = useNavigate()

  const total = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items])

  async function createOrder() {
    const base = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api'
    const res = await fetch(base + '/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, cart: items })
    })
    const data = await res.json()
    if (!res.ok) { alert('Errore ordine: ' + (data?.error || '')); return }
    // mock pay
    const pay = await fetch(base + '/orders/pay/mock/' + data.orderId, { method: 'POST' })
    const payData = await pay.json()
    if (!pay.ok) { alert('Errore pagamento: ' + (payData?.error || '')); return }
    clear()
    nav('/ordine/' + data.orderId)
  }

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-semibold">Checkout</h2>
      <div className="mt-3 rounded-2xl border border-neutral-800 p-4 bg-neutral-900/40">
        <div className="text-sm text-neutral-300">Articoli nel carrello: <b>{total}</b></div>
        <label className="block text-sm mt-3">Email per consegna</label>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="nome@esempio.it" className="w-full px-3 py-2 rounded-xl border border-neutral-800 bg-neutral-900/50" />
        <button onClick={createOrder} className="mt-4 w-full px-4 py-2 rounded-xl bg-emerald-600/80 hover:bg-emerald-600">Paga (mock) & ricevi accesso</button>
      </div>
    </div>
  )
}
