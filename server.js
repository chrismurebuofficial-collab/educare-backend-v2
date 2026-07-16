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

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is alive' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});