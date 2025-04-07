// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const seedData = require('./utils/seedData');
const dataRoutes = require('./routes/dataRoutes');
const authRoutes = require('./routes/authRoutes');
 
const app = express();
app.use(cors());
app.use(express.json()); // Instead of bodyParser.json()

require('dotenv').config();
// Connect to MongoDB
connectDB();

// Seed database
seedData();

// Routes
app.use('/api/data', dataRoutes); 
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});