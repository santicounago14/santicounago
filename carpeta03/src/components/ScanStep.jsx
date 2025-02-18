import { useState } from "react";
import QRScanner from "./QRScanner";

function ScanStep({ step, onComplete }) {
  const [scannedCode, setScannedCode] = useState(null);
  const containerId = `qr-scanner-step-${step}`;

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
      <h3>Paso {step}: Escanea la carta</h3>
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
