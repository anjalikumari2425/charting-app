import './App.css';
import data from './data/data.json';
import { useEffect, useState } from 'react';
import DisplayChart from './DisplayChart';

function App() {
  const allKeys = Object.keys(data[0]);
  const dropDownKeys = allKeys.slice(1,-1);
  const [displayChartData, setDisplayChartData] =  useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
        if(checkForFilter(data[i], filterKey, filterValue) && (dateFilter(data[i])))
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

  function dateFilter(data)
{
    if (startDate == null || endDate == null || startDate == '' || endDate == '')
    {
        return true;
    }
    let dataDate = data["Date"].split("/");
    let Date1 = new Date(dataDate[2], dataDate[1] - 1, dataDate[0]);
    let Date2 = new Date(startDate).setHours(0,0,0,0);
    let Date3 = new Date(endDate).setHours(0,0,0,0);

    return (Date1 >= Date2 && Date1 <= Date3);
}
 
  useEffect(()=> {
    let dataList = [];
    dataList = newDataFilter(dropDownKeys[dropdown], selectedDropdownKeys[selectedDropdownValue]);
    setDisplayChartData(dataList);
  }, [dropdown, selectedDropdownValue, startDate, endDate]);

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  }
  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  }

   return (
    <div className="App">
      <select className="user-selection" onChange={handleChange}>
        {
          dropDownKeys && dropDownKeys.map((item,index)=> (
            <option value={index}>{item}</option>
          ))
        }
      </select>
      {selectedDropdownKeys && <select className="user-selection-value" onChange={handleKeySelectChange}>
        {
          selectedDropdownKeys && selectedDropdownKeys.map((item,index)=> (
            <option value={index}>{item}</option>
          ))
        }
      </select>}
      StartDate <input className="start-date" type="date" onChange={handleStartDate}/>
      End Date <input className="end-date" type="date" onChange={handleEndDate}/>
       <DisplayChart data={displayChartData}/>
       <hr/>
       <table>
         <thead>
         <tr>
           <th>
             Date
           </th>
           <th>
             Daily Users
           </th>
         </tr>
         </thead>
         
         {Object.values(displayChartData).map((x) => {
            return (<tr>
              <td>{x['date']}</td>
              <td>{x["Daily Users"]}</td>
            </tr>)
          })
          }
       </table> 
    </div>
  );
}

export default App;
