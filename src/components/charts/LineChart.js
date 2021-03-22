import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment';
import ChartLegend from './ChartLegend';
import ChartTooltip from './ChartTooltip';

import color from './color';

const CustomizeActiveDot = (props) => {
  const { cx, cy, fill, _id, hover } = props;

  if (_id === hover) {
    return <circle cx={cx} cy={cy} r={5} fill={fill} />;
  }
  return null;
};

const TheLineChart = ({ data }) => {
  const [hover, setHover] = useState('');

  return (
    <LineChart width={500} height={380} margin={{ top: 20, right: 50, left: 0 }} onMouseLeave={(e) => setHover('')}>
      <XAxis
        dataKey="date"
        type="number"
        allowDuplicatedCategory={false}
        domain={['dataMin', 'dataMax']}
        tickCount={3}
        tickFormatter={(val) => (Math.abs(val) > 2000000000000 ? moment(new Date()).format('M/D') : moment(new Date(val)).format('M/D'))}
        dy={10}
      />
      <YAxis dataKey="value" domain={[0, 'dataMax + 1']} allowDecimals={false} />
      <CartesianGrid />
      <Tooltip cursor={false} content={<ChartTooltip hover={hover} />} />
      <Legend content={<ChartLegend hover={hover} setHover={setHover} />} verticalAlign="top" />
      {data
        .sort((a, b) => b.value - a.value)
        .map((item, i) => {
          const { grouped, detail } = item;
          return (
            <Line
              key={grouped}
              type="monotone" // 'basis' | 'basisClosed' | 'basisOpen' | 'linear' | 'linearClosed' | 'natural' | 'monotoneX' | 'monotoneY' | 'monotone' | 'step' | 'stepBefore' | 'stepAfter' |
              data={detail}
              sum={detail.reduce((sum, { value }) => sum + (value === 0 ? 1 : value), 0)}
              dataKey="value"
              name={grouped}
              stroke={color(grouped) ? color(grouped) : i === 0 ? '#3bbf86' : i === 1 ? '#cc99cc' : '#c3c8d6'}
              strokeWidth="2"
              dot={false}
              activeDot={<CustomizeActiveDot _id={grouped} hover={hover} />}
              strokeOpacity={hover === grouped ? 1 : hover === '' ? 1 : 0.1}
              onMouseEnter={() => setHover(grouped)}
            />
          );
        })}
    </LineChart>
  );
};

export default TheLineChart;
