import Player from "./Player";

function PlayerList({ players, setPlayers }) {
  return (
    <div className="players-container">
      {players.length > 0 ? (
        players.map((player) => (
          <Player key={player.id} player={player} setPlayers={setPlayers} />
        ))
      ) : (
        <p>No hay jugadores agregados aún.</p>
      )}
    </div>
  );
}

export default PlayerList;
