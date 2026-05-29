const express = require('express');
const router = express.Router();
const auth = require('../config/authMiddleware');

const projectCtrl  = require('../controllers/projectController');
const skillCtrl    = require('../controllers/skillController');
const contactCtrl  = require('../controllers/contactController');
const authCtrl     = require('../controllers/authController');

// ── Auth ──────────────────────────────────────────────
router.post('/auth/login',  authCtrl.login);
router.post('/auth/setup',  authCtrl.setupAdmin); // disable after first use!

// ── Projects (public GET, admin for write) ────────────
router.get('/projects',        projectCtrl.getProjects);
router.get('/projects/:id',    projectCtrl.getProject);
router.post('/projects',       auth, projectCtrl.createProject);
router.put('/projects/:id',    auth, projectCtrl.updateProject);
router.delete('/projects/:id', auth, projectCtrl.deleteProject);

// ── Skills (public GET, admin for write) ──────────────
router.get('/skills',         skillCtrl.getSkills);
router.post('/skills',        auth, skillCtrl.createSkill);
router.delete('/skills/:id',  auth, skillCtrl.deleteSkill);

// ── Contact ───────────────────────────────────────────
router.post('/contact',              contactCtrl.submitContact);         // public
router.get('/contact',               auth, contactCtrl.getMessages);     // admin
router.patch('/contact/:id/read',    auth, contactCtrl.markRead);        // admin
router.delete('/contact/:id',        auth, contactCtrl.deleteMessage);   // admin

module.exports = router;
