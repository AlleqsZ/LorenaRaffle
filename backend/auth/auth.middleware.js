const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()

// Middleware: verifică dacă userul este logat
const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')
    if (!req.user) return res.status(401).json({ message: 'User not found' })
    next()
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

// Middleware: doar admin
const adminOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(403).json({ message: 'Admin access only' })
  }
}

module.exports = { protect, adminOnly }
