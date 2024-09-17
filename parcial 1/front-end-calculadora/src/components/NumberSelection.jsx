import React, { useState } from 'react';
import './NumberSelection.css'; // Para estilos

const NumberSelection = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [sortOrder, setSortOrder] = useState('none'); // 'none', 'asc', 'desc'

  // Letras y números correspondientes
  const items = [
    { letter: 'A', number: 12 },
    { letter: 'B', number: 90 },
    { letter: 'C', number: 8 },
    { letter: 'D', number: 6 },
    { letter: 'E', number: 9 },
    { letter: 'F', number: 14 },
  ];

  // Manejar la selección de la casilla
  const handleCheckboxChange = (number) => {
    setSelectedNumbers((prevSelected) =>
      prevSelected.includes(number)
        ? prevSelected.filter((n) => n !== number)
        : [...prevSelected, number]
    );
  };

  // Manejar el orden de clasificación
  const handleSort = (order) => {
    const numbersToSend = [...selectedNumbers];

    fetch(`http://localhost:3500/v1/calculadora/${order}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numbers: numbersToSend }),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result.message);
        setSortOrder(order);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // Filtrar y ordenar los elementos seleccionados
  const sortedItems = [...items].filter(item => selectedNumbers.includes(item.number));

  if (sortOrder === 'ascendente') {
    sortedItems.sort((a, b) => a.number - b.number);
  } else if (sortOrder === 'descendente') {
    sortedItems.sort((a, b) => b.number - a.number);
  }

  return (
    <div>
      <div className="sort-controls">
        <button onClick={() => handleSort('ascendente')}>Ascendente</button>
        <button onClick={() => handleSort('descendente')}>Descendente</button>
      </div>

      <div className="grid-container">
        {/* Renderizar todos los ítems con casillas de verificación */}
        {items.map((item, index) => (
          <div key={index} className="grid-item">
            <div className="letter-box">{item.letter}</div>
            <div className="number">{item.number}</div>
            <input
              type="checkbox"
              checked={selectedNumbers.includes(item.number)}
              onChange={() => handleCheckboxChange(item.number)}
            />
          </div>
        ))}
      </div>

      {/* Mostrar los resultados ordenados */}
      <div className="result-container">
        {sortedItems.length > 0 ? (
          <div className="results">
            {sortedItems.map((item, index) => (
              <div key={index} className="grid-item">
                <div className="letter-box">{item.letter}</div>
                <div className="number">{item.number}</div>
              </div>
            ))}
          </div>
        ) : (
          <p>No se han seleccionado números</p>
        )}
      </div>
    </div>
  );
};

export default NumberSelection;








