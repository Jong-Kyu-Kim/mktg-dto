import React, { useState } from 'react';
import { Brush, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import ChartTooltip from './ChartTooltip';

// import { fromDate } from '../calendar';
// import loadable from '@loadable/component';

const CustomizedTick = (props) => {
  //console.log(props)
  const { x, y, width, payload, category, type } = props;
  // console.log(payload)
  return (
    <foreignObject x={5} y={y - 27} width="75" height="55">
      <div style={{ display: 'table-cell', width: '75px', height: '55px', verticalAlign: 'middle', textAlign: 'right' }}>
        <span style={{ lineHeight: '15px', letterSpacing: '-.3px' }}>{category === 'Newsletter' && type === 'effect' ? payload.value.substr(2, 8) : payload.value}</span>
      </div>
    </foreignObject>
  );
};

const CustomizedLabel = (props) => {
  const { x, y, width, stroke, value } = props;
  return (
    <text x={x} y={y + 11} dx={width + 3} dy={0} fill={stroke} fontSize={16} textAnchor="start">
      {String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
    </text>
  );
};

const VerticalBarChart = ({ type, category, data, roi }) => {
  const [hover, setHover] = useState('value');

  const roiData = data
    .reduce((array, roiData) => {
      const { date, category, subcategory, title, roi } = roiData;
      const grouped = category === 'PR' || category === 'SNS' || category === 'AD' ? subcategory : category;
      // console.log(grouped);
      const i = array.map((data) => data.grouped).indexOf(grouped);

      if (i >= 0) {
        const j = array[i].detail.find((detail) => {
          return detail.date === roi ? roi : date && detail.title === title;
        });
        const k = array[i].detail.find((detail) => {
          return detail.date === roi ? roi : date && detail.subcategory === subcategory;
        });

        if (grouped === 'Event' || grouped === 'Event(G)') {
          if (!k) {
            array[i].value++;
            array[i].detail.push({
              date,
              category,
              subcategory,
              title: subcategory,
            });
          }
        } else {
          if (!j) {
            array[i].value++;
            array[i].detail.push({
              ...roiData,
              grouped: roiData.title,
            });
          }
        }
      } else {
        if (grouped === 'Event' || grouped === 'Event(G)') {
          array.push({
            grouped,
            value: 1,
            detail: [{ grouped: subcategory, date, category, subcategory, title: subcategory }],
          });
        } else {
          array.push({
            grouped,
            value: 1,
            detail: [
              {
                ...roiData,
                grouped: roiData.title,
              },
            ],
          });
        }
      }

      return array;
    }, [])
    .sort((a, b) => (a.value < b.value ? 1 : a.value > b.value ? -1 : 0));

  // console.log(roiData);

  const chartData = roi
    ? roiData
    : data.filter((item) => {
        return item.grouped !== '순방문자수' && item.grouped !== 'ETC' && item.value > 0;
      });

  const color = type === 'activity' ? '#3e9bed' : '#3bbf86';
  const fill = (i) => (i > 0 ? '#c3c8d6' : color);

  return (
    <BarChart layout="vertical" width={500} height={380} data={chartData} margin={{ top: 20, right: 50, bottom: chartData.length > 0 ? 10 : 10, left: 35 }} className="chart">
      {/* <XAxis interval={0} angle={-30} dx={-10} tickMargin={15} /> */}
      <XAxis type="number" hide={true} domain={[0, 'dataMax + 1']} />
      <YAxis dataKey="grouped" type="category" tick={<CustomizedTick category={category} type={type} />} />
      <Tooltip content={<ChartTooltip hover={hover} />} />
      {chartData.length > 10 && <Brush dataKey="grouped" height={17} stroke={color} tickFormatter={(val) => ''} y={360} travellerWidth={10} endIndex={9} />}
      <Bar dataKey="value" barSize={13} label={<CustomizedLabel />}>
        {chartData
          .filter((item) => item.value > 0)
          .map((item, i) => {
            return (
              // <Cell key={`cell-${i}`} fill={filter.last ? type === 'activity' ? '#3e9bed' : '#3bbf86' : fill(i)} />
              <Cell key={`cell-${i}`} fill={fill(i)} />
            );
          })}
      </Bar>
      {/* {filter.last && <Bar dataKey="last" barSize={11} label={<CustomizedLabel />}>
        {data.map(({}, i) => (
          <Cell key={`cell-${i}`} fill="#c3c8d6" />
        ))}
      </Bar>} */}
    </BarChart>
  );
};

export default VerticalBarChart;
