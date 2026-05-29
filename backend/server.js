const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────
app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());

// ── Routes ────────────────────────────────────────────
app.use('/api', require('./routes/index'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running ✅' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ── Start ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
