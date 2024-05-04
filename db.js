const mongoose = require('mongoose');

const MONGODB_URL = 'mongodb+srv://harishmano98:Harish%402024@harish-mongo.uf15eex.mongodb.net/CleanEase';

mongoose.connect(MONGODB_URL);

const connection = mongoose.connection;

connection.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

connection.once('open', () => {
  console.log('Connected to MongoDB successfully!');
});

module.exports =mongoose