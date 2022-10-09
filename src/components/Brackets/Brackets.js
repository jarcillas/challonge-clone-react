import Round from '../Round';

const Brackets = ({ roundsData, setRoundsData }) => {
  const renderRounds = roundsData.map((roundData, idx) => (
    <Round
      roundNum={idx + 1}
      key={idx}
      roundsData={roundsData}
      roundData={roundData}
      setRoundsData={setRoundsData}
    />
  ));

  return <div id="brackets-container">{renderRounds}</div>;
};

export default Brackets;
