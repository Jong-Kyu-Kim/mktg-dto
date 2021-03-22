import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import moment from 'moment';
import ChartTooltip from './ChartTooltip';

const getDays = (value) => (value === 1 ? 'M' : value === 2 ? 'T' : value === 3 ? 'W' : value === 4 ? 'R' : value === 5 ? 'F' : 'S');

export default ({ data, target }) => {
  const [hover, setHover] = useState('');
  const isEndPrice = target === 'endPrice';

  // console.log(target)

  const color = [
    { stroke: '#3bbf86', gradient: '#3e9bed' },
    { stroke: '#3399ff', gradient: '#3bbf86' },
  ];

  return (
    <AreaChart width={500} height={380} margin={{ top: 20, right: 60, left: 10 }} data={data}>
      <defs>
        <linearGradient id="endPrice" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#3bbf86" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#3bbf86" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="volume" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#3e9bed" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#3e9bed" stopOpacity={0} />
        </linearGradient>
      </defs>

      <CartesianGrid vertical={false} />

      <XAxis
        dataKey="date"
        type="category"
        interval={data.length > 7 ? data.length - 2 : 0}
        tickFormatter={(val) => `${moment(new Date(val)).format('M/D')} ${getDays(moment(new Date(val)).days())}`}
        dy={10}
      />
      <YAxis
        dataKey={target}
        // domain={isEndPrice ? ['dataMin - 200', 'dataMax + 100'] : [0, dataMax => Math.ceil(dataMax / 50000) * 50000]}
        domain={isEndPrice ? ['dataMin - 200', 'dataMax + 100'] : [0, (dataMax) => Math.ceil(dataMax / 50000) * 50000]}
        tickFormatter={(val) => {
          return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }}
      />

      <Tooltip content={<ChartTooltip hover={hover} />} />

      <Area
        type="monotone"
        dataKey={target}
        stroke={isEndPrice ? '#3bbf86' : '#3399FF'}
        strokeWidth="2"
        // fill={isEndPrice ? 'url(#colorPv)' : 'url(#colorUv)'}
        fill={`url(#${target})`}
        onMouseEnter={() => setHover(target)}
        //dot={false}
      />
    </AreaChart>
  );
};
