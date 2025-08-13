
import mongoose from 'mongoose';

const DurationSchema = new mongoose.Schema({
  label: String,
  months: Number,
  priceEUR: Number,
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  slug: { type: String, unique: true },
  title: String,
  category: { type: String, enum: ['games', 'streaming', 'music'] },
  durations: [DurationSchema],
  perks: [String],
  rating: Number,
  featured: Boolean,
  vendorSafe: Boolean,
});

export const Product = mongoose.model('Product', ProductSchema);
