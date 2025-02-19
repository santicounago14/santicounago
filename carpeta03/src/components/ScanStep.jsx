import { useState } from "react";
import QRScanner from "./QRScanner";

function ScanStep({ step, onComplete }) {
  const [scannedCode, setScannedCode] = useState(null);
  const containerId = `qr-scanner-step-${step}`;

  // Mapeo de códigos a descripciones (agrega aquí todas las cartas necesarias)
  const cardMapping = {
    "contexto-01": "usuario en movimiento",
    "contexto-02": "dispositivo pequeño",
    "contexto-03": "ambiente con mala conexión",
    "contexto-04": "ambiente con luz intensa",

    "problema-01": "botones pequeños e incómodos",
    "problema-02": "interfaz sobrecargada",
    "problema-03": "falta de feedback al usuario",
    "problema-04": "menú resulta muy confuso",

    "solucion-01": "agrandar botones y aumentar espacios",
    "solucion-02": "simplificar la interfaz eliminando elementos",
    "solucion-03": "mejorar el contraste y la legibilidad",
    "solucion-04": "agregar comandos por voz",
    "solucion-05": "introducir accesos rápidos y personalizados",

    "insight-01": "el usuario repite siempre la misma acción",
    "insight-02": "el usuario usa la app con una mano sola",
    "insight-03": "test de usabilidad revela confusión en el menú",
    "insight-04": "la mayoría prefiere controles por voz",
    "insight-05": "los usuarios prefieren una interfaz más simple",
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
          <button onClick={handleContinue}>{buttonText}</button>
          <button className="retry" onClick={handleRetry}>
            Volver a escanear
          </button>
        </div>
      )}
    </div>
  );
}

export default ScanStep;
