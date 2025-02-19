import React from "react";

function SummaryScreen({ scannedCodes, playerName, onRestart }) {
  // Mapeo de índice a tipo de carta
  const cardTypeMapping = {
    0: "Carta de contexto",
    1: "Carta de problema",
    2: "Carta de solución",
    3: "Carta de insight",
  };

  return (
    <div className="summary-screen">
      <h2 className="resultsTitle">Resumen de {playerName}</h2>
      <h3>Cartas escaneadas</h3>
      {scannedCodes.map((code, index) => (
        <div key={index} className="summary-card">
          <h3 className={`card-type step-summary step-${index + 1} no-bg`}>
            {cardTypeMapping[index] || "Carta"}
          </h3>
          <h4 className="card-content">{code}</h4>
        </div>
      ))}
      <button className="verify-button">Verificar solución</button>
      {onRestart && <button onClick={onRestart}>Reiniciar</button>}
    </div>
  );
}

export default SummaryScreen;
