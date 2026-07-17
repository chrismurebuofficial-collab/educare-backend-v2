const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  className: { type: String, required: true },
  day: { type: String, required: true },
  period: { type: String, required: true },
  subject: String,
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  room: String
});

module.exports = mongoose.model('Timetable', timetableSchema);