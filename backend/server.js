import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/signlingo_db';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected successfully.'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Basic Routes Structure
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Import and use routes (placeholders for when actual routing logic is added)
// import userRoutes from './routes/userRoutes.js';
// import translationRoutes from './routes/translationRoutes.js';
// app.use('/api/users', userRoutes);
// app.use('/api/translations', translationRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`API Health Check: http://localhost:${PORT}/api/health`);
});
