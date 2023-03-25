import React, {useState, useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DisplayChart(props) {

   const {data} = props;
  
   return (
     <div style={{width: '100%', height: '500px'}}>
       <ResponsiveContainer width="100%" height="100%">
       <LineChart
          width={500}
          height={300}
          data={Object.values(data).sort((a,b) => {
            let dateStringA = a['date'];
            let dateStringB = b['date'];
            let datePartsA = dateStringA.split("/");
            let datePartsB = dateStringB.split("/");
            let Date1 = new Date(datePartsA[2], datePartsA[1] - 1, datePartsA[0]);
            let Date2 = new Date(datePartsB[2], datePartsB[1] - 1, datePartsB[0]);
            return Date1 - Date2;
          })}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dateKey="Daily Users"/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Daily Users" stroke="#8884d8" activeDot={{ r: 8 }} />
          {/* <Line type="monotone" dataKey="Country" stroke="#82ca9d" /> */}
        </LineChart>
       </ResponsiveContainer>
     </div>
   )
}