import express from 'express'
import dotenv import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'

import authRoutes from './routes/auth.js'
import prizeRoutes from './routes/prizes.js'
import ticketRoutes from './routes/tickets.js' // <- AICI e pasul 3

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/prizes', prizeRoutes)
app.use('/api/tickets', ticketRoutes) // <- AICI e linia necesară

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

import raffleRoutes from './routes/raffle.routes.js' // <- import nou
...
app.use('/api/raffles', raffleRoutes) // <- conectează rutele
