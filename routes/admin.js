const express = require('express');
const Student = require('../models/Student');
const User = require('../models/User');
const Fee = require('../models/Fee');
const Announcement = require('../models/Announcement');
const authMiddleware = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

router.get('/stats', authMiddleware, roleCheck('admin'), async (req, res) => {
  const studentCount = await Student.countDocuments();
  const teacherCount = await User.countDocuments({ role: 'teacher' });
  const unpaidFees = await Fee.countDocuments({ status: { $ne: 'paid' } });
  const announcementCount = await Announcement.countDocuments();

  res.json({ studentCount, teacherCount, unpaidFees, announcementCount });
});

// List all staff (admin + teacher accounts) — excludes password field
router.get('/users', authMiddleware, roleCheck('admin'), async (req, res) => {
  const staff = await User.find({ role: { $in: ['admin', 'teacher'] } })
    .select('-password')
    .sort({ createdAt: -1 });
  res.json(staff);
});

module.exports = router;