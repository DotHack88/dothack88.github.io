
import { create } from 'zustand'

export type CartItem = { productSlug: string; durationIndex: number; qty: number }

type CartState = {
  items: CartItem[]
  add: (item: CartItem) => void
  remove: (item: CartItem) => void
  clear: () => void
  setQty: (item: CartItem, qty: number) => void
}

export const useCart = create<CartState>((set) => ({
  items: [],
  add: (item) => set((s) => {
    const i = s.items.findIndex(x => x.productSlug === item.productSlug && x.durationIndex === item.durationIndex)
    if (i > -1) {
      const copy = [...s.items]
      copy[i] = { ...copy[i], qty: copy[i].qty + item.qty }
      return { items: copy }
    }
    return { items: [...s.items, item] }
  }),
  remove: (item) => set((s) => ({ items: s.items.filter(x => !(x.productSlug === item.productSlug && x.durationIndex === item.durationIndex)) })),
  clear: () => set({ items: [] }),
  setQty: (item, qty) => set((s) => ({ items: s.items.map(x => (x.productSlug === item.productSlug && x.durationIndex === item.durationIndex) ? { ...x, qty } : x) })),
}))
