import { useState } from "react";
import ScanStep from "./ScanStep";
import SummaryScreen from "./SummaryScreen";

function PlayerScanner({ playerName }) {
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(1);
  const [scannedCodes, setScannedCodes] = useState([]);

  const handleStepComplete = (code) => {
    // Guardamos el código del paso actual
    setScannedCodes((prevCodes) => [...prevCodes, code]);
    // Si aún no hemos completado el total de pasos, avanzamos al siguiente
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Si completamos el paso 4, avanzamos a la pantalla de resumen
      setCurrentStep(currentStep + 1);
    }
  };

  const handleRestart = () => {
    // Reiniciamos el proceso (opcional)
    setCurrentStep(1);
    setScannedCodes([]);
  };

  if (currentStep <= totalSteps) {
    return (
      <div className="player-scanner">
        <h2 className="playerTitle">Jugador: {playerName}</h2>
        <h4 className="subtitlePlayer">Escanear cartas</h4>
        {/* La key forzará que cada paso se monte como nuevo */}
        <ScanStep
          key={currentStep}
          step={currentStep}
          onComplete={handleStepComplete}
        />
      </div>
    );
  } else {
    return (
      <SummaryScreen
        scannedCodes={scannedCodes}
        playerName={playerName}
        onRestart={handleRestart}
      />
    );
  }
}

export default PlayerScanner;
