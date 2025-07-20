// ✅ Mongoose Model: /models/Buyer.ts
// ==============================

import mongoose from 'mongoose';

const BuyerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  companyName: { type: String, required: true },
  gstin: { type: String },
  agreedToTerms: { type: Boolean, required: true },
  role: { type: String, default: 'buyer' },
}, { timestamps: true });

export default mongoose.models.Buyer || mongoose.model('Buyer', BuyerSchema);

