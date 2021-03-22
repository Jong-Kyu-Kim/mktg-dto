import React, { useState } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import ChartLegend from './ChartLegend';

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = (props) => {
  const { grouped, value, cx, cy, fill, midAngle, innerRadius, outerRadius, percent } = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.15;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text fill={fill} x={x} y={y} textAnchor={x > cx ? 'start' : 'end'}>
      {grouped !== '견적 문의' && grouped !== '단순 정보 수취 (브로슈어)' && grouped !== '제품 소개 요청' && <tspan>{grouped} </tspan>}
      <tspan>{`${value} (${(percent * 100).toFixed(0)}%)`}</tspan>
    </text>
  );
};

export default ({ data, filter }) => {
  const [hover, setHover] = useState('');
  const COLORS = ['#4dc1b9', '#7299d4', '#f0755c', '#f7af47', '#8ec5dd', '#9b9eda', '#ed8697', '#90ba76', '#9cafbe', '#f8dd5e', '#59ae81', '#525b79', '#c298e3'];

  const chartData = data
    .reduce((arr, item) => {
      const subIndex = item.grouped.indexOf(' -');
      const split = item.grouped.substr(0, subIndex >= 0 ? subIndex : item.grouped.length).split(', ');

      split.forEach((data) => {
        const index = arr.findIndex((i) => {
          return i.grouped === data;
        });
        if (index >= 0) {
          arr[index].value = arr[index].value + item.value;
        } else {
          arr.push(item);
        }
      });
      return arr;
    }, [])
    .filter(({ grouped }) => grouped)
    .sort((a, b) => {
      return a.grouped < b.grouped ? -1 : a.grouped > b.grouped ? 1 : 0;
    });

  return (
    <PieChart width={500} height={380} margin={{ top: 20, right: 60, left: 0 }}>
      {/* {title.substr(0,2) !== '유입' && <Legend width={500} layout="horizontal" height={30} align="center" verticalAlign="top" content={renderLegend} />} */}
      <Legend content={<ChartLegend hover="" setHover={() => setHover('')} />} verticalAlign="top" />
      <Pie
        data={chartData}
        cx={250}
        cy={130}
        // innerRadius={60}
        outerRadius={100}
        label={renderCustomizedLabel}
        labelLine={false}
        // onMouseEnter={(data, index) => setActiveIndex(index)}
        fill="#8884d8"
        dataKey="value"
      >
        {chartData.map(({ _id }, index) => {
          return <Cell key={`cell-${index}`} sum="" fill={COLORS[index % COLORS.length]} />;
        })}
      </Pie>
      {/* <Tooltip content={<CustomTooltip />} /> */}
    </PieChart>
  );
};
