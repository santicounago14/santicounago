import { useState } from "react";
import ScanStep from "./ScanStep";

function PlayerSteps({ player, setPlayers }) {
  const [step, setStep] = useState(1);
  const [results, setResults] = useState([]);

  const handleStepComplete = (data) => {
    const newResults = [...results, data];
    setResults(newResults);

    // Actualiza el jugador con el nuevo código
    setPlayers((prevPlayers) =>
      prevPlayers.map((p) =>
        p.id === player.id ? { ...p, qrCodes: [...p.qrCodes, { data }] } : p
      )
    );

    setStep(step + 1);
  };

  if (step <= 4) {
    return <ScanStep step={step} onComplete={handleStepComplete} />;
  } else {
    return (
      <div className="results">
        <h2>🎉 ¡Todos los códigos escaneados!</h2>
        <ul>
          {results.map((r, index) => (
            <li key={index}>
              Carta {index + 1}: {r}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PlayerSteps;
