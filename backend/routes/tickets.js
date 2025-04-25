import express from 'express'
import Ticket from '../models/Ticket.js'
import Raffle from '../models/Raffle.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Cumpără un bilet (autentificare necesară)
router.post('/buy/:raffleId', protect, async (req, res) => {
  const userId = req.user._id
  const { raffleId } = req.params

  try {
    const raffle = await Raffle.findById(raffleId)
    if (!raffle || !raffle.isActive) {
      return res.status(400).json({ message: 'Tombola nu este activă sau nu există.' })
    }

    if (raffle.ticketsSold >= raffle.totalTickets) {
      return res.status(400).json({ message: 'Toate biletele au fost vândute.' })
    }

    const ticketNumber = raffle.ticketsSold + 1

    const newTicket = new Ticket({
      user: userId,
      prize: raffleId,
      number: ticketNumber
    })

    await newTicket.save()
    raffle.ticketsSold += 1
    await raffle.save()

    res.status(201).json({ ticket: newTicket })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Obține toate biletele pentru o tombolă
router.get('/prize/:prizeId', async (req, res) => {
  try {
    const tickets = await Ticket.find({ prize: req.params.prizeId }).populate('user', 'email')
    res.json(tickets)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
