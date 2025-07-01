import { useState } from 'react';
import { NamesInput } from './components/NamesInput';
import { Brackets } from './components/Brackets';
import './App.css';

function App() {
  const [roundsData, setRoundsData] = useState([]);
  const [showNamesInput, setShowNamesInput] = useState(true);

  return (
    <div className="App">
      <div id="header">Tournament Bracket Generator</div>
      <NamesInput
        showInput={showNamesInput}
        setShowNamesInput={setShowNamesInput}
        setRoundsData={setRoundsData}
      />
      <Brackets roundsData={roundsData} setRoundsData={setRoundsData} />
    </div>
  );
}

export default App;
