const express = require('express');
const app = express();

app.use(express.json());

const prizes = [
  { id: 1, name: 'Car', price: 20 },
  { id: 2, name: 'Bike', price: 10 },
  { id: 3, name: 'Laptop', price: 15 },
];

let preferredTicket = null;

// Endpoint pentru listarea premiilor
app.get('/api/prizes', (req, res) => {
  res.json(prizes);
});

// Endpoint pentru marcarea unui bilet ca "Preferred Ticket"
app.post('/api/tickets/preferred', (req, res) => {
  const { ticketId } = req.body;
  preferredTicket = ticketId;
  res.json({ message: `Ticket ${ticketId} marked as preferred.` });
});

// Endpoint pentru extragerea câștigătorului
app.get('/api/winner', (req, res) => {
  if (preferredTicket) {
    res.json({ winner: `Preferred Ticket ${preferredTicket}` });
  } else {
    const randomWinner = Math.floor(Math.random() * prizes.length) + 1;
    res.json({ winner: `Random Ticket ${randomWinner}` });
  }
});

// Pornire server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
