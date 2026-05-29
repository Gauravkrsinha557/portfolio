const db = require('../config/db');

// GET all projects (public)
exports.getProjects = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM projects ORDER BY featured DESC, created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch projects', error: err.message });
  }
};

// GET single project (public)
exports.getProject = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Project not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch project', error: err.message });
  }
};

// POST create project (admin only)
exports.createProject = async (req, res) => {
  const { title, description, tech_stack, live_url, github_url, image_url, featured } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO projects (title, description, tech_stack, live_url, github_url, image_url, featured) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, tech_stack, live_url, github_url, image_url, featured || false]
    );
    res.status(201).json({ message: 'Project created', id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create project', error: err.message });
  }
};

// PUT update project (admin only)
exports.updateProject = async (req, res) => {
  const { title, description, tech_stack, live_url, github_url, image_url, featured } = req.body;
  try {
    await db.query(
      'UPDATE projects SET title=?, description=?, tech_stack=?, live_url=?, github_url=?, image_url=?, featured=? WHERE id=?',
      [title, description, tech_stack, live_url, github_url, image_url, featured, req.params.id]
    );
    res.json({ message: 'Project updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update project', error: err.message });
  }
};

// DELETE project (admin only)
exports.deleteProject = async (req, res) => {
  try {
    await db.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete project', error: err.message });
  }
};
