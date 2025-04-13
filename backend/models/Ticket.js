import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  prize: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prize',
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  isWinner: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Ticket', ticketSchema)
