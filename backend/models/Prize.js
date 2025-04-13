import mongoose from 'mongoose';

const prizeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  drawDate: {
    type: Date,
    required: true
  },
  winnerTicketNumber: {
    type: Number,
    default: null // câștigătorul va fi setat aici
  }
}, {
  timestamps: true
});

export default mongoose.model('Prize', prizeSchema);
