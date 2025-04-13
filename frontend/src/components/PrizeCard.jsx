import React from 'react'

const PrizeCard = ({ prize }) => {
  const drawDate = new Date(prize.drawDate).toLocaleDateString()

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden w-full max-w-xs">
      <img src={prize.image} alt={prize.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{prize.title}</h3>
        <p className="text-sm text-gray-600">Preț bilet: <strong>{prize.price}€</strong></p>
        <p className="text-sm text-gray-500">Extragere: {drawDate}</p>
        <button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-xl">
          Cumpără bilet
        </button>
      </div>
    </div>
  )
}

export default PrizeCard
