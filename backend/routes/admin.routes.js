import express from 'express'
import Ticket from '../models/Ticket.js'
import Raffle from '../models/Raffle.js'
import { protect, adminOnly } from '../middleware/auth.js' // <- importă middleware-urile

const router = express.Router()

// Extragere câștigător pentru o tombolă (doar admin)
router.post('/draw/:raffleId', protect, adminOnly, async (req, res) => {
  try {
    const { raffleId } = req.params

    const tickets = await Ticket.find({ raffle: raffleId })
    if (tickets.length === 0) {
      return res.status(400).json({ message: 'Nu există bilete pentru această tombolă' })
    }

    // Selectăm câștigătorul aleatoriu
    const winnerTicket = tickets[Math.floor(Math.random() * tickets.length)]

    winnerTicket.isWinner = true
    await winnerTicket.save()

    // Dezactivăm tombolă
    await Raffle.findByIdAndUpdate(raffleId, { isActive: false })

    res.json({
      message: 'Câștigător extras cu succes!',
      winnerTicket
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
