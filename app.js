require('dotenv').config();

const express = require('express');
const cors = require('cors');

const database = require('./config/database');

const app = express();

//! Middlewares
app.use(cors());
app.use(express.json());

//! Public Routes
app.use('/status', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

app.use('/api/auth', require('./routes/auth'));

//! Protected Routes

//! Not Found
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint was not found' });
});

//! Connection
const APP_PORT = process.env.APP_PORT || 3000;

database.connect((error) => {
  if (error) {
    console.log(error.message);
    return;
  }

  console.log('Database connected');

  app.listen(APP_PORT, () => {
    console.log('App running in port:', APP_PORT);
  });
});
