import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

function QRScanner({ onScan, containerId }) {
  const html5QrCodeRef = useRef(null);
  const isRunningRef = useRef(false);
  const didCleanupRef = useRef(false);

  useEffect(() => {
    didCleanupRef.current = false; // reiniciamos el flag al montar
    const config = { fps: 10, qrbox: 250, facingMode: "environment" };
    html5QrCodeRef.current = new Html5Qrcode(containerId);

    html5QrCodeRef.current
      .start({ facingMode: "environment" }, config, (decodedText) => {
        onScan(decodedText);
      })
      .then(() => {
        isRunningRef.current = true;
      })
      .catch((err) => {
        console.error("Error iniciando el escáner:", err);
      });

    return () => {
      // Evitamos ejecutar el cleanup más de una vez (especialmente en Strict Mode)
      if (didCleanupRef.current) return;
      didCleanupRef.current = true;

      (async () => {
        if (html5QrCodeRef.current) {
          try {
            // Solo llamamos a stop() si el escáner se inició
            if (isRunningRef.current) {
              await html5QrCodeRef.current.stop();
            }
          } catch (err) {
            if (err?.message?.includes("not running")) {
              // Ignoramos este error
              console.warn("Ignorando error: el escáner no estaba corriendo");
            } else {
              console.error("Error al detener el escáner:", err);
            }
          } finally {
            // Llamamos a clear() para limpiar la instancia
            try {
              await html5QrCodeRef.current.clear();
            } catch (clearErr) {
              console.error("Error al limpiar el escáner:", clearErr);
            }
            isRunningRef.current = false;
          }
        }
      })();
    };
  }, [onScan, containerId]);

  return <div id={containerId} />;
}

export default QRScanner;
