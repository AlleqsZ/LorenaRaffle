import express from 'express'
import Ticket from '../models/Ticket.js'
import Prize from '../models/Prize.js'

const router = express.Router()

// Buy a ticket
router.post('/buy', async (req, res) => {
  const { userId, prizeId } = req.body

  try {
    const count = await Ticket.countDocuments({ prize: prizeId })
    const ticketNumber = count + 1

    const newTicket = new Ticket({
      user: userId,
      prize: prizeId,
      number: ticketNumber
    })

    await newTicket.save()
    res.status(201).json(newTicket)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get tickets for a prize
router.get('/prize/:prizeId', async (req, res) => {
  try {
    const tickets = await Ticket.find({ prize: req.params.prizeId }).populate('user', 'name')
    res.json(tickets)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
