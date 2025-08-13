
import mongoose from 'mongoose';
import { Product } from './models/Product.js';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/gameover';
await mongoose.connect(MONGO_URL);

const PRODUCTS = [{
  slug: 'ps5-ultimate-profile',
  title: 'Profilo PS5 Ultimate',
  category: 'games',
  durations: [{ label: '30 giorni', months: 1, priceEUR: 11.99 }, { label: '90 giorni', months: 3, priceEUR: 29.99 }, { label: '365 giorni', months: 12, priceEUR: 99.00 }],
  perks: ['Full access', 'Aggiornamenti automatici', 'Consegna immediata'],
  rating: 4.8, featured: true, vendorSafe: true
},{
  slug: 'ps4-lite-profile',
  title: 'Profilo PS4 Lite',
  category: 'games',
  durations: [{ label: '30 giorni', months: 1, priceEUR: 7.99 }, { label: '90 giorni', months: 3, priceEUR: 19.99 }],
  perks: ['Uso personale', 'Guida step-by-step'],
  rating: 4.4, featured: false, vendorSafe: true
},{
  slug: 'netflix-premium',
  title: 'Accesso Premium Netflix',
  category: 'streaming',
  durations: [{ label: '30 giorni', months: 1, priceEUR: 9.49 }, { label: '90 giorni', months: 3, priceEUR: 26.99 }],
  perks: ['4K dove disponibile', 'Assistenza in italiano'],
  rating: 4.7, featured: true, vendorSafe: false
},{
  slug: 'disney-plus',
  title: 'Disney+',
  category: 'streaming',
  durations: [{ label: '30 giorni', months: 1, priceEUR: 6.99 }, { label: '365 giorni', months: 12, priceEUR: 59.99 }],
  perks: ['Catalogo completo', 'Profilo dedicato'],
  rating: 4.5, featured: false, vendorSafe: false
},{
  slug: 'spotify-family',
  title: 'Spotify Premium Family',
  category: 'music',
  durations: [{ label: '30 giorni', months: 1, priceEUR: 5.99 }, { label: '90 giorni', months: 3, priceEUR: 16.49 }],
  perks: ['Senza pubblicità', 'Salvataggi illimitati'],
  rating: 4.6, featured: true, vendorSafe: false
},{
  slug: 'tidal-hifi',
  title: 'Tidal HiFi',
  category: 'music',
  durations: [{ label: '30 giorni', months: 1, priceEUR: 6.49 }, { label: '90 giorni', months: 3, priceEUR: 17.99 }],
  perks: ['Audio Lossless', 'Per audiofili'],
  rating: 4.3, featured: false, vendorSafe: false
}];

await Product.deleteMany({});
await Product.insertMany(PRODUCTS);
console.log('✓ Seed completato (' + PRODUCTS.length + ' prodotti)');
await mongoose.disconnect();
