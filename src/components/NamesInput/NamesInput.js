import { useState } from 'react';

const NamesInput = ({ setRoundsData, showInput, setShowNamesInput }) => {
  const defaultPlayers = [...Array(20).keys()].map((n) => `Player ${n + 1}`);

  const [namesInput, setNamesInput] = useState(defaultPlayers.join('\n'));

  const onNamesInputChange = (e) => {
    setNamesInput(e.target.value);
  };

  const onCreateBracketClick = (e) => {
    e.preventDefault();
    const playerList = [...new Set(namesInput.split('\n'))]; // generate a list of players from the names input
    const playerCount = playerList.length;
    if (playerCount < 2) {
      return;
    }
    const roundCount = Math.ceil(Math.log2(playerCount)); // calculate total number of rounds needed
    let initialRoundsData = []; // initialize initialRoundsData
    const byeCount = 2 ** roundCount - playerCount; // calculate total number of byes in the 1st round
    const playerByeList = [...playerList, ...Array(byeCount).fill('Bye')]; // create a player list (ordered by seeding) for the 1st round including all the byes

    initialRoundsData.push(
      generateFirstRound(roundCount).map((num) => {
        if (num < byeCount) {
          return {
            name: playerByeList[num - 1],
            win: true,
            glow: false,
          };
        } else {
          return {
            name: playerByeList[num - 1],
            win: false,
            glow: false,
          };
        }
      })
    );

    if (roundCount > 1) {
      initialRoundsData.push(
        generateSecondRound(
          initialRoundsData[0].map((player) => player.name),
          roundCount
        ).map((playerName) => {
          return {
            name: playerName,
            glow: false,
            win: false,
          };
        })
      );
    }

    if (roundCount > 2) {
      const otherRoundsData = generateOtherRounds(roundCount).map(
        (roundData) => {
          return roundData.map((playerName) => {
            return {
              name: playerName,
              glow: false,
              win: false,
            };
          });
        }
      );

      initialRoundsData = [...initialRoundsData, ...otherRoundsData];
    }

    setRoundsData(initialRoundsData);
  };

  // helper function to generate the 1st round seeding matchups recursively. Seeds start from 1.
  const generateFirstRound = (roundCount) => {
    if (roundCount === 1) {
      return [1, 2];
    } else {
      let tempArray = [];
      for (let num of generateFirstRound(roundCount - 1)) {
        tempArray.push(num);
        tempArray.push(2 ** roundCount - num + 1);
      }
      return tempArray;
    }
  };

  // helper function to generate the 2nd round that advances players facing byes in 1st round
  const generateSecondRound = (round1Data, roundCount) => {
    let round2 = [];
    for (let k = 0; k < 2 ** (roundCount - 1); k++) {
      if (round1Data[2 * k + 1] === 'Bye') {
        round2.push(round1Data[2 * k]);
      } else {
        round2.push(null);
      }
    }
    return round2;
  };

  // helper function to generate the rest of the rounds if roundCount > 2
  const generateOtherRounds = (roundCount) => {
    let otherRoundsData = [];
    for (let j = 2; j < roundCount; j++) {
      let roundArray = Array(2 ** (roundCount - j)).fill(null);
      otherRoundsData.push(roundArray);
    }

    return otherRoundsData;
  };

  const onToggleInputClick = (e) => {
    e.preventDefault();
    setShowNamesInput(!showInput);
  };

  return (
    <>
      <form id="input-container">
        <h4 hidden={!showInput} id="input-heading">
          Please enter the names of the players/teams ordered by their seed:
        </h4>
        <textarea
          onChange={onNamesInputChange}
          hidden={!showInput}
          id="name-input"
          cols="30"
          rows="20"
          value={namesInput}
        ></textarea>
        <input
          hidden={!showInput}
          type="submit"
          value="Create bracket"
          id="create-bracket-button"
          onClick={onCreateBracketClick}
        />
        <button onClick={onToggleInputClick}>
          {showInput ? 'Hide' : 'Show'}
        </button>
      </form>
    </>
  );
};

export default NamesInput;
