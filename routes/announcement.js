const express = require('express');
const Announcement = require('../models/Announcement');
const authMiddleware = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

// Anyone logged in can view, filtered to their role + "all"
router.get('/', authMiddleware, async (req, res) => {
  const announcements = await Announcement.find({
    audience: { $in: ['all', req.user.role] }
  }).sort({ date: -1 });
  res.json(announcements);
});

router.post('/', authMiddleware, roleCheck('admin', 'teacher'), async (req, res) => {
  try {
    const announcement = await Announcement.create({ ...req.body, postedBy: req.user.id });
    res.status(201).json(announcement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;