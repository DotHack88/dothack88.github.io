
import { Router } from 'express';
export const router = Router();
// Placeholder per Stripe webhook; da abilitare in produzione
router.post('/stripe', (req, res) => {
  return res.json({ ok: true });
});
