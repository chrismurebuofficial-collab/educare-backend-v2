const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  amount: { type: Number, required: true },
  dueDate: Date,
  status: { type: String, enum: ['paid', 'unpaid', 'partial'], default: 'unpaid' },
  paymentDate: Date
});

module.exports = mongoose.model('Fee', feeSchema);