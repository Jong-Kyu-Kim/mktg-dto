import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import moment from 'moment';
import ChartLegend from './ChartLegend';
import ChartTooltip from './ChartTooltip';

import color from './color';

const getDays = (value) => {
  return value === 1 ? 'M' : value === 2 ? 'T' : value === 3 ? 'W' : value === 4 ? 'R' : 'F';
};

// const chartData = roiData.reduce((array: any[], roiData: any) => {
//   const {category, subcategory, date} = roiData;
//   const _id = category === 'PR' || category === 'SNS' || category === 'AD' ? subcategory : category;
//   const i = array.map(data => data._id).indexOf(date);

//   //console.log(i)

//   if (i >= 0) {
//     Object.keys(array[i]).filter(key => key !== '_id').indexOf(_id) >= 0 ? array[i][_id]++ : array[i][_id] = 1;
//   }

//   else {
//     array.push({ _id: date, [_id]: 1 })
//   }

//   return array;
// }, []);

// const barData = roiData.reduce((array: any, roiData: any) => {
//   const {category, subcategory} = roiData;
//   const _id = category === 'PR' || category === 'SNS' || category === 'AD' ? subcategory : category;
//   const i = array.map((data: any) => data._id).indexOf(_id);
//   i >= 0 ? array[i].value++ : array.push({ _id, value: 1 });

//   return array;
// }, []);

const roiStack = (data) => {
  return data.reduce((array, roiData) => {
    // console.log(roiData);
    const { category, subcategory, date } = roiData;
    const grouped = category === 'PR' || category === 'SNS' || category === 'AD' ? subcategory : category;
    const i = array.map((data) => data.grouped).indexOf(new Date(date).getTime());

    //console.log(i)

    if (i >= 0) {
      if (Object.keys(array[i]).indexOf(grouped) >= 0) {
        array[i][grouped]++;
      } else {
        array[i][grouped] = 1;
      }
    } else {
      array.push({ grouped: new Date(date).getTime(), [grouped]: 1, detail: [] });
    }

    return array;
  }, []);
};

const roiTarget = (data) =>
  data.reduce((array, roiData) => {
    const { category, subcategory } = roiData;
    const grouped = category === 'PR' || category === 'SNS' || category === 'AD' ? subcategory : category;
    const i = array.map((data) => data.grouped).indexOf(grouped);
    if (i >= 0) {
      array[i].sum++;
    } else array.push({ grouped, sum: 1 });

    return array;
  }, []);

const stack = (data) => {
  // console.log(data);
  return {
    target: data.reduce((arr, item) => {
      item.detail.forEach(({ grouped, value }) => {
        const index = arr.findIndex((i) => i.grouped === grouped);
        if (index >= 0) {
          arr[index].sum = arr[index].sum + value;
        } else arr.push({ grouped, sum: value });
      });
      return arr;
    }, []),
    data: data.reduce((arr, item) => {
      item.detail.forEach(({ grouped, value }) => {
        const index = arr.findIndex((i) => i.grouped === item.grouped);
        if (index >= 0) {
          arr[index][grouped] = (arr[index][grouped] ? arr[index][grouped] : 0) + value;
          arr[index].detail.push({ grouped, value });
        } else {
          arr.push({
            grouped: item.grouped,
            name: 'value',
            [grouped]: value,
            detail: [{ grouped, value }],
          });
        }
      });
      return arr;
    }, []),
  };
};

export default ({ data, stacked, type, mql, roi }) => {
  const [hover, setHover] = useState('');

  const fill = type === 'activity' ? '#3e9bed' : '#3bbf86';

  let chartData = stacked ? (type === 'activity' ? roiStack(data) : stack(data).data) : data;

  if (roi) {
    chartData = chartData.reduce((array, data) => {
      return moment(data.grouped).isBusinessDay() ? array.concat(data) : array;
    }, []);
    // .sort((a, b) => {
    //   return a._id < b._id ? -1 : a._id > b._id ? 1 : 0;
    // })
  }

  // chartData = chartData.sort((a, b) => {
  //   return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
  // });

  return (
    <BarChart width={500} height={380} data={chartData} margin={{ top: 20, right: 40, left: 0 }}>
      {/* <XAxis interval={0} angle={-30} dx={-10} tickMargin={15} /> */}
      <XAxis
        dataKey="grouped"
        type="category"
        interval={chartData.length > 7 ? chartData.length - 2 : 0}
        tickFormatter={(val) => (typeof val === 'string' ? val : `${moment(new Date(val)).format('M/D')} ${roi ? getDays(moment(new Date(val)).days()) : ''}`)}
        dy={10}
      />
      <YAxis domain={[(dataMin) => 0, (dataMax) => dataMax + 1]} allowDecimals={false} />
      <Tooltip content={<ChartTooltip hover={hover} />} />
      <Legend content={<ChartLegend hover="" setHover={setHover} />} verticalAlign="top" />
      {stacked ? (
        type === 'activity' ? (
          roiTarget(data).map(({ grouped, sum }) => {
            return <Bar key={grouped} sum={sum} dataKey={grouped} stackId="a" barSize={13} fill={color(grouped)} onMouseEnter={() => setHover('')} />;
            // console.log(grouped);
          })
        ) : (
          stack(data)
            .target.sort((a, b) => (a.grouped < b.grouped ? 1 : a.grouped > b.grouped ? -1 : 0))
            .map((target, i) => {
              return (
                <Bar
                  key={i}
                  dataKey={target.grouped}
                  sum={target.sum}
                  stackId="a"
                  barSize={13}
                  fill={color(target.grouped) ? color(target.grouped) : i === 0 ? fill : i === 1 ? '#c3c8d6' : '#cc99cc'}
                  onMouseEnter={() => setHover('')}
                />
              );
            })
        )
      ) : (
        <Bar sum={chartData.reduce((sum, { value }) => sum + (value === 0 ? 1 : value), 0)} dataKey="value" barSize={13} fill={mql ? '#f0755c' : fill} onMouseEnter={() => setHover('value')} />
      )}
    </BarChart>
  );
};
