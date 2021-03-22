import React from 'react';
import Graph from 'react-graph-vis';
import styled from 'styled-components';
import color from './color';

const DIV = styled.div`
  position: relative;
  height: 400px;
  overflow: hidden;
`;

const dataURL = (label, value, color) => {
  const style = (color) => `
    display: table-cell;
    width: 100px;
    height: 100px;
    vertical-align: middle;
    text-align: center;
    overflow: hidden;
    background-color: ${color};
    font-size: 18px;
    border-radius: 100px;
    box-shadow: 5px 5px 5px #ccc;
  `;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="110" height="110">      
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="${style(color)}">
            <strong style="color:#333;">${label}</strong><br/>
            <span>(${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')})</span>
        </div>
      </foreignObject>
    </svg>
  `;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const concatData = (data) => {
  return data.reduce((array, { detail }) => {
    return array.concat(detail);
  }, []);
};

export default ({ data }) => {
  const root = [
    {
      id: 'root',
      label: '',
      size: 0,
      borderWidth: 0,
      color: {
        background: 'transparent',
        border: '#e3e6ea',
      },
    },
  ];

  const child = concatData(data);
  const grandChild = concatData(child);

  const parents = (nodes) =>
    data.map(({ grouped, value }) => {
      if (nodes) {
        return {
          id: grouped,
          image: dataURL(grouped, value, color(grouped)),
          shape: 'image',
          color: color(`${grouped} Child`),
          size: 40,
        };
      }
      return {
        from: 'root',
        to: grouped,
        length: 120,
      };
    });

  const parentNodes = parents(true);
  const parentEdges = parents(false);

  const childs = (nodes) =>
    child.reduce((array, { category, subcategory, value }) => {
      if ((subcategory && category === 'Homepage') || category === 'PR' || category === 'SNS' || category === 'AD') {
        if (nodes) {
          return array.concat({
            id: subcategory,
            image: dataURL(subcategory, value, color(`${category} Child`)),
            shape: 'image',
            color: color(`${category} Child`),
            size: 30,
          });
        }
        return array.concat({
          from: category,
          to: subcategory,
          length: 70,
        });
      }
      return array;
    }, []);

  const childNodes = childs(true);
  const childEdges = childs(false);

  const grandChilds = (nodes, cate, subcate, length) =>
    grandChild
      .reduce((array, { category, subcategory, title, value }) => {
        if (category === cate && subcategory === subcate && title !== 'ETC') {
          if (nodes) {
            return array.concat({
              id: title,
              image: dataURL(title, value, color(`${category} Child`)),
              shape: 'image',
              color: color(`${category} Child`),
            });
          }
          return array.concat({
            from: subcategory,
            to: title,
            length: 50,
          });
        } else return array;
      }, [])
      .slice(0, length);

  const homepageNodes = grandChilds(true, 'Homepage', '페이지뷰', 2);
  const adNodes = grandChilds(true, 'AD', '키워드 광고', 2);
  const homepageEdges = grandChilds(false, 'Homepage', '페이지뷰', 2);
  const adEdges = grandChilds(false, 'AD', '키워드 광고', 3);

  return (
    <DIV>
      <Graph
        graph={{
          nodes: parentNodes.concat(childNodes, homepageNodes, adNodes, root),
          edges: parentEdges.concat(childEdges, homepageEdges, adEdges),
        }}
        options={{
          autoResize: true,
          width: '100%',
          height: '100%',
          edges: {
            arrows: {
              to: false,
            },
          },
        }}
        style={{ position: 'absolute', top: '-250px', left: '-250px', width: '1000px', height: '1000px' }}
      />
    </DIV>
  );
};
