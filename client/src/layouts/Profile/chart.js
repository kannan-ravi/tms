import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function BasicLineChart() {


const pData = [1,3,2,2,2,2];
const xLabels = [
  'S',
  'M',
  'T',
  'W',
  'T',
  'F',
  
];
  return (
    <LineChart
    series={[
        { data: pData}
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
  );
}