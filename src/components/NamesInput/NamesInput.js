import { useState } from 'react';

const NamesInput = ({ setRoundsData }) => {
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
      generateFirstRound(roundCount).map((num) => playerByeList[num - 1])
    );

    if (roundCount > 1) {
      initialRoundsData.push(
        generateSecondRound(initialRoundsData[0], roundCount)
      );
    }

    if (roundCount > 2) {
      initialRoundsData = [
        ...initialRoundsData,
        ...generateOtherRounds(roundCount),
      ];
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

  return (
    <>
      <form id="input-container">
        <h4 id="input-heading">
          Please enter the names of the players/teams ordered by their seed:
        </h4>
        <textarea
          onChange={onNamesInputChange}
          id="name-input"
          cols="30"
          rows="20"
          value={namesInput}
        ></textarea>
        <input
          type="submit"
          value="Create bracket"
          id="create-bracket-button"
          onClick={onCreateBracketClick}
        />
      </form>
    </>
  );
};

export default NamesInput;
