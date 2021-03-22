import React from 'react';
import styled from 'styled-components';

const WRAPPER = styled.div`
  display: inline-block;
  margin-left: 30px;
  margin-bottom: 40px;
  width: ${({ isTable }) => isTable ? 'calc(100% - 80px)' : '500px'};
  height: ${({ isTable }) => isTable ? '500px' : '460px'};
  overflow: hidden;
  box-shadow: 1px 1px 3px #ccc;
  border-radius: 10px;
  background-color: #fff;
`;

export default ({ isTable, children }) => (
  <WRAPPER isTable={isTable}>
    {children}
  </WRAPPER>
)