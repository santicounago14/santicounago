import { useState } from "react";
import ScanStep from "./ScanStep";
import SummaryScreen from "./SummaryScreen";

function PlayerScanner({ playerName }) {
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(1);
  const [scannedCodes, setScannedCodes] = useState([]);

  const handleStepComplete = (code) => {
    setScannedCodes([...scannedCodes, code]);
    // Incrementamos siempre el contador, de modo que al finalizar el paso 4, currentStep sea 5
    setCurrentStep(currentStep + 1);
  };

  if (currentStep <= totalSteps) {
    return (
      <div className="player-scanner">
        <h2>Jugador: {playerName}</h2>
        {/* Se fuerza el remount con key para cada paso */}
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
