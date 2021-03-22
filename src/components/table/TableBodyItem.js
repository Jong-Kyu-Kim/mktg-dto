import React, { useState } from 'react';
import moment from 'moment';
import KeyboardArrowDownOutlined from '@material-ui/icons/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlined from '@material-ui/icons/KeyboardArrowUpOutlined';
import EditOutlined from '@material-ui/icons/EditOutlined';
import CheckOutlined from '@material-ui/icons/CheckOutlined';

import TableInput from './TableInput';

import styled from 'styled-components';

const TR = styled.tr`
  &:first-child {
    td {
      border: 0;
    }
  }
  &:last-child {
    td {
      border-bottom: 1px solid #e4e6ea;
    }
  }
  td {
    &:not(.right) {
      span {
        display: inline-block;
        padding-left: 5px;
        line-height: 1.5;
        &.detail {
          color: #9ea0a5;
        }
        &.wb {
          word-break: break-all;
        }
      }
    }
    button {
      border: 1px solid #e4e6ea;
    }
  }
`;

const TableBodyItem = ({ filter, item, expand, setExpand, className, refetch }) => {
  const { category } = filter;
  const [input, setInput] = useState();
  const { date, subcategory, remark, rep } = item;
  const isNeedCheck = (moment(date) < moment(moment().format('YYYY-MM-DD')) && subcategory === '-' && (remark === '견적 문의' || remark === '제품 소개 요청') && rep === '') || rep === '확인중';
  //const isSNS = subcategory === '블로그' || subcategory === '페이스북' || subcategory === '인스타그램' || subcategory === '유튜브';
  const isSNS = /블로그|페이스북|인스타그램|유튜브/.test(subcategory);

  if (input) {
    return (
      <TableInput
        filter={filter}
        category={category}
        type={input.type}
        inputKeys={Object.keys(input).filter((key) => {
          if (/Inbound/.test(category) || input.type === 'activity') {
            return !/_id|type|value|url/.test(key);
          }
          return !/_id|type|url/.test(key);
        })}
        objUpdate={input}
        initUpdate={() => setInput()}
        className={className}
        refetch={refetch}
      />
    );
  }
  return (
    <TR className={className} onClick={setExpand}>
      {Object.keys(item)
        .filter((key) => !/_id|type|url/.test(key))
        .map((key, i) => {
          const color = isNeedCheck ? (rep === '확인중' ? '#3bbf86' : '#ed8697') : item[key] ? '#3e3f42' : '#9ea0a5';
          return (
            <td key={i}>
              <span style={{ color }}>
                {className === 'toggleDetail' && (isSNS && key === 'subcategory' ? '' : item[key] ? item[key] : expand ? '-' : '자세히 보기')}
                {className === 'detail' &&
                  ((isSNS && key === 'subcategory') || key === 'remark' ? item[key] : key !== 'title' && key !== 'value' ? '' : key === 'value' ? <strong>{item[key]}</strong> : item[key])}
                {className !== 'toggleDetail' &&
                  className !== 'detail' &&
                  (item[key] ? (
                    key === 'reference' ? (
                      <a href={item.url} target="_blank">
                        <span>{item[key]}</span>
                      </a>
                    ) : key === 'roi' && item[key] ? (
                      <CheckOutlined />
                    ) : key === 'product' && item[key] ? (
                      item[key].join().replace(/,/gi, ', ')
                    ) : (
                      item[key]
                    )
                  ) : isNeedCheck ? (
                    '확인 필요'
                  ) : (
                    ''
                  ))}
              </span>
            </td>
          );
        })}
      <td className="right">
        {/* {user && user.dept === 'GS사업팀' && } */}
        <button
          onClick={(e) => {
            e.preventDefault();
            expand === undefined &&
              setInput({
                ...item,
                value: parseInt(item.value),
              });
          }}
        >
          <span>{expand === undefined ? <EditOutlined /> : expand ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}</span>
        </button>
      </td>
    </TR>
  );
};

export default TableBodyItem;
