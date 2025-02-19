import { useState } from "react";
import QRScanner from "./QRScanner";

function ScanStep({ step, onComplete }) {
  const [scannedCode, setScannedCode] = useState(null);
  const containerId = `qr-scanner-step-${step}`;

  // Mapeo de códigos a descripciones (agrega aquí todas las cartas necesarias)
  const cardMapping = {
    "contexto-01": "Descripción para carta de contexto 1",
    "contexto-02": "Descripción para carta de contexto 2",
    "contexto-03": "Descripción para carta de contexto 3",
    "contexto-04": "Descripción para carta de contexto 4",

    "problema-01": "botones pequeños e incómodos",
    "problema-02": "Descripción para carta de problema 2",
    "problema-03": "Descripción para carta de problema 3",
    "problema-04": "Descripción para carta de problema 4",

    "solucion-01": "Descripción para carta de solución 1",
    "solucion-02": "Descripción para carta de solución 2",
    "solucion-03": "Descripción para carta de solución 3",
    "solucion-04": "Descripción para carta de solución 4",

    "insight-01": "Descripción para carta de insight 1",
    "insight-02": "Descripción para carta de insight 2",
    "insight-03": "Descripción para carta de insight 3",
    "insight-04": "Descripción para carta de insight 4",
  };

  const handleScan = (code) => {
    const transformed = cardMapping[code] || code;
    setScannedCode(transformed);
  };

  const handleRetry = () => {
    setScannedCode(null);
  };

  const handleContinue = () => {
    if (scannedCode) {
      onComplete(scannedCode);
    }
  };

  // Definimos el título del paso según el número de paso.
  const stepTitle =
    step === 1
      ? "Carta de contexto"
      : step === 2
      ? "Carta de problema"
      : step === 3
      ? "Carta de solución"
      : "Carta de insight";

  // Si es el último paso (4) el botón mostrará "Ver resultados"
  const buttonText = step === 4 ? "Ver resultados" : "Continuar";

  return (
    <div className="scan-step">
      <h3 className={`step-title step-${step}`}>{stepTitle}</h3>
      {scannedCode === null ? (
        <QRScanner onScan={handleScan} containerId={containerId} />
      ) : (
        <div>
          <p>✅ Código escaneado: {scannedCode}</p>
          <button onClick={handleRetry}>Reintentar</button>
          <button onClick={handleContinue}>{buttonText}</button>
        </div>
      )}
    </div>
  );
}

export default ScanStep;
