const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require('./db');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

connectDB()
  .then(() => console.log('Database ready'))
  .catch((err) => {
    console.error('Database initialization error:', err.message);
    process.exit(1);
  });

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'MERN To-Do API is running' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
