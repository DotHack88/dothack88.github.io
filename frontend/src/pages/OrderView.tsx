
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function OrderView() {
  const { id } = useParams()
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    const base = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api'
    fetch(base + '/orders/' + id).then(r => r.json()).then(setOrder)
  }, [id])

  if (!order) return <div>Caricamento...</div>
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold">Ordine</h2>
      <div className="mt-3 rounded-2xl border border-neutral-800 p-4 bg-neutral-900/40">
        <div className="text-sm">ID: {order._id}</div>
        <div className="text-sm">Stato: <b className="capitalize">{order.status}</b></div>
        <div className="mt-3">
          <div className="text-sm font-medium">Credenziali generate</div>
          <ul className="text-sm mt-1 list-disc pl-5">
            {(order.credentials || []).map((c: string, i: number) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}
