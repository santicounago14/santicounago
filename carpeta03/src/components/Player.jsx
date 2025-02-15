import { useState } from "react";
import QRScanner from "./QRScanner";

function Player({ player, setPlayers }) {
  const [currentScan, setCurrentScan] = useState(1);

  const handleScan = (qrData) => {
    console.log(`📸 Escaneando carta ${currentScan}:`, qrData);

    setPlayers((prevPlayers) =>
      prevPlayers.map((p) =>
        p.id === player.id
          ? { ...p, qrCodes: [...p.qrCodes, { data: qrData }] }
          : p
      )
    );

    if (currentScan < 4) {
      setCurrentScan(currentScan + 1);
    }
  };

  return (
    <div className="player-card">
      <h3>{player.name}</h3>
      {player.qrCodes.length < 4 && (
        <QRScanner onScan={handleScan} currentScan={currentScan} />
      )}
      <div className="qr-results">
        {player.qrCodes.map((qr, index) => (
          <div key={index} className="qr-item">
            <p>
              Carta {index + 1}: {qr.data}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Player;
