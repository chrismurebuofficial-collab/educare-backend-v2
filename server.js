require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const studentRoutes = require('./routes/student');
app.use('/api/students', studentRoutes);

const attendanceRoutes = require('./routes/attendance');
app.use('/api/attendance', attendanceRoutes);

const gradeRoutes = require('./routes/grade');
app.use('/api/grades', gradeRoutes);

const feeRoutes = require('./routes/fee');
app.use('/api/fees', feeRoutes);

const announcementRoutes = require('./routes/announcement');
app.use('/api/announcements', announcementRoutes);

const timetableRoutes = require('./routes/timetable');
app.use('/api/timetable', timetableRoutes);

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is alive' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});