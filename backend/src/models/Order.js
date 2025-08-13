
import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  productSlug: String,
  durationIndex: Number,
  qty: Number,
  priceEUR: Number,
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  email: String,
  items: [OrderItemSchema],
  amountEUR: Number,
  status: { type: String, enum: ['pending', 'paid', 'fulfilled'], default: 'pending' },
  credentials: [String],
}, { timestamps: true });

export const Order = mongoose.model('Order', OrderSchema);
