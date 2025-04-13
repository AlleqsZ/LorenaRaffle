document.addEventListener('DOMContentLoaded', () => {
  const prizes = [
    { id: 1, name: 'Car', price: 20 },
    { id: 2, name: 'Bike', price: 10 },
    { id: 3, name: 'Laptop', price: 15 },
  ];

  const prizeList = document.getElementById('prize-list');
  prizes.forEach(prize => {
    const prizeItem = document.createElement('div');
    prizeItem.innerHTML = `<h3>${prize.name}</h3><p>Price: $${prize.price}</p>`;
    prizeList.appendChild(prizeItem);
  });
});
