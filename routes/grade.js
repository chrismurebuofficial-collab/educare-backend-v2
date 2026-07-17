const express = require('express');
const Grade = require('../models/Grade');
const authMiddleware = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

router.get('/', authMiddleware, roleCheck('admin', 'teacher'), async (req, res) => {
  const grades = await Grade.find().populate('studentId', 'name admissionNumber className');
  res.json(grades);
});

router.post('/', authMiddleware, roleCheck('admin', 'teacher'), async (req, res) => {
  try {
    const grade = await Grade.create({ ...req.body, teacherId: req.user.id });
    res.status(201).json(grade);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authMiddleware, roleCheck('admin', 'teacher'), async (req, res) => {
  await Grade.findByIdAndDelete(req.params.id);
  res.json({ message: 'Grade deleted' });
});

module.exports = router;