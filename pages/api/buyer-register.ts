import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Buyer from '../../models/Buyer';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    await dbConnect();

    const {
      fullName,
      email,
      password,
      phoneNumber,
      companyName,
      gstin,
      agreedToTerms,
    } = req.body;

    if (!fullName || !email || !password || !phoneNumber || !companyName || !agreedToTerms) {
      return res.status(400).json({ success: false, message: 'All fields except GSTIN are required' });
    }

    if (!agreedToTerms) {
      return res.status(400).json({ success: false, message: 'You must agree to the Terms and Conditions' });
    }

    const existing = await Buyer.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const buyer = new Buyer({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      companyName,
      gstin,
      agreedToTerms,
    });

    await buyer.save();

    res.status(201).json({ success: true, message: 'Registration successful' });

  } catch (error) {
    console.error('❌ Buyer registration error:', error);
    res.status(500).json({ success: false, message: 'Server error, please try again' });
  }
}
