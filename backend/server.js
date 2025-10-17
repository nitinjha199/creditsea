require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: 'https://creditsea-1-1ex9.onrender.com/', // frontend URL
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/reports', reportRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((error) => {
  console.error('Connection error', error.message);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});
