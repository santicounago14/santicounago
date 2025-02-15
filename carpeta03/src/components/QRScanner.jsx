import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function QRScanner({ onScan, currentScan }) {
  const scannerRef = useRef(null);
  const [isScannerReady, setIsScannerReady] = useState(false);

  useEffect(() => {
    console.log("🟢 QRScanner se montó.");

    if (!scannerRef.current) {
      console.log("🔵 Inicializando Html5QrcodeScanner...");
      scannerRef.current = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: { width: 400, height: 400 },
          facingMode: "environment",
        },
        false
      );

      scannerRef.current.render(
        (decodedText) => {
          console.log("✅ Código escaneado:", decodedText);
          onScan(decodedText);
          scannerRef.current.clear();
          setIsScannerReady(false);
          scannerRef.current = null;
        },
        (error) => {
          console.warn("⚠️ Error de escaneo:", error);
        }
      );

      setIsScannerReady(true);
    }

    return () => {
      console.log("🔴 Limpiando escáner...");
      if (scannerRef.current) {
        scannerRef.current
          .clear()
          .catch((error) =>
            console.warn("⚠️ Error al limpiar el scanner:", error)
          );
        scannerRef.current = null;
      }
    };
  }, [onScan]);

  return (
    <div className="qr-scanner">
      <div id="reader"></div>
      {!isScannerReady && <p>🕒 Cargando escáner...</p>}
    </div>
  );
}

export default QRScanner;
