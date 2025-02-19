import { useState } from "react";
import ScanStep from "./ScanStep";
import SummaryScreen from "./SummaryScreen";

function PlayerScanner({ playerName }) {
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(1);
  const [scannedCodes, setScannedCodes] = useState([]);

  const handleStepComplete = (code) => {
    setScannedCodes((prevCodes) => [...prevCodes, code]);
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Cuando se completan los 4 pasos, se muestra el resumen.
  if (currentStep <= totalSteps) {
    return (
      <div className="player-scanner">
        <h2>Jugador: {playerName}</h2>
        <ScanStep
          key={currentStep}
          step={currentStep}
          onComplete={handleStepComplete}
        />
      </div>
    );
  } else {
    return (
      <SummaryScreen scannedCodes={scannedCodes} playerName={playerName} />
    );
  }
}

export default PlayerScanner;
