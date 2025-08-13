
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { router as auth } from './routes/auth.js';
import { router as products } from './routes/products.js';
import { router as orders } from './routes/orders.js';
import { router as webhook } from './routes/webhook.js';

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Mongo connection
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/gameover';
await mongoose.connect(MONGO_URL);

// Routes
app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/auth', auth);
app.use('/api/products', products);
app.use('/api/orders', orders);
app.use('/api/webhook', webhook);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`[backend] listening on :${PORT}`));
