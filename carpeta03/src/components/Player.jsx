import PlayerSteps from "./PlayerSteps";

function Player({ player, setPlayers }) {
  return (
    <div className="player-card">
      <h3>{player.name}</h3>
      <PlayerSteps player={player} setPlayers={setPlayers} />
    </div>
  );
}

export default Player;
