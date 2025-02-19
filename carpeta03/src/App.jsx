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
      {/* <img src="/public/logo.svg" /> */}
      <h1>¡Hola!</h1>
      <h3>Te damos la bienvenida</h3>
      {submittedName === "" ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ingresa tu nombre"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            required
          />
          <button type="submit">¡Comenzar!</button>
        </form>
      ) : (
        <PlayerScanner playerName={submittedName} />
      )}
    </div>
  );
}

export default App;
