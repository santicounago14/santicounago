import React from "react";

function SummaryScreen({ scannedCodes, playerName, onRestart }) {
  return (
    <div className="summary-screen">
      <h2>Resumen del jugador: {playerName}</h2>
      <h3>Códigos Escaneados:</h3>
      <ul>
        {scannedCodes.map((code, index) => (
          <li key={index}>
            Carta {index + 1}: {code}
          </li>
        ))}
      </ul>
      {/* Puedes agregar un botón para reiniciar el proceso, si lo deseas */}
      {onRestart && <button onClick={onRestart}>Reiniciar</button>}
    </div>
  );
}

export default SummaryScreen;
