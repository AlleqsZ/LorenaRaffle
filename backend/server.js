import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'

// Import rute
import authRoutes from './routes/auth.js'
import prizeRoutes from './routes/prizes.js'
import ticketRoutes from './routes/tickets.js'
import raffleRoutes from './routes/raffle.routes.js'
import adminRoutes from './routes/admin.routes.js'

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

// Rute API
app.use('/api/auth', authRoutes)
app.use('/api/prizes', prizeRoutes)
app.use('/api/tickets', ticketRoutes)
app.use('/api/raffles', raffleRoutes)
app.use('/api/admin', adminRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
