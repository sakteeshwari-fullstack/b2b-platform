import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/b2b-platform';

let cachedConnection: typeof mongoose | null = null;
let cachedPromise: Promise<typeof mongoose> | null = null;

console.log("✅ MongoDB connected");

export default async function dbConnect() {
  if (cachedConnection) return cachedConnection;

  if (!cachedPromise) {
    cachedPromise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
  }

  cachedConnection = await cachedPromise;
  return cachedConnection;
}
