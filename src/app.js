require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const createAppRouter = require('./framework/routes');

const app = express();

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,OPTIONS,POST,PUT',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Access-Token',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {})
  .catch(err => console.error('Error de conexión:', err));

app.use(createAppRouter());

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
}

module.exports = app;