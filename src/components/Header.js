import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import Calendar from './Calendar';
import Dropdown from './Dropdown';

// import loadable from '@loadable/component';
// const Select = loadable(() => import('./Select'));
// const RangeCalendar = loadable(() => import('./calendar/RangeCalendar'));
// const ArrowDropDown = loadable(() => import('@material-ui/icons/ArrowDropDown'));

const HEADER = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 55px;
  border-bottom: 1px solid #edeff3;
  h3 {
    span {
      color: #3e3f42;
      font-size: 16px;
      font-weight: 800;
      letter-spacing: -1.5px;
    }
  }
  > div {
    display: flex;
    align-items: center;
    gap: 3px;
    > button {
      width: 40px;
      height: 33px;
      transform: skew(-0.1deg);
      border: 1px solid #e4e6ea;
      border-radius: 5px;
    }
    select {
      display: inline-block;
      width: 100%;
      height: 33px;
      transform: skew(-0.1deg);
      border: 1px solid #e4e6ea;
      border-radius: 5px;
    }
  }
`;

export default ({ title, data, setDataFilter, filter, setFilter }) => {
  const [zoom, setZoom] = useState(false);

  return (
    <HEADER>
      <h3>
        <span>{title}</span>
      </h3>
      <div>
        {title === 'MKTG Effect' && (
          <button
            onClick={(e) => {
              e.preventDefault();
              const titleWrap = e.currentTarget.parentElement?.parentElement;
              const wrap = titleWrap?.parentElement;

              if (wrap && titleWrap) {
                if (zoom) {
                  wrap.style.width = '500px';
                  wrap.style.height = '460px';
                  titleWrap.nextElementSibling.style.height = '400px';
                  titleWrap.nextElementSibling.firstElementChild.style.top = '-250px';
                  titleWrap.nextElementSibling.firstElementChild.style.left = '-250px';
                  titleWrap.nextElementSibling.firstElementChild.style.width = '1000px';
                  titleWrap.nextElementSibling.firstElementChild.style.height = '1000px';
                } else {
                  wrap.style.width = 'calc(100% - 85px)';
                  wrap.style.height = `${window.innerHeight - 90}px`;
                  titleWrap.nextElementSibling.style.height = `${window.innerHeight - 90 - 55}px`;
                  titleWrap.nextElementSibling.firstElementChild.style.top = '-15%';
                  titleWrap.nextElementSibling.firstElementChild.style.left = '-15%';
                  titleWrap.nextElementSibling.firstElementChild.style.width = '130%';
                  titleWrap.nextElementSibling.firstElementChild.style.height = '130%';
                }
              }

              setZoom(!zoom);
            }}
          >
            <span>{zoom ? '축소' : '확대'}</span>
          </button>
        )}
        {(location.pathname.indexOf('/dashboard') > 0 || title === 'PR 상세내역') && (
          <div>{useCallback(<Dropdown title={title} label="선택" defaultChecked={true} data={data} setDataFilter={setDataFilter} />, [filter])}</div>
        )}

        {/* {!query && title !== 'MKTG Effect' && location.pathname.indexOf('dashboard') >= 0 && <button onClick={() => setFilter({ last: !filter.last })}><span>비교</span></button>} */}
        <div style={{ width: '210px' }}>{useCallback(<Calendar filter={filter} setFilter={setFilter} />, [filter])}</div>
      </div>
    </HEADER>
  );
};
