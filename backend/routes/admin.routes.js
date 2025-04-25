import express from 'express'
import Ticket from '../models/Ticket.js'
import Raffle from '../models/Raffle.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

// Extragere câștigător pentru o tombolă (doar admin)
router.post('/draw/:raffleId', protect, adminOnly, async (req, res) => {
  try {
    const { raffleId } = req.params

    const raffle = await Raffle.findById(raffleId)
    if (!raffle || !raffle.isActive) {
      return res.status(400).json({ message: 'Tombola este inactivă sau nu există.' })
    }

    const tickets = await Ticket.find({ prize: raffleId })
    if (tickets.length === 0) {
      return res.status(400).json({ message: 'Nu există bilete pentru această tombolă.' })
    }

    const winnerTicket = tickets[Math.floor(Math.random() * tickets.length)]
    winnerTicket.isWinner = true
    await winnerTicket.save()

    raffle.isActive = false
    await raffle.save()

    res.json({
      message: 'Câștigător extras cu succes!',
      winnerTicket
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
