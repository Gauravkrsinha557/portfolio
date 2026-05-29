const db = require('../config/db');

// POST submit contact form (public)
exports.submitContact = async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    await db.query(
      'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message', error: err.message });
  }
};

// GET all messages (admin only)
exports.getMessages = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages', error: err.message });
  }
};

// PATCH mark message as read (admin only)
exports.markRead = async (req, res) => {
  try {
    await db.query('UPDATE contacts SET read_status = TRUE WHERE id = ?', [req.params.id]);
    res.json({ message: 'Marked as read' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update', error: err.message });
  }
};

// DELETE message (admin only)
exports.deleteMessage = async (req, res) => {
  try {
    await db.query('DELETE FROM contacts WHERE id = ?', [req.params.id]);
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete', error: err.message });
  }
};
