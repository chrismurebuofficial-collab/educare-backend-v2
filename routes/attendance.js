const express = require('express');
const Attendance = require('../models/Attendance');
const authMiddleware = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

router.get('/', authMiddleware, roleCheck('admin', 'teacher'), async (req, res) => {
  const records = await Attendance.find().populate('studentId', 'name admissionNumber');
  res.json(records);
});

router.post('/', authMiddleware, roleCheck('admin', 'teacher'), async (req, res) => {
  try {
    const record = await Attendance.create({ ...req.body, markedBy: req.user.id });
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;