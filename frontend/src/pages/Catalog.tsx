
import React, { useEffect, useMemo, useState } from 'react'
import { fetchProducts, Product } from '../data/products'
import { useCart } from '../store/cart'

export default function Catalog() {
  const [list, setList] = useState<Product[]>([])
  const [q, setQ] = useState('')
  useEffect(() => { fetchProducts().then(setList) }, [])
  const filtered = useMemo(() => list.filter(p => p.title.toLowerCase().includes(q.toLowerCase())), [list, q])
  const add = useCart(s => s.add)

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Catalogo</h2>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Cerca..." className="px-3 py-2 rounded-xl border border-neutral-800 bg-neutral-900/50" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filtered.map(p => (
          <div key={p.slug} className="rounded-2xl border border-neutral-800 p-4 bg-neutral-900/40">
            <div className="font-medium">{p.title}</div>
            <div className="text-xs text-neutral-400 capitalize">{p.category}</div>
            <ul className="text-sm mt-2 list-disc pl-5">
              {p.perks.slice(0,3).map((x,i) => <li key={i}>{x}</li>)}
            </ul>
            <div className="grid grid-cols-2 gap-2 mt-3">
              {p.durations.map((d, i) => (
                <button key={i} onClick={() => add({ productSlug: p.slug, durationIndex: i, qty: 1 })} className="rounded-xl border border-neutral-800 px-3 py-2 hover:bg-white/10">
                  <div className="text-xs text-neutral-400">{d.label}</div>
                  <div className="font-semibold">€ {d.priceEUR.toFixed(2)}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
