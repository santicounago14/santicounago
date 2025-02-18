import { useState } from "react";
import ScanStep from "./ScanStep";

function PlayerScanner({ playerName }) {
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(1);
  const [scannedCodes, setScannedCodes] = useState([]);

  const handleStepComplete = (code) => {
    setScannedCodes([...scannedCodes, code]);
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="player-scanner">
      <h2>Jugador: {playerName}</h2>
      {currentStep <= totalSteps ? (
        // Agregamos key para forzar que se monte un nuevo componente en cada paso.
        <ScanStep
          key={currentStep}
          step={currentStep}
          onComplete={handleStepComplete}
        />
      ) : (
        <div className="results">
          <h3>Todos los códigos escaneados:</h3>
          <ul>
            {scannedCodes.map((code, index) => (
              <li key={index}>
                Carta {index + 1}: {code}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PlayerScanner;
