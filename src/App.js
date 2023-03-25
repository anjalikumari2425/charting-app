import './App.css';
import data from './data/data.json';
import { useEffect, useState } from 'react';
import DisplayChart from './DisplayChart';

function App() {
  const allKeys = Object.keys(data[0]);
  const dropDownKeys = allKeys.slice(1,-1);
  const [displayChartData, setDisplayChartData] =  useState([]);
  const getAllValueOfKey = (key) => {
    return [...new Set(data.map((x) => {
      return x[key];
    }))];
  }
  const [selectedDropdownKeys, setSelectedDropdownKeys] = useState(getAllValueOfKey(dropDownKeys[0]));
  const [dropdown, setDropdownValue] = useState(0);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState(0);

  const handleChange = (e) => {
    setDropdownValue(e.target.value);
    setSelectedDropdownKeys(getAllValueOfKey(dropDownKeys[e.target.value]));
  }

  function checkForFilter(row, filterKey, filterValue)
{
    if(filterValue == 'null')
    {
        return true;
    }
    return filterValue === row[filterKey];
}

  function newDataFilter(filterKey, filterValue)
{
    let filterData = {};
    for(let i=0; i < data.length;i++)
    {
        if(checkForFilter(data[i], filterKey, filterValue))
        {
            if(filterData[data[i]["Date"]] != null)
            {
                filterData[data[i]["Date"]].users += data[i]["Daily Users"];
            }
            else
            {
                filterData[data[i]["Date"]] = {
                    date: data[i]["Date"],
                    "Daily Users": data[i]["Daily Users"]
                }
            }
        }
    }
    return filterData;
}
  
  const handleKeySelectChange = (e) => {
    setSelectedDropdownValue(e.target.value);
  }
 
  useEffect(()=> {
    let dataList = [];
    dataList = newDataFilter(dropDownKeys[dropdown], selectedDropdownKeys[selectedDropdownValue]);
    setDisplayChartData(dataList);
  }, [dropdown, selectedDropdownValue]);


   return (
    <div className="App">
      <select onChange={handleChange}>
        {
          dropDownKeys && dropDownKeys.map((item,index)=> (
            <option value={index}>{item}</option>
          ))
        }
      </select>
      {selectedDropdownKeys && <select onChange={handleKeySelectChange}>
        {
          selectedDropdownKeys && selectedDropdownKeys.map((item,index)=> (
            <option value={index}>{item}</option>
          ))
        }
      </select>}
       <DisplayChart data={displayChartData}/> 
    </div>
  );
}

export default App;
