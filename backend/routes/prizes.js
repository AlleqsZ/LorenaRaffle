import express from 'express'
import Prize from '../models/Prize.js'

const router = express.Router()

// Get all prizes
router.get('/', async (req, res) => {
  try {
    const prizes = await Prize.find().sort({ drawDate: 1 })
    res.json(prizes)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Create a prize (temporar public; îl securizăm mai târziu)
router.post('/', async (req, res) => {
  const { title, image, price, drawDate } = req.body

  try {
    const newPrize = new Prize({ title, image, price, drawDate })
    await newPrize.save()
    res.status(201).json(newPrize)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
