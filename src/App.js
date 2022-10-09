import { useState } from 'react';

import { NamesInput, Brackets } from './components';
import './App.css';

function App() {
  const [roundsData, setRoundsData] = useState([]);
  return (
    <div className="App">
      <div id="header">Tournament Bracket Generator</div>
      <NamesInput setRoundsData={setRoundsData} />
      <Brackets roundsData={roundsData} setRoundsData={setRoundsData} />
    </div>
  );
}

export default App;
