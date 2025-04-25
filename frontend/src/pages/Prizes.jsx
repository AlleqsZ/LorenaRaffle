import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Prizes = () => {
  const [raffles, setRaffles] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchRaffles = async () => {
      const res = await axios.get('http://localhost:5000/api/raffles/active');
      setRaffles(res.data);
    };
    fetchRaffles();
  }, []);

  const buyTicket = async (raffleId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:5000/api/tickets/buy/${raffleId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(`Bilet cumpărat cu succes: #${res.data.ticket.number}`);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Eroare la cumpărare');
    }
  };

  return (
    <div>
      <h2>Premii disponibile</h2>
      {raffles.map((raffle) => (
        <div key={raffle._id} style={{ marginBottom: 20 }}>
          <h3>{raffle.title}</h3>
          <p>{raffle.description}</p>
          <button onClick={() => buyTicket(raffle._id)}>Cumpără bilet</button>
        </div>
      ))}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Prizes;
