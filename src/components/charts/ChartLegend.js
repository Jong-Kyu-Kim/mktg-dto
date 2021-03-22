import React from 'react';
import styled from 'styled-components';

const UL = styled.ul`
  margin: 0 15px;
  width: 470px;
  height: 60px;
`;

const LI = styled.li`
  display: inline-block;
  margin: 0 4px 3px;
  opacity: ${(props) => props.opacity};
  &:before {
    content: '●';
    margin-right: 2px;
    color: ${(props) => props.color};
  }
  span + span {
    display: inline-block;
    margin-left: 3px;
  }
`;

export default ({ payload, hover, setHover }) => {
  return (
    <UL>
      {/* Inbound */}
      {payload.find((i) => i.dataKey === '전달완료' || i.dataKey === '-') && (
        <LI color="#c3c8d6">
          <span>Inbound 누계</span>
          <span>
            <strong>{String(payload.reduce((sum, { payload }) => sum + payload.sum, 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
          </span>
        </LI>
      )}

      {payload
        .filter(({ value }) => value !== '-' /* Inbound - 제외 */)
        .map(({ value, color, payload }, index) => {
          return (
            <LI key={`item-${index}`} color={color} opacity={hover === value ? 1 : hover === '' ? 1 : 0.2} onMouseEnter={() => setHover(value)} onMouseLeave={() => setHover('')}>
              <span>{payload.grouped ? payload.grouped : value === 'value' ? '누계' : value}</span>
              {location.pathname.indexOf('/dashboard') < 1 && location.pathname !== '/dto' && location.pathname !== '/dto/' && (
                <span>
                  <strong>{String(payload.sum).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
                </span>
              )}
            </LI>
          );
        })}
    </UL>
  );
};
