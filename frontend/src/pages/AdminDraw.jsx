import React, { useState } from 'react'
import axios from 'axios'

const AdminDraw = () => {
  const [raffleId, setRaffleId] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleDraw = async () => {
    try {
      const token = localStorage.getItem('token') // presupunem că token-ul e salvat
      const res = await axios.post(
        `http://localhost:5000/api/raffles/draw/${raffleId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setResult(res.data)
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Eroare la extragere')
      setResult(null)
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Extragere câștigător tombolă</h2>
      <input
        type="text"
        value={raffleId}
        onChange={(e) => setRaffleId(e.target.value)}
        placeholder="ID Tombolă"
      />
      <button onClick={handleDraw}>Extrage câștigător</button>

      {result && (
        <div>
          <h3>Câștigător extras:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default AdminDraw
