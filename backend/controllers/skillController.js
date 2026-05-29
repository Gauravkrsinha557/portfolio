const db = require('../config/db');

// GET all skills (public)
exports.getSkills = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM skills ORDER BY category, level DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch skills', error: err.message });
  }
};

// POST create skill (admin only)
exports.createSkill = async (req, res) => {
  const { name, category, level } = req.body;
  if (!name) return res.status(400).json({ message: 'Skill name is required' });
  try {
    const [result] = await db.query(
      'INSERT INTO skills (name, category, level) VALUES (?, ?, ?)',
      [name, category, level || 80]
    );
    res.status(201).json({ message: 'Skill added', id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add skill', error: err.message });
  }
};

// DELETE skill (admin only)
exports.deleteSkill = async (req, res) => {
  try {
    await db.query('DELETE FROM skills WHERE id = ?', [req.params.id]);
    res.json({ message: 'Skill deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete skill', error: err.message });
  }
};
