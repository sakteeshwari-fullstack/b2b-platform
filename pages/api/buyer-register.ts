// pages/api/buyer-register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Buyer from '../../models/Buyer';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  await dbConnect();

  const { fullName, email, password, phoneNumber, companyName, role, agreedToTerms } = req.body;

  if (!fullName || !email || !password || !phoneNumber || !companyName || !role || !agreedToTerms) {
    return res.status(400).json({ message: 'All required fields must be filled' });
  }

  try {
    const existingUser = await Buyer.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newBuyer = new Buyer({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      companyName,
      role,
      agreedToTerms,
    });

    await newBuyer.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
