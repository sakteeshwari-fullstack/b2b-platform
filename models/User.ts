import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  password: String, // hashed
  role: String,
  isApproved: Boolean,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
