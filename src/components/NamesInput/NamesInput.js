import { useState } from 'react';

import { generateInitialRounds } from '../../helpers';

const NamesInput = ({ setRoundsData, showInput, setShowNamesInput }) => {
  const defaultPlayers = [...Array(14).keys()].map((n) => `Player ${n + 1}`);

  const [namesInput, setNamesInput] = useState(defaultPlayers.join('\n'));

  const onNamesInputChange = (e) => {
    setNamesInput(e.target.value);
  };

  const onCreateBracketClick = (e) => {
    e.preventDefault();
    const playerList = [...new Set(namesInput.split('\n'))]; // generate a list of players from the names input

    // Don't generate a bracket if there are less than 2 players
    if (playerList.length < 2) {
      return;
    }
    setRoundsData(generateInitialRounds(playerList));
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
          spellCheck={false}
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
