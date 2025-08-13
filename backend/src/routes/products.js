
import { Router } from 'express';
import { Product } from '../models/Product.js';

export const router = Router();

router.get('/', async (req, res) => {
  const items = await Product.find({}).lean();
  res.json(items);
});
