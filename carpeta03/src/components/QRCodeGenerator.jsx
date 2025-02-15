import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react"; // Asegúrate de que esta importación es correcta

function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [qrValue, setQrValue] = useState("");
  const qrRef = useRef();

  const generateQR = () => {
    if (text.trim() !== "") {
      setQrValue(text);
    }
  };

  const downloadQR = () => {
    if (!qrValue) return;

    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `QR-${qrValue}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="qr-generator">
      <h2>Generador de QR</h2>
      <input
        type="text"
        placeholder="Ingrese un número"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={generateQR}>Generar QR</button>
      {qrValue && (
        <div className="qr-display" ref={qrRef}>
          <QRCodeCanvas value={qrValue} size={200} level="H" />
          <p>Contenido: {qrValue}</p>
          <button onClick={downloadQR}>Descargar PNG</button>
        </div>
      )}
    </div>
  );
}

export default QRCodeGenerator;
