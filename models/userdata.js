const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: String,
  cleaningType: String, // Added
  inContract: String,    // Added
  identity: Array,      // Added
  help: String,
  blog: Boolean
});

const UserData = mongoose.model('UserData', userSchema); // Changed model name to UserData

module.exports = UserData;
