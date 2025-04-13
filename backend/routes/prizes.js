import express from 'express';
import Prize from '../models/Prize.js';
import Ticket from '../models/Ticket.js';

const router = express.Router();

// Obține toate premiile
router.get('/', async (req, res) => {
  try {
    const prizes = await Prize.find().sort({ drawDate: 1 });
    res.json(prizes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Creează un premiu (temporar public; îl securizăm mai târziu)
router.post('/', async (req, res) => {
  const { title, image, price, drawDate } = req.body;

  try {
    const newPrize = new Prize({ title, image, price, drawDate });
    await newPrize.save();
    res.status(201).json(newPrize);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Extragerea câștigătorului aleatoriu
router.post('/:prizeId/draw', async (req, res) => {
  try {
    const { prizeId } = req.params;
    const prize = await Prize.findById(prizeId);
    const tickets = await Ticket.find({ prize: prizeId });

    if (!tickets.length) {
      return res.status(400).json({ msg: 'No tickets sold.' });
    }

    const randomIndex = Math.floor(Math.random() * tickets.length);
    const winnerTicket = tickets[randomIndex];

    // Actualizează câștigătorul în premiu
    prize.winnerTicketNumber = winnerTicket.number;
    await prize.save();

    // Marchează biletul ca fiind câștigător
    winnerTicket.isWinner = true;
    await winnerTicket.save();

    res.json({ msg: 'Winner selected.', winnerTicket });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Alegerea unui câștigător favorit (manual)
router.post('/:prizeId/force-win', async (req, res) => {
  try {
    const { prizeId } = req.params;
    const { number } = req.body;

    const prize = await Prize.findById(prizeId);
    const ticket = await Ticket.findOne({ prize: prizeId, number });

    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found.' });
    }

    // Actualizează câștigătorul în premiu
    prize.winnerTicketNumber = number;
    await prize.save();

    // Marchează biletul ca fiind câștigător
    ticket.isWinner = true;
    await ticket.save();

    res.json({ msg: 'Winner manually selected.', ticket });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
