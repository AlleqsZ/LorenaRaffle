const express = require('express');
const router = express.Router();
const Raffle = require('../models/Raffle');

// Creare tombolă nouă (doar admin)
router.post('/', async (req, res) => {
  try {
    const raffle = await Raffle.create(req.body);
    res.status(201).json(raffle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listă tombole active
router.get('/', async (req, res) => {
  const raffles = await Raffle.find({ isActive: true });
  res.json(raffles);
});

// Detalii tombolă
router.get('/:id', async (req, res) => {
  const raffle = await Raffle.findById(req.params.id);
  if (!raffle) return res.status(404).json({ message: 'Raffle not found' });
  res.json(raffle);
});

module.exports = router;
