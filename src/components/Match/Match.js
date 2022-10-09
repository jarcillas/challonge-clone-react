import Player from '../Player';

const Match = ({
  upPlayer,
  downPlayer,
  roundsData,
  setRoundsData,
  roundNum,
  matchNum,
}) => {
  return (
    <div className="match">
      <Player
        name={upPlayer.name}
        glow={upPlayer.glow}
        win={upPlayer.win}
        isUpPlayer={true}
        roundsData={roundsData}
        setRoundsData={setRoundsData}
        roundNum={roundNum}
        matchNum={matchNum}
        playerNum={matchNum * 2 - 1}
      />
      <Player
        name={downPlayer.name}
        glow={downPlayer.glow}
        win={downPlayer.win}
        isUpPlayer={false}
        roundsData={roundsData}
        setRoundsData={setRoundsData}
        roundNum={roundNum}
        matchNum={matchNum}
        playerNum={matchNum * 2}
      />
    </div>
  );
};

export default Match;
