// helper function to generate the 1st round seeding matchups recursively. Seeds start from 1.
const generateMatchups = (roundCount) => {
  if (roundCount === 1) {
    return [1, 2];
  } else {
    let tempArray = [];
    for (let num of generateMatchups(roundCount - 1)) {
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

export { generateMatchups, generateSecondRound, generateOtherRounds };
