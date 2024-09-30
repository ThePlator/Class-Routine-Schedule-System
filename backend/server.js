const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/teachers', require('./routes/teachers'));
app.use('/api/subjects', require('./routes/subjects'));
app.use('/api/classes', require('./routes/classes'));
app.use('/api/branches', require('./routes/branches'));

// For now, let's add a simple route for the root path
app.get('/', (req, res) => {
  res.send('Class Routine API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));