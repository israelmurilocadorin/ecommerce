const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParse = require('body-parser');

const app = express();
app.use(bodyParse.json());
require('dotenv').config({
  path: './config/index.env'
});
// MongoDB
const connectDB = require('./config/db');
connectDB();

app.use(morgan('dev'));
app.use(cors());

// routes
app.use('/api/user/', require('./routes/auth.route'));
app.use('/api/category/', require('./routes/category.route'));
app.use('/api/product/', require('./routes/product.route'));

app.get('/', (req, res) => {
  res.send('test route => home page');
});

// Page not founded
app.use((req, res) => {
  res.status(404).json({
    msg: 'Page not founded'
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
