import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Calendar from '../Calendar';
import Inserter from './Inserter';
import CheckOutlined from '@material-ui/icons/CheckOutlined';
import Updater from './Updater';
import Dropdown from '../Dropdown';

const DIV = styled.div`
  display: flex;
  gap: 5px;
`;

const style = `
  margin-left: 5px;
  padding: 0 5px;
  width: 100%;
  vertical-align: middle;
  box-sizing: border-box;
  transform: skew(-0.1deg);
  border: 1px solid #e4e6ea;
  border-radius: 5px;
  resize: none;
`;

const INPUT = styled.input`
  ${style}
  height: 31px;
`;

const SELECT = styled.select`
  ${style}
  height: 33px;
`;

const CHECK = styled.div`
  input {
    display: none;
  }
  label {
    display: block;
    width: 20px;
    height: 20px;
    border: 1px solid #e4e6ea;
    border-radius: 5px;
  }
`;

const selectOptions = [
  {
    category: 'Homepage',
    type: 'effect',
    key: 'subcategory',
    options: ['페이지뷰', '순방문자수'],
  },
  {
    category: 'Homepage',
    type: 'activity',
    key: 'subcategory',
    options: ['제품 및 서비스', '뉴스 & 이벤트', '자료실 & 롤링'],
  },
  {
    category: 'PR',
    type: 'effect',
    key: 'subcategory',
    options: ['취재대응', '보도자료', '기고'],
  },
  {
    category: 'PR',
    type: 'activity',
    key: 'subcategory',
    options: ['취재대응', '보도자료', '기고'],
  },
  {
    category: 'SNS',
    type: 'effect',
    key: 'subcategory',
    options: ['블로그', '페이스북', '인스타그램', '유튜브'],
  },
  {
    category: 'SNS',
    type: 'activity',
    key: 'subcategory',
    options: ['블로그', '페이스북', '인스타그램', '유튜브'],
  },
  {
    category: 'AD',
    type: 'effect',
    key: 'subcategory',
    options: ['키워드 광고', '온라인 배너광고', '지면 광고'],
  },
  {
    category: 'AD',
    type: 'activity',
    key: 'subcategory',
    options: ['키워드 광고', '온라인 배너광고', '지면 광고'],
  },
  {
    category: 'Inbound',
    type: 'effect',
    key: 'subcategory',
    options: ['전달완료', '-'],
  },
  {
    category: 'Inbound(G)',
    type: 'effect',
    key: 'region',
    options: ['Asia', 'Middle East', 'Europe', 'North America', 'South America', 'Africa'],
  },
  {
    category: 'Inbound(G)',
    type: 'effect',
    key: 'subcategory',
    options: ['대응', '확인'],
  },
  {
    category: 'Inbound(G)',
    type: 'effect',
    key: 'rep',
    options: ['Colter', 'Frank', 'Jason', 'Rich', 'Sung Ha', '-'],
  },
];

const findSelectOptions = (category, type, key) => selectOptions.find((obj) => obj.category === category && obj.type === type && obj.key === key);

const TableInput = ({ filter, inputKeys, objUpdate, initUpdate, className, refetch }) => {
  const { category, type } = filter;
  const objInput = inputKeys.reduce((obj, key) => {
    return {
      ...obj,
      [key]: key === 'product' ? [] : key === 'value' ? 0 : findSelectOptions(category, type, key) ? findSelectOptions(category, type, key).options[0] : '',
    };
  }, {});

  const date = moment()
    .subtract(type === 'effect' ? 1 : 0, 'days')
    .format('YYYY-MM-DD');

  const [input, setInput] = useState(
    objUpdate
      ? objUpdate
      : {
          ...objInput,
          category,
          type,
          date,
        }
  );

  const onChange = (e, item) => {
    setInput({
      ...input,
      [item]: e.currentTarget.value,
    });
  };

  return (
    <tr className={className}>
      {inputKeys
        .filter((key) => key !== 'url')
        .map((key, i) => (
          <td key={`${key}${i}`}>
            {key === 'date' ? (
              useCallback(
                <Calendar
                  defaultDate={input.date}
                  setInput={(date) => {
                    setInput({ ...input, date });
                  }}
                />,
                [input.date]
              )
            ) : key === 'product' ? (
              useCallback(<Dropdown title="products" label="선택" defaultChecked={false} data={input.product} setDataFilter={(obj) => setInput({ ...input, ...obj })} />, [input.product])
            ) : key === 'roi' ? (
              <CHECK>
                <input
                  type="checkbox"
                  id={`${input._id ? input._id : 'insert'}-roi`}
                  checked={input[key]}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      [key]: e.currentTarget.checked,
                    })
                  }
                />
                <label htmlFor={`${input._id ? input._id : 'insert'}-roi`}>{input[key] && <CheckOutlined />}</label>
              </CHECK>
            ) : key === 'value' ? (
              <INPUT
                value={input[key]}
                type="number"
                min="0"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [key]: parseInt(e.currentTarget.value),
                  });
                }}
              />
            ) : findSelectOptions(category, type, key) ? (
              <SELECT value={input[key]} onChange={(e) => onChange(e, key)}>
                {findSelectOptions(category, type, key).options.map((option) => {
                  return (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  );
                })}
              </SELECT>
            ) : (
              <DIV>
                <INPUT value={input[key]} type="text" onChange={(e) => onChange(e, key)} />
                {key === 'reference' && <INPUT onChange={(e) => onChange(e, 'url')} />}
              </DIV>
            )}
          </td>
        ))}
      <td className="right">
        {objUpdate ? (
          <Updater input={input} initUpdate={initUpdate} refetch={refetch} filter={filter} />
        ) : (
          <Inserter
            input={input}
            initInput={() => {
              setInput({
                ...objInput,
                category,
                type,
                date,
              });
            }}
            refetch={refetch}
            filter={filter}
          />
        )}
      </td>
    </tr>
  );
};

export default TableInput;
