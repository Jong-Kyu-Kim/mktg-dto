import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const TOOLTIP = styled.div`
  line-height: 24px;
  border: 1px solid #f5f5f5;
  background-color: hsla(0, 0%, 100%, 0.8);
  padding: 10px;
  > div + div {
    margin-top: 3px;
  }
  span + span {
    display: inline-block;
    margin-left: 5px;
  }
`;

const TooltipItem = ({ label, color, value }) => {
  return (
    <div>
      {label && <span>{typeof label === 'string' ? (label === 'endPrice' ? '종가' : label === 'volume' ? '거래량' : label) : moment(new Date(label)).format('YYYY-MM-DD')}</span>}
      <span>
        <strong style={{ color }}>{String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
      </span>
    </div>
  );
};

export default ({ hover, payload, label }) => {
  if (payload) {
    return (
      <TOOLTIP>
        <div>
          <span>
            <strong>{typeof label === 'string' ? label : moment(new Date(label)).format('YYYY-MM-DD')}</strong>
          </span>
        </div>

        {/* Inbound */}
        {payload.find((i) => i.dataKey === '전달완료' || i.dataKey === '-') && (
          <div>
            <span>Inbound</span>
            <span>
              <strong>{String(payload.reduce((sum, { value }) => sum + (value === 0 ? 1 : value), 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
            </span>
          </div>
        )}

        {payload.map((data, i) => {
          const color = data.stroke ? data.stroke : data.fill;
          if (data.payload.detail.length < 5) {
            return (
              <div key={data.name}>
                {/* {data.name === hover && data.payload.detail[0]._id !== data.name && data.payload.detail.map((data, i) => { */}
                {data.name === hover &&
                  data.payload.detail
                    .filter(({ grouped }) => grouped !== '-') // Inbound '-' 제외
                    .map((data, j) => {
                      // Homepage Effect 순방문자수
                      return <TooltipItem key={j} label={data.grouped} color={color} value={data.value === 0 ? 1 : data.value} />;
                    })}
                {!hover && data.name !== '-' && <TooltipItem key={i} label={data.name} color={color} value={data.value} />}
              </div>
            );
          } else {
            return data.name === hover && <TooltipItem key={i} label={data.name === 'value' ? '' : data.name} color={color} value={data.value} />;
          }
        })}
      </TOOLTIP>
    );
  }

  return null;
};
