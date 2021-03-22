import React, { useState, cloneElement, useEffect } from 'react';
import moment from 'moment';
import useQuery from '../hooks/useQuery';
import Wrapper from 'Components/Wrapper';
import Header from 'Components/Header';
import { useApolloClient } from '@apollo/react-hooks';

const group = (data, dataFilter) => {
  const getUnwindData = (data) => {
    return data.reduce((arr, item) => {
      item.product.forEach((product) => {
        arr.push({
          ...item,
          product,
        });
      });
      return arr;
    }, []);
  };

  const [target1, target2, target3] = dataFilter.target;
  const { sort } = dataFilter;
  const matchTargets = Object.keys(dataFilter.match);

  const filterMatchData =
    matchTargets.length > 0
      ? matchTargets.reduce((arr, target) => {
          const matchItems = dataFilter.match[target];
          matchItems.forEach((matchItem) => {
            data
              .filter((dataItem) => dataItem[target] === matchItem)
              .forEach((dataItem) => {
                dataItem.show = dataItem[target] === matchItem;
                arr.push(dataItem);
              });
          });
          return arr;
        }, [])
      : data.map((dataItem) => ({ ...dataItem, show: true }));

  const unwindData = target1 === 'product' ? getUnwindData(filterMatchData) : filterMatchData;

  return unwindData.reduce((arr, item) => {
    const { category, subcategory } = item;
    const value = item.show ? (item.value === 0 ? 1 : item.value) : 0;
    const date = new Date(item.date).getTime();
    const targetIndex = arr.findIndex((i) => {
      return i.grouped === (target1 === 'date' ? new Date(item[target1]).getTime() : item[target1]);
      //i._id === item[target1]
    });

    if (targetIndex >= 0) {
      const parent = arr[targetIndex];
      parent.value += value;

      const target2Index = parent.detail.findIndex((i) => {
        return i[target2] === (target2 === 'date' ? date : item[target2]);
        //return i[target2] === item[target2]
      });

      if (target2Index >= 0) {
        const thisTarget = parent.detail[target2Index];

        const target3Index = thisTarget.detail.findIndex((i) => i[target3] === item[target3]);

        if (target3Index >= 0) {
          thisTarget.detail[target3Index].value += value;
        } else {
          thisTarget.detail.push({
            // _id: item[target3],
            // category,
            // subcategory,
            // title,
            // value,
            // date
            ...item,
            grouped: target3 === 'date' ? date : item[target3],
          });
        }

        thisTarget.value += value;
      } else {
        parent.detail.push({
          grouped: target2 === 'date' ? date : item[target2],
          category,
          subcategory,
          value,
          date,
          // detail: [{
          //   _id: item[target3],
          //   category,
          //   subcategory,
          //   title,
          //   value,
          //   date,
          // }]
          detail: [
            {
              ...item,
              grouped: target3 === 'date' ? date : item[target3],
            },
          ],
        });

        parent.detail = parent.detail.sort((a, b) => (a.grouped < b.grouped ? -1 : a.grouped > b.grouped ? 1 : 0));
      }
    } else {
      arr.push({
        grouped: target1 === 'date' ? date : item[target1],
        category,
        subcategory,
        value: value,
        date,
        // show: true,
        detail: [
          {
            grouped: target2 === 'date' ? date : item[target2],
            category,
            subcategory,
            value,
            date,
            // detail: [{
            //   _id: item[target3],
            //   category,
            //   subcategory,
            //   title,
            //   value,
            //   date
            // }]
            detail: [
              {
                ...item,
                grouped: target3 === 'date' ? date : item[target3],
              },
            ],
          },
        ],
      });
    }

    return arr.sort((a, b) => {
      if (sort) {
        return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0;
      }
      return a.grouped < b.grouped ? -1 : a.grouped > b.grouped ? 1 : 0;
    });
  }, []);
};

const DataContainer = (props) => {
  const { title, category, type, target, fromDate, toDate, sort, roi, children } = props;

  const [dataFilter, setDataFilter] = useState({
    target,
    match: {},
    sort,
  });

  // const toDate = moment(new Date()).prevBusinessDay().format('YYYY-MM-DD');
  // const fromDate = moment(new Date(toDate)).businessSubtract(4).format('YYYY-MM-DD');

  const getMoment = (date) => moment(date).format('YYYY-MM-DD');
  const [filter, setFilter] = useState({
    category,
    type,
    fromDate: fromDate ? getMoment(fromDate) : getMoment(moment().subtract(1, 'month')),
    toDate: toDate ? getMoment(toDate) : getMoment(new Date()),
  });

  // console.log(filter);

  const [loading, queryData, refetch] = useQuery({
    ...filter,
    fromDate: roi ? getMoment(moment(filter.fromDate).subtract(1, 'weeks')) : filter.fromDate,
  });

  const client = useApolloClient();

  useEffect(() => {
    return () => {
      client.cache.reset();
    };
  }, []);

  if (queryData) {
    const fromTime = new Date(filter.fromDate).getTime();
    const toTime = new Date(filter.toDate).getTime();

    const range = (start, stop, step) => {
      return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
    };

    const adData = range(fromTime, toTime, 86400000)
      .map((date) => {
        return {
          date: moment(date).format('YYYY-MM-DD'),
          category: 'AD',
          subcategory: '실시간 키워드 광고',
          value: 1,
        };
      })
      .concat(queryData.results);

    const roiData = adData
      .filter(({ roi }) => roi !== false)
      .reduce((array, roiData) => {
        const { date, category, subcategory, title } = roiData;
        const objData = (add) => ({
          date: moment(date).businessAdd(add).format('YYYY-MM-DD'),
          category,
          subcategory,
          title,
          value: 1,
          roi: date,
        });

        // 2wd
        if (category === 'PR' || category === 'Newsletter' || category === 'C-Level' || subcategory === '페이스북' || subcategory === '인스타그램' || subcategory === '지면 광고') {
          return array.concat(roiData, objData(1));
        }

        // 5wd
        if (category === 'Homepage') {
          return array.concat(roiData, objData(1), objData(2), objData(3), objData(4));
        }

        // from to
        if (subcategory === '키워드 광고' || subcategory === '온라인 배너광고' || category === 'Promotion') {
          const thisEvent = queryData.results.filter((data) => data.subcategory === subcategory && data.title === title);
          const lastDay = thisEvent[thisEvent.length - 1].date;
          const fromTo = [];

          for (let i = 1; moment(date).businessAdd(i) < moment(lastDay); i++) {
            fromTo.push(objData(i));
          }

          return array.concat(roiData, fromTo);
        }

        // after 2wd
        if (category === 'Event' || category === 'Event(G)') {
          const thisEvent = queryData.results.filter((data) => data.subcategory === subcategory);
          const lastDay = thisEvent[thisEvent.length - 1].date;

          if (date === lastDay) return array.concat(roiData, objData(1), objData(2));
        }
        return array.concat(roiData);
      }, [])
      .filter(({ date }) => moment(date) >= moment(filter.fromDate) && moment(date) <= moment(filter.toDate));

    const mqlData = queryData.results.filter(({ rep, subcategory }) => rep !== 'Drop' && subcategory === '전달완료').map((item) => ({ ...item, subcategory: 'MQL' }));
    const data = roi
      ? roiData
      : /활동별 AD 내역/.test(title)
      ? group(adData, dataFilter)
      : title.indexOf('MQL') > 0
      ? group(mqlData, dataFilter)
      : target
      ? group(queryData.results, dataFilter)
      : queryData.results;

    return (
      <Wrapper isTable={title.indexOf('Logs') > 0}>
        <Header
          title={title}
          data={data}
          setDataFilter={(obj) => {
            setDataFilter({
              ...dataFilter,
              ...obj,
            });
          }}
          filter={filter}
          setFilter={(obj) => {
            setFilter({
              ...filter,
              ...obj,
            });
          }}
        />
        {data.length > 0 &&
          cloneElement(children, {
            data: data,
            filter,
            type,
            refetch,
          })}
      </Wrapper>
    );
  }

  return <Wrapper />;
};

export default DataContainer;
