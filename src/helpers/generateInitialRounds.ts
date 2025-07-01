import {
  generateMatchups,
  generateSecondRound,
  generateOtherRounds,
} from './helpers';

export type playerData = {
  name: any;
  win: boolean;
  glow: boolean;
};

const generateInitialRounds = (playerList: String[]): playerData[][] => {
  const playerCount = playerList.length;

  const roundCount = Math.ceil(Math.log2(playerCount)); // calculate total number of rounds needed
  let initialRoundsData = []; // initialize initialRoundsData
  const byeCount = 2 ** roundCount - playerCount; // calculate total number of byes in the 1st round
  const playerByeList = [...playerList, ...Array(byeCount).fill('Bye')]; // create a player list (ordered by seeding) for the 1st round including all the byes

  initialRoundsData.push(
    generateMatchups(roundCount).map((num) => {
      if (num <= byeCount) {
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
    const otherRoundsData = generateOtherRounds(roundCount).map((roundData) => {
      return roundData.map((playerName) => {
        return {
          name: playerName,
          glow: false,
          win: false,
        };
      });
    });

    initialRoundsData = [...initialRoundsData, ...otherRoundsData];
  }

  return initialRoundsData;
};

export { generateInitialRounds };
