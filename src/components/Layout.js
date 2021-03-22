import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import MenuList from './MenuList';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    line-height: 1;
    font-size: 13px;
    font-family: 'NanumSquare', sans-serif;
    font-weight: 700;
    color: #3e3f42;
    text-decoration: none;    
  }

  body {
    position: relative;
    background-color: #fbfbfd;
  }

  strong {
    font-weight: 800;
  }

  h2 {
    margin-left: 30px;
    margin-bottom: 35px;
    span {
      font-size: 22px;
    }
  }

  span {
    display: inline-block;
    line-height: 1.25;
    transform: skew(-0.1deg);
    svg {
      /* margin-right: 5px; */
      vertical-align: middle;
      fill: #9d9fa4 !important;
      &.fi {
        fill: #fff;
        stroke: #9d9fa4;
      }
    }
  }

  button {
    overflow: hidden;
    background-color: #fff;
    border: 0;
    border-radius: 5px;
  }

  svg {
    transform: skew(-0.1deg);
  }
  
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {    
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    z-index: 1031 !important;
    background-color: #3b94e2;
  }
`;

const CONTENT = styled.section`
  margin: 0 auto;
  padding-top: 35px;
  /* margin-left: 240px; */
  min-width: 1080px;
  overflow: hidden;
`;

const DIV = styled.div`
  display: flex;
`;

export default ({ children }) => {
  window.scroll(0, 0);
  return (
    <DIV>
      <GlobalStyle />
      {location.pathname !== '/dto' && location.pathname !== '/dto/' && <MenuList />}
      <CONTENT>{children}</CONTENT>
    </DIV>
  );
};
