
export type Duration = { label: string; months: number; priceEUR: number }
export type Product = {
  slug: string
  title: string
  category: 'games' | 'streaming' | 'music'
  durations: Duration[]
  perks: string[]
  rating: number
  featured: boolean
  vendorSafe: boolean
}

export async function fetchProducts() : Promise<Product[]> {
  const base = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api'
  const res = await fetch(base + '/products')
  return await res.json()
}
