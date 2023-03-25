import logo from './logo.svg';
import './App.css';
import data from './data/data.json';
import { useState } from 'react';

function App() {
  const keys = Object.keys(data[0]);
  const [dropdown, setDropdownValue] = useState(0);

  const handleChange = (e) => {
    console.log("dropdown", e.target.value);
    setDropdownValue(e.target.value);
  }
   return (
    <div className="App">
      <select onChange={handleChange}>
        {
          keys && keys.map((item,index)=> (
            <option value={index}>{item}</option>
          ))
        }
      </select>
        
    </div>
  );
}

export default App;
