
import { Router } from 'express';
import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { nanoid } from 'nanoid';

export const router = Router();

router.post('/', async (req, res) => {
  const { email, cart } = req.body; // cart: [{productSlug, durationIndex, qty}]
  if (!email || !Array.isArray(cart) || cart.length === 0) return res.status(400).json({ error: 'email and cart required' });
  const products = await Product.find({ slug: { $in: cart.map(c => c.productSlug) } }).lean();
  const items = cart.map(c => {
    const p = products.find(x => x.slug === c.productSlug);
    if (!p) throw new Error('product not found: ' + c.productSlug);
    const d = p.durations[c.durationIndex];
    return { productSlug: p.slug, durationIndex: c.durationIndex, qty: c.qty, priceEUR: d.priceEUR };
  });
  const amountEUR = items.reduce((s, it) => s + it.priceEUR * it.qty, 0);
  const order = await Order.create({ email, items, amountEUR, status: 'pending' });
  res.json({ orderId: order._id, amountEUR });
});

// Mock pay (simula Stripe)
router.post('/pay/mock/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ error: 'order not found' });
  order.status = 'paid';
  // Fulfillment: genera credenziali dummy
  const creds = order.items.flatMap((it, idx) => {
    const arr = [];
    for (let i = 0; i < it.qty; i++) {
      arr.push(`user_${nanoid(6)}@example.com:pw_${nanoid(8)} (Prod:${it.productSlug} ${it.durationIndex})`);
    }
    return arr;
  });
  order.credentials = creds;
  order.status = 'fulfilled';
  await order.save();
  res.json({ ok: true, status: order.status, credentials: order.credentials });
});

router.get('/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId).lean();
  if (!order) return res.status(404).json({ error: 'order not found' });
  res.json(order);
});
