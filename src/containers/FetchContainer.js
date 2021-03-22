import React, { useState, useEffect, cloneElement, } from 'react';
import moment from 'moment';
import Wrapper from 'Components/Wrapper';
import Header from 'Components/Header';

const getMoment = date => moment(date).format('YYYY-MM-DD');

export default (props) => {
  const { title, target, children } = props;

  // const fromDate = moment(new Date(toDate)).businessSubtract(4);
  // const toDate = moment(new Date()).prevBusinessDay();  

  const fromDate = moment().subtract(1, 'weeks');
  const toDate = moment().subtract(1, 'days');  
  
  const [data, setData] = useState([])
  const [filter, setFilter] = useState({
    fromDate: fromDate ? getMoment(fromDate) : getMoment(moment().subtract(1, 'month')),
    toDate: toDate ? getMoment(toDate) : getMoment(new Date())
  });

  const upperCase = `${target.substr(0, 1).toUpperCase()}${target.substr(1, target.length - 1)}`;

  useEffect(() => {
    fetch('/dto/stock').then(res => res.text()).then(xml => {
      const data = JSON.parse(xml).stockprice.TBL_DailyStock[0].DailyStock.map(({ $ }) => {
        
        return {          
          date: new Date('20' + $.day_Date).getTime(),
          [target]: parseInt($[`day_${upperCase}`].replace(',', '')),
          //volume: parseInt($.day_Volume.replace(',', '').replace(',', '')),
          detail: [
            { _id: target, value: parseInt($[`day_${upperCase}`].replace(',', '')) },
            //{ _id: 'volume', value: parseInt($.day_Volume.replace(',', '').replace(',', '')) },
          ]
        }
      }).filter($ => {
        return moment(filter.fromDate) <= moment($.date) && moment(filter.toDate) >= moment($.date);       
      }).sort((a, b) => {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
      });
      setData(data);
    });
  }, [filter])

  if (data.length) {
    return (
      <Wrapper>
        <Header 
          title={title}
          data={data}
          filter={filter}
          setFilter={obj => {
            setFilter({
              ...filter,
              ...obj
            });            
          }}
        />
        {cloneElement(children, {
          data: data,
          filter,
          target
        })}
      </Wrapper>
    )    
  }

  return (
    <Wrapper />
  )
}