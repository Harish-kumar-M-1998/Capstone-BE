const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  username: { type: String, required: true },
  serviceType: { type: String, required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  serviceDate: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  transactionId: { type: String, required: true }, // New field for transaction ID
  status: { type: String, default: 'booked' } // New field for status
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
