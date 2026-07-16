const express = require('express');
const Student = require('../models/Student');
const authMiddleware = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

// GET all students (admin + teacher only)
router.get('/', authMiddleware, roleCheck('admin', 'teacher'), async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// CREATE a student (admin only)
router.post('/', authMiddleware, roleCheck('admin'), async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a student (admin only)
router.put('/:id', authMiddleware, roleCheck('admin'), async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(student);
});

// DELETE a student (admin only)
router.delete('/:id', authMiddleware, roleCheck('admin'), async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Student deleted' });
});

module.exports = router;