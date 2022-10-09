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
        isUpPlayer={true}
        roundsData={roundsData}
        setRoundsData={setRoundsData}
        roundNum={roundNum}
        matchNum={matchNum}
      />
      <Player
        name={downPlayer.name}
        glow={downPlayer.glow}
        isUpPlayer={false}
        roundsData={roundsData}
        setRoundsData={setRoundsData}
        roundNum={roundNum}
        matchNum={matchNum}
      />
    </div>
  );
};

export default Match;
