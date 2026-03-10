const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('❌ DB Connection Error: MONGO_URI is not set');
      return false;
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error('❌ DB Connection Error:', error.message);
    return false;
  }
};

const connectDBWithRetry = async ({ retries = Infinity, delayMs = 5000 } = {}) => {
  let attempt = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    attempt += 1;
    const ok = await connectDB();
    if (ok) return true;

    if (attempt >= retries) return false;
    console.log(`🔁 Retrying MongoDB connection in ${Math.round(delayMs / 1000)}s... (attempt ${attempt})`);
    await new Promise((r) => setTimeout(r, delayMs));
  }
};

module.exports = {
  connectDB,
  connectDBWithRetry,
};
