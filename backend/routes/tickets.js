import express from 'express';
import Ticket from '../models/Ticket.js';
import Raffle from '../models/Raffle.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Cumpără bilet - doar utilizator autentificat
router.post('/buy/:raffleId', protect, async (req, res) => {
  const { raffleId } = req.params;
  const userId = req.user._id;

  try {
    const raffle = await Raffle.findById(raffleId);
    if (!raffle || !raffle.isActive) {
      return res.status(400).json({ message: 'Tombolă inexistentă sau inactivă' });
    }

    if (raffle.ticketsSold >= raffle.totalTickets) {
      return res.status(400).json({ message: 'Toate biletele au fost vândute' });
    }

    const ticketNumber = raffle.ticketsSold + 1;

    const newTicket = await Ticket.create({
      user: userId,
      prize: raffleId,
      number: ticketNumber
    });

    raffle.ticketsSold += 1;
    await raffle.save();

    res.status(201).json({ message: 'Bilet cumpărat', ticket: newTicket });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Afișează bilete pentru un premiu
router.get('/prize/:prizeId', async (req, res) => {
  try {
    const tickets = await Ticket.find({ prize: req.params.prizeId }).populate('user', 'email');
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
