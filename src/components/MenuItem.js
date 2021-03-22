import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import loadable, { LoadableComponent } from '@loadable/component';
//import { SvgIconProps } from '@material-ui/core';

//const ErrorOutline = loadable(() => import('@material-ui/icons/ErrorOutline'));

const LI = styled.li`
  a {
    display: inline-block;
    padding: 17px 0 17px 25px;
    width: 100%;
    box-sizing: border-box;
    span {      
      font-size: 14px;
      font-weight: 800;
      letter-spacing: -.5px;
    }
    svg {
      margin-right: 7px;
      vertical-align: middle;
      font-size: 18px;
      fill: #9d9fa4
    }    
    &:hover {      
      background-color: #ebf4fc;
      span, svg {        
        color: #3b94e2;
        fill: #3b94e2;
      }
      svg.fi {
        stroke: #3b94e2;
        fill: #ebf4fc;
      }
    }
  }
`;

// interface MenuItem {
//   to: string,
//   title: string,
//   icon: LoadableComponent<SvgIconProps>,
//   err?: boolean
// }

export default ({ to, title, icon: Icon, err }) => {
  return (
    <LI role="none presentation">
      <Link to={to} role="menuitem">
        <Icon />
        <span>{title}</span>
        {/* {err && <ErrorOutline />} */}
      </Link>
    </LI>
  )
}