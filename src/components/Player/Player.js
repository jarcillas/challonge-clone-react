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
    newRoundsData = clearRest(
      newRoundsData,
      roundNum + 2,
      Math.ceil(matchNum / 2)
    );
    setRoundsData(newRoundsData);
  };

  const clearRest = (prevRoundsData, clearRoundNum, clearPlayerNum) => {
    if (clearRoundNum > roundsData.length) {
      return prevRoundsData;
    } else {
      let nextRoundsData = [...prevRoundsData];
      nextRoundsData[clearRoundNum - 1][clearPlayerNum - 1] = null;
      return clearRest(
        nextRoundsData,
        clearRoundNum + 1,
        Math.ceil(clearPlayerNum / 2)
      );
    }
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
