import React, { useState } from 'react';
import moment from 'moment';
import Picker from 'rc-calendar/lib/Picker';
import Calendar from 'rc-calendar';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import koKR from 'rc-calendar/lib/locale/ko_KR';
import styled from 'styled-components';

import CalendarTodayOutlined from '@material-ui/icons/CalendarTodayOutlined';

// import loadable from '@loadable/component';
// const CalendarTodayOutlined = loadable(() => import('@material-ui/icons/CalendarTodayOutlined'));

import 'rc-calendar/assets/index.css';
import 'rc-time-picker/assets/index.css';

const format = (v) => (v ? v.format('YYYY-MM-DD') : '');
const isValidRange = (v) => v && v[0] && v[1];

const DIV = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  border: 1px solid #e4e6ea;
  border-radius: 5px;
  input {
    margin: 0;
    ${({ date }) => date && 'padding-left: 5px'};
    width: 100%;
    height: 31px;
    box-sizing: border-box;
    ${({ date }) => !date && 'text-align: center'};
    vertical-align: middle;
    transform: skew(-0.1deg);
    background-color: #fff;
    border: 0;
  }
  svg {
    margin: 0 0 0 10px;
    font-size: 16px;
    fill: #9d9fa4;
    vertical-align: middle;
  }
`;

const SIDEBAR = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100px;
  border-right: 1px solid #ccc;
  button {
    position: relative;
    margin: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    z-index: 1;
    border: 0;
    border-bottom: 1px solid #e9e9e9;
    cursor: pointer;
  }
  + div {
    margin-left: 100px;
  }
`;

export default ({ defaultDate, setInput, filter, setFilter }) => {
  //console.log(defaultDate);
  // const showLastMonth = title.indexOf('Homepage') >= 0 || title.indexOf('PR') >= 0 || title.indexOf('SNS') >= 0 || title.indexOf('AD') >= 0;
  // const fromDate = showLastMonth ? now.clone().subtract(1, 'months') : moment(new Date('2019-01-01'))

  const now = defaultDate ? moment(new Date(defaultDate)) : moment();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultDate ? now : [moment(new Date(filter.fromDate)), moment(new Date(filter.toDate))]);

  const renderSidebar = () => {
    const onClick = (fromDate, toDate) => {
      setOpen(false);
      setValue([fromDate, now]);
      setFilter({
        fromDate: format(fromDate),
        toDate: format(toDate),
      });
    };

    // const friday = now.clone().subtract(1, 'weeks').startOf('isoWeek').subtract(3, 'days');
    // const tuesday = now.clone().subtract(1, 'weeks').endOf('isoWeek').subtract(3, 'days');

    return (
      <SIDEBAR>
        <button onClick={() => onClick(now.clone().subtract(1, 'months'), now)}>
          <span>지난 1개월</span>
        </button>
        <button onClick={() => onClick(now.clone().subtract(1, 'weeks'), now)}>
          <span>지난 1주</span>
        </button>
        <button onClick={() => onClick(now, now)}>
          <span>오늘</span>
        </button>
        {/* <BUTTON onClick={() => onClick(friday, tuesday)}><span>보고</span></BUTTON> */}
      </SIDEBAR>
    );
  };

  const disabledDate = (endValue) => {
    const startValue = moment(new Date('2019-01-02')).format('YYYY-MM-DD');
    if (!endValue) return false;
    if (!startValue) return false;
    return endValue.diff(startValue, 'days') < 0;
  };

  const calendar = <Calendar locale={koKR} disabledDate={disabledDate} />;

  const rangeCalendar = (
    <RangeCalendar
      // dateInputPlaceholder={['Start', 'End']}
      renderSidebar={renderSidebar}
      locale={koKR}
      disabledDate={disabledDate}
      // disabledTime={disabledTime}
      style={{ width: '603px' }}
    />
  );

  return (
    <Picker
      onOpenChange={(open) => setOpen(open)}
      open={open}
      value={value}
      onChange={(value) => {
        setValue(value);
        if (defaultDate) {
          setInput(format(value));
        } else {
          setFilter({
            fromDate: format(value[0]),
            toDate: format(value[1]),
          });
        }
      }}
      animation="slide-up"
      calendar={defaultDate ? calendar : rangeCalendar}
    >
      {({ value }) => {
        return (
          <DIV date={defaultDate}>
            {!defaultDate && <CalendarTodayOutlined />}
            <input type="text" value={defaultDate ? format(value) : (isValidRange(value) && `${format(value[0])} ~ ${format(value[1])}`) || ''} readOnly />
          </DIV>
        );
      }}
    </Picker>
  );
};
