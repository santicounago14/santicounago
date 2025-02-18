import { useState } from "react";
import PlayerScanner from "./components/PlayerScanner";
import "./styles.css";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim() !== "") {
      setSubmittedName(playerName.trim());
    }
  };

  return (
    <div className="container">
      <h1>Juego de QR</h1>
      {submittedName === "" ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ingresa el nombre del jugador"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button type="submit">Comenzar</button>
        </form>
      ) : (
        <PlayerScanner playerName={submittedName} />
      )}
    </div>
  );
}

export default App;
