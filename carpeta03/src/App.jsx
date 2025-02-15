import { useState } from "react";
import PlayerList from "./components/PlayerList";
import QRCodeGenerator from "./components/QRCodeGenerator";
import "./styles.css";

function App() {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");

  const addPlayer = () => {
    if (playerName.trim() === "") return;
    setPlayers([...players, { id: Date.now(), name: playerName, qrCodes: [] }]);
    setPlayerName("");
  };

  return (
    <div className="container">
      <h1>Juego de QR</h1>
      <QRCodeGenerator />
      <div>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Nombre del jugador"
        />
        <button onClick={addPlayer}>Agregar jugador</button>
      </div>
      <PlayerList players={players} setPlayers={setPlayers} />
    </div>
  );
}

export default App;
