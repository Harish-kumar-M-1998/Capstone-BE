const mongoose = require('mongoose');

const cleaningServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  availability: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String },
  image: { type: String },
  currentBookings: { type: Array, default: [] },
  description: { type: String },
});

const cleaningservices = mongoose.model('cleaningservices', cleaningServiceSchema);
 module.exports = cleaningservices