const express = require('express');
const Timetable = require('../models/Timetable');
const authMiddleware = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const entries = await Timetable.find().sort({ day: 1, period: 1 });
  res.json(entries);
});

router.post('/', authMiddleware, roleCheck('admin'), async (req, res) => {
  try {
    const entry = await Timetable.create(req.body);
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;