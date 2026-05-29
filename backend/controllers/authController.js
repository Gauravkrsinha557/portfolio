const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

// POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

// POST /api/auth/setup — run ONCE to create your admin account
// After running, remove or disable this route!
exports.setupAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO admins (email, password_hash) VALUES (?, ?)', [email, hash]);
    res.json({ message: 'Admin created successfully. Disable this route now!' });
  } catch (err) {
    res.status(500).json({ message: 'Setup failed', error: err.message });
  }
};
