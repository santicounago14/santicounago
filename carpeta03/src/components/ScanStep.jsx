import { useState } from "react";
import QRScanner from "./QRScanner";

function ScanStep({ step, onComplete }) {
  const [scannedCode, setScannedCode] = useState(null);
  const containerId = `qr-scanner-step-${step}`;

  // Map para asociar cada paso con el título correspondiente.
  const stepTitles = {
    1: "Carta de contexto",
    2: "Carta de problema",
    3: "Carta de solución",
    4: "Carta de insight",
  };

  const handleScan = (code) => {
    setScannedCode(code);
  };

  const handleRetry = () => {
    setScannedCode(null);
  };

  const handleContinue = () => {
    if (scannedCode) {
      onComplete(scannedCode);
    }
  };

  return (
    <div className="scan-step">
      {/* Título del paso con una clase dinámica */}
      <h3 className={`step-title step-${step}`}>{stepTitles[step]}</h3>

      {scannedCode === null ? (
        <QRScanner onScan={handleScan} containerId={containerId} />
      ) : (
        <div>
          <p>✅ Código escaneado: {scannedCode}</p>
          <button onClick={handleRetry}>Reintentar</button>
          <button onClick={handleContinue}>Continuar</button>
        </div>
      )}
    </div>
  );
}

export default ScanStep;
