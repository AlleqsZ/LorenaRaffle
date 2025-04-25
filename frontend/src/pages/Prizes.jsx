import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Prizes = () => {
  const [raffles, setRaffles] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchRaffles = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/raffles/active');
        setRaffles(res.data);
      } catch (err) {
        setMessage('Eroare la încărcarea tombolălor.');
      }
    };
    fetchRaffles();
  }, []);

  const buyTicket = async (raffleId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return setMessage('Trebuie să fii autentificat pentru a cumpăra un bilet.');
      }

      const res = await axios.post(
        `http://localhost:5000/api/tickets/buy/${raffleId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMessage(`Bilet cumpărat cu succes: #${res.data.ticket?.number || 'necunoscut'}`);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Eroare la cumpărare.');
    }
  };

  return (
    <div>
      <h2>Premii disponibile</h2>
      {raffles.map((raffle) => (
        <div key={raffle._id} style={{ marginBottom: 30, border: '1px solid #ccc', padding: 15 }}>
          <h3>{raffle.title}</h3>
          <p>{raffle.description}</p>
          {raffle.image && (
            <img src={raffle.image} alt={raffle.title} style={{ maxWidth: 200, marginBottom: 10 }} />
          )}
          <p>Preț bilet: {raffle.ticketPrice} RON</p>
          <p>Bilete disponibile: {raffle.totalTickets - raffle.ticketsSold}</p>
          <button onClick={() => buyTicket(raffle._id)}>Cumpără bilet</button>
        </div>
      ))}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Prizes;
