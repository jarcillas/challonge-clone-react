import { Round } from './Round';

import type { playerData } from '../helpers/generateInitialRounds';

const Brackets = ({
  roundsData,
  setRoundsData,
}: {
  roundsData: playerData[][];
  setRoundsData: Function;
}) => {
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

export { Brackets };
