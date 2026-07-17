const express = require('express');
const Fee = require('../models/Fee');
const authMiddleware = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

router.get('/', authMiddleware, roleCheck('admin'), async (req, res) => {
  const fees = await Fee.find().populate('studentId', 'name admissionNumber className');
  res.json(fees);
});

router.post('/', authMiddleware, roleCheck('admin'), async (req, res) => {
  try {
    const fee = await Fee.create(req.body);
    res.status(201).json(fee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', authMiddleware, roleCheck('admin'), async (req, res) => {
  const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(fee);
});

module.exports = router;