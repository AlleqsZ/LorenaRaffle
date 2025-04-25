const mongoose = require('mongoose');

const raffleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  ticketPrice: { type: Number, required: true },
  totalTickets: { type: Number, required: true },
  ticketsSold: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Raffle', raffleSchema);
