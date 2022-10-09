import Match from '../Match';

const Round = ({ roundNum, roundsData, roundData, setRoundsData }) => {
  const roundDataByMatch = roundData.reduce(function (
    result,
    value,
    index,
    array
  ) {
    if (index % 2 === 0) result.push(array.slice(index, index + 2));
    return result;
  },
  []);

  const renderedMatches = roundDataByMatch.map(
    ([upPlayer, downPlayer], idx) => (
      <Match
        upPlayer={upPlayer}
        downPlayer={downPlayer}
        roundsData={roundsData}
        setRoundsData={setRoundsData}
        roundNum={roundNum}
        matchNum={idx + 1}
        key={idx}
      />
    )
  );

  return (
    <div className="round" id={`r${roundNum}`}>
      {renderedMatches}
    </div>
  );
};

export default Round;
