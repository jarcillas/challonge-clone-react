const Player = ({
  name,
  isUpPlayer,
  roundsData,
  setRoundsData,
  roundNum,
  matchNum,
  playerNum,
  glow = false,
  win,
}) => {
  const onPlayerClick = () => {
    if (name === 'Bye' || name === null) {
      return;
    }
    let newRoundsData = [...roundsData];
    newRoundsData[roundNum - 1][playerNum - 1] = {
      name: name,
      glow: true,
      win: true,
    };

    if (isUpPlayer) {
      newRoundsData[roundNum - 1][playerNum].win = false;
    } else {
      newRoundsData[roundNum - 1][playerNum - 2].win = false;
    }

    if (roundNum < roundsData.length) {
      newRoundsData[roundNum][matchNum - 1] = {
        name: name,
        glow: true,
        win: false,
      };
      newRoundsData = clearRest(
        newRoundsData,
        roundNum + 2,
        Math.ceil(matchNum / 2)
      );
    }
    setRoundsData(newRoundsData);
  };

  const clearRest = (prevRoundsData, clearRoundNum, clearPlayerNum) => {
    if (clearRoundNum > roundsData.length) {
      return prevRoundsData;
    } else {
      let nextRoundsData = [...prevRoundsData];
      nextRoundsData[clearRoundNum - 1][clearPlayerNum - 1].name = null;
      nextRoundsData[clearRoundNum - 1][clearPlayerNum - 1].win = false;
      return clearRest(
        nextRoundsData,
        clearRoundNum + 1,
        Math.ceil(clearPlayerNum / 2)
      );
    }
  };

  const onPlayerMouseEnter = () => {
    if (name === 'Bye' || name === null) {
      return;
    }
    let newRoundsData = roundsData.map((roundData) => {
      if (roundData < roundNum) {
        return roundData;
      } else {
        return roundData.map((player) => {
          if (player.name === name) {
            return {
              ...player,
              glow: true,
            };
          } else {
            return {
              ...player,
              glow: false,
            };
          }
        });
      }
    });

    setRoundsData(newRoundsData);
  };

  const onPlayerMouseLeave = () => {
    let newRoundsData = roundsData.map((roundData) => {
      return roundData.map((player) => {
        return {
          ...player,
          glow: false,
        };
      });
    });

    setRoundsData(newRoundsData);
  };

  return (
    <div
      onClick={onPlayerClick}
      onMouseEnter={onPlayerMouseEnter}
      onMouseLeave={onPlayerMouseLeave}
      className={`${isUpPlayer ? 'up player' : 'down player'} 
      ${glow ? 'glow' : ''}
      ${win ? 'win' : ''}`}
    >
      {name}
    </div>
  );
};

export default Player;
