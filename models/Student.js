const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  admissionNumber: { type: String, required: true, unique: true },
  className: String,
  dateOfBirth: Date,
  guardianName: String,
  guardianContact: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);