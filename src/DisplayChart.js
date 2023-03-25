import React, {useState, useEffect} from 'react';
import {Chart} from 'react-charts';

export default function DisplayChart(props) {

   const {data} = props;
   console.log(data);
   const chartData = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: data,
      },
    ],
    []
  )
 
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )
   return (
     <div style={{width: '80%', height: '500px'}}>
       <Chart data={chartData} axes={axes} />
     </div>
   )
}