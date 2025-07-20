import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  await dbConnect();

  const { email, password } = req.body;
  console.log('🔐 Incoming login request');
  console.log('📨 Email:', email);

  const user = await User.findOne({ email });
  console.log('🔎 Found user:', user);

  if (!user) {
    console.log('❌ No user found');
    return res.status(401).json({ success: false, message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log('🔑 Password match:', isMatch);

  if (!isMatch) {
    console.log('❌ Password did not match');
    return res.status(401).json({ success: false, message: 'Invalid password' });
  }

  if (user.role !== 'seller_admin') {
    console.log('⛔ Not a seller admin');
    return res.status(403).json({ success: false, message: 'Not seller' });
  }

  console.log('✅ Login successful');
  return res.status(200).json({ success: true, message: 'Login successful' });
}
