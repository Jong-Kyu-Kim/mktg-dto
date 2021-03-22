import React from 'react';
import { render } from 'react-dom';
import Apollo from './apollo';
import Router from './router';
//import loadable from '@loadable/component';


render(  
  <Apollo>
    <Router />
  </Apollo>,
  document.getElementById('app')
);