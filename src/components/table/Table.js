import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Exporter from './Expoter';
import TableBodyItem from './TableBodyItem';
import TableInput from './TableInput';

const TABLE = styled.div`
  table {
    width: 100%;
    border: 0;
    border-collapse: collapse;
    border-spacing: 0;
    &.thead {
      button {
        margin-left: 0;
        color: #3e3f42;
        border: 1px solid #edeff3;
      }
      td {
        border-bottom: 1px solid #edeff3;
      }
    }
    th {
      padding: 5px 20px;
      height: 32px;
      text-align: left;
      border-bottom: 1px solid #edeff3;
      span {
        color: #9ea0a5;
      }
    }
    td {
      padding: 5px 20px;
      height: 44px;
      border-top: 1px solid #edeff3;
      &.reference {
        input {
          width: calc(50% - 20px);
          &:first-child {
            width: calc(49% - 20px);
            margin-right: 1%;
          }
        }
      }
      a span {
        color: #3b94e2;
        text-decoration: underline;
      }
      input,
      button,
      textarea,
      select {
        margin: 0;
      }
      input:disabled {
        color: #ccc;
      }
      button {
        width: 35px;
        height: 33px;
        border: 1px solid #e4e6ea;
        span {
          color: #3e3f42;
        }
        &:disabled {
          span {
            color: #ccc;
          }
          svg {
            fill: #ccc;
          }
        }
      }
      > span {
        &:after {
          content: ', ';
        }
        &:last-child:after {
          content: '';
        }
      }
      .check {
        display: block;
        width: 20px;
        height: 20px;
        border: 1px solid #e4e6ea;
        border-radius: 5px;
      }
    }
    th.right,
    td.right {
      padding-right: 25px;
      text-align: right;
    }
  }
  .tbody {
    height: 350px;
    overflow: auto;
    overflow: overlay;
    tr {
      &.detail {
        td {
          border-top: 1px dashed #edeff3;
          background-color: #fbfefd;
        }
      }
    }
  }
`;

const items = (data, tbodyItems) => {
  return data.reduce((arr, target1) => {
    if (target1.detail) {
      return arr.concat(
        target1.detail.reduce((arr, target2) => {
          return arr.concat(
            target2.detail.map((target3) => {
              return getItem(target3, tbodyItems);
            })
          );
        }, [])
      );
    }
    return arr.concat(target1);
  }, []);
};

const getItem = (data, tbodyItems) => {
  return tbodyItems.reduce(
    (obj, tbodyItem) => {
      return {
        ...obj,
        [tbodyItem]: tbodyItem === 'date' ? moment(data[tbodyItem]).format('YYYY-MM-DD') : tbodyItem === 'value' ? String(data[tbodyItem]).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : data[tbodyItem],
      };
    },
    { _id: data._id, type: data.type }
  );
};

const ItemDetail = ({ filter, target2, tbodyItems, refetch }) => {
  const [expand, setExpand] = useState(false);
  const item = getItem(target2, tbodyItems);
  return (
    <>
      <TableBodyItem filter={filter} item={item} expand={expand} setExpand={() => setExpand(!expand)} className="toggleDetail" refetch={refetch} />
      {expand &&
        target2.detail.map((target3, i) => {
          const item = getItem(target3, tbodyItems);
          return <TableBodyItem key={i} filter={filter} item={item} className="detail" refetch={refetch} />;
        })}
    </>
  );
};

const TableBodyItems = ({ filter, data, tbodyItems, refetch }) => {
  const { type } = filter;

  if (type === 'activity') {
    return items(data, tbodyItems).map((item, i) => {
      return <TableBodyItem key={i} filter={filter} item={item} refetch={refetch} />;
    });
  }

  return data.reduce((arr, target1, i) => {
    if (target1.detail) {
      return arr.concat(
        target1.detail.map((target2, j) => {
          if (target2.detail.length > 1) {
            return <ItemDetail key={`${i}-${j}`} filter={filter} target2={target2} tbodyItems={tbodyItems} refetch={refetch} />;
          }
          return target2.detail.map((target3, i) => {
            return <TableBodyItem key={i} filter={filter} item={getItem(target3, tbodyItems)} refetch={refetch} />;
          });
        })
      );
    }
    return arr.concat(<TableBodyItem key={i} filter={filter} item={getItem(target1, tbodyItems)} refetch={refetch} />);
  }, []);
};

const Table = ({ filter, data, refetch, cols, theadItems, tbodyItems }) => {
  const Colgroup = () => (
    <colgroup>
      {cols.map((col, i) => (
        <col key={i} style={{ width: `${col}%` }} />
      ))}
    </colgroup>
  );

  return (
    <TABLE>
      <div>
        <table className="thead">
          <Colgroup />
          <thead>
            <tr>
              {theadItems.map((item, i) => (
                <th key={`${item}${i}`}>
                  <span>{item}</span>
                </th>
              ))}
              <th className="right">
                <Exporter filter={filter} data={items(data, tbodyItems)} />
              </th>
            </tr>
          </thead>
          <tbody>
            <TableInput filter={filter} inputKeys={tbodyItems} refetch={refetch} />
          </tbody>
        </table>
      </div>
      <div className="tbody">
        {/* <div className="tbody" style={{ height: data.user && data.user.dept === 'GS사업팀' ? '350px' : '405px'}}> */}
        <table>
          <Colgroup />
          <tbody>
            <TableBodyItems filter={filter} data={data} tbodyItems={tbodyItems} refetch={refetch} />
          </tbody>
        </table>
      </div>
    </TABLE>
  );
};

export default Table;
