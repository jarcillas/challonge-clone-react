const Player = ({
  name,
  isUpPlayer,
  roundsData,
  setRoundsData,
  roundNum,
  matchNum,
}) => {
  const onPlayerClick = () => {
    let newRoundsData = [...roundsData];
    newRoundsData[roundNum][matchNum - 1] = name;
    setRoundsData(newRoundsData);
  };

  return (
    <div
      onClick={onPlayerClick}
      className={isUpPlayer ? 'up player' : 'down player'}
    >
      {name}
    </div>
  );
};

export default Player;
