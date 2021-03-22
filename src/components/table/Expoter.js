import React from 'react';
import styled from 'styled-components';
import { saveAs } from 'file-saver';

import SaveAlt from '@material-ui/icons/SaveAlt';

const EXPORTER = styled.button`
  width: 35px;
  height: 33px;
  line-height: 33px;
  text-align: center;
  svg {
    vertical-align: middle;
  }
`;

const r = (val) => {
  return val
    .toString()
    .replace(/,/gi, '，')
    .replace(/"/gi, '˝')
    .replace(/\n/gi, ' ')
    .replace(/(\r\n|\n|\r)/gm, ' ');
};

const toArrayR = (val) => {
  if (val) {
    return val.split(',').reduce((string, text, i) => {
      return i > 0 ? `${string}，${text}` : text;
    }, '');
  }
  return val;
};

export default ({ filter, data }) => {
  console.log;
  return (
    <EXPORTER
      onClick={() => {
        const blob = data.reduce(
          (string, item) => {
            const keys = (item) => Object.keys(item).filter((key) => key !== 'url');
            return `${string}\n${keys(item).map((key) => {
              return key === 'reference' ? (item[key] ? `=HYPERLINK("${item.url}"，"${r(item[key])}")` : '') : key === 'roi' ? (item[key] ? 'O' : '') : r(item[key]);
            })}`;
          },
          Object.keys(data[0]).filter((key) => key !== 'url')
        );

        const file = new Blob([`\ufeff${blob}`], {
          type: 'application/vnd.ms-excel;charset=utf-8',
          // type: 'application/octet-stream'
          // type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });

        saveAs(file, `${filter.category} ${filter.type} logs.xls`);
      }}
    >
      <SaveAlt />
    </EXPORTER>
  );
};
