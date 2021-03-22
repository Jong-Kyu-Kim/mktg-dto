import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

const DROPDOWN = styled.div`
  position: relative;
  > button {
    margin: 0;
    padding: 0 3px 0 10px;
    width: 100%;
    min-width: 75px;
    height: 33px;
    line-height: 20px;
    text-align: left;
    border: 1px solid #e4e6ea;
    span {
      vertical-align: middle;
      color: #3e3f42;
    }
    svg {
      float: right;
    }
    &.th {
      padding: 0;
      height: 19px;
      overflow: hidden;
      border: 0 !important;
      svg {
        float: none;
      }
      & + .expanded {
        top: 31px;
      }
    }
  }
  > div {
    position: absolute;
    display: none;
    padding: 10px 0;
    width: 180px;
    text-align: left;
    z-index: 2;
    background-color: #fff;
    border: 1px solid #e4e6ea;
    border-radius: 5px;
    &.expanded {
      display: block;
    }
    ul {
      max-height: 200px;
      overflow: auto;
      li {
        padding: 5px 10px;
        input {
          margin-right: 5px;
          vertical-align: middle;
        }
        label {
          span {
            color: #3e3f42;
          }
        }
      }
    }
    div {
      padding-top: 10px;
      text-align: center;
      border-top: 1px solid #e4e6ea;
      button {
        width: 100px !important;
        height: 30px !important;
        border: 1px solid #e4e6ea;
        /* border */
      }
    }
  }
`;

const products = ['FDR', 'FRV', 'FED', 'FED-M', 'FSW', 'FSS', 'FSP', 'FILM', 'Wrapsody', 'Wrapsody eCo', 'ADID', 'Sparrow', 'DigitalPage', 'FasooBlock', 'Fasoo', 'Consulting', 'Partner'];

const Dropdown = ({ title, label, defaultChecked, data, setDataFilter }) => {
  const [layer, setLayer] = useState(false);
  // const [items, setItems] = useState(
  //   defaultChecked
  //     ? data.map((data) => {
  //         return data.grouped ? data.grouped : data;
  //       })
  //     : []
  // );

  const getItems = (target) => {
    return data.reduce((arr, { detail }) => {
      detail.forEach(({ detail }) => {
        detail.forEach((item) => {
          if (arr.indexOf(item[target]) < 0) {
            arr.push(item[target]);
          }
        });
      });

      return arr;
    }, []);
  };

  return (
    <DROPDOWN>
      {title === 'PR 상세내역' ? (
        <select
          onChange={(e) => {
            const selectedElement = e.currentTarget[e.currentTarget.selectedIndex];

            if (selectedElement.parentElement.label === '분류별') {
              setDataFilter({
                target: ['title', 'subcategory', 'value'],
                match:
                  selectedElement.innerHTML === '전체'
                    ? {}
                    : {
                        subcategory: [selectedElement.innerHTML],
                      },
              });
            } else {
              setDataFilter({
                target: ['subcategory', 'date', 'value'],
                match: {
                  title: [selectedElement.innerHTML],
                },
              });
            }
          }}
        >
          <optgroup label="분류별">
            <option>전체</option>
            {getItems('subcategory').map((item, i) => (
              <option key={i}>{item}</option>
            ))}
          </optgroup>
          <optgroup label="언론사별">
            {getItems('title').map((item, i) => (
              <option key={i}>{item}</option>
            ))}
          </optgroup>
        </select>
      ) : (
        <>
          <button onClick={() => setLayer(!layer)}>
            <span>{label}</span>
            {title === 'products' && <span>({data.length})</span>}
            <ArrowDropDown />
          </button>
          <div className={layer ? 'expanded' : ''}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setLayer(false);

                if (title !== 'products') {
                  const checkedElements = Array.prototype.filter.call(e.currentTarget.firstChild.children, (item) => {
                    return item.firstChild.checked;
                  });

                  const items = Array.prototype.map.call(checkedElements, (item) => {
                    return item.lastChild.firstChild.innerHTML;
                  });

                  setDataFilter({
                    match: {
                      category: items, // 타겟 설정 필요
                    },
                  });
                }
              }}
            >
              <ul>
                {(title === 'products' ? products : data).map((item, i) => {
                  const id = Math.random().toString(36).substr(2, 10);
                  const label = item.grouped ? item.grouped : item;
                  return (
                    <li key={i}>
                      {title === 'products' ? (
                        <input
                          id={`${id}${i}`}
                          type="checkbox"
                          checked={data.indexOf(label) >= 0}
                          onChange={(e) => {
                            setDataFilter({
                              product: e.currentTarget.checked ? data.concat(label) : data.filter((item) => item !== label),
                            });
                          }}
                        />
                      ) : (
                        <input id={`${id}${i}`} type="checkbox" defaultChecked={defaultChecked} />
                      )}
                      <label htmlFor={`${id}${i}`}>
                        <span>{label}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              <div className="center">
                <button>
                  <span>확인</span>
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </DROPDOWN>
  );
};

export default Dropdown;
