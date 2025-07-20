import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Buyer from '../../models/Buyer';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  await dbConnect();
  const { email, password } = req.body;

  const buyer = await Buyer.findOne({ email });
  if (!buyer) {
    return res.status(401).json({ success: false, message: 'Buyer not found' });
  }

  const isMatch = await bcrypt.compare(password, buyer.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid password' });
  }

  return res.status(200).json({ success: true, message: 'Login successful' });
}
