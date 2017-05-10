import React from 'react';
import { render } from 'react-dom';
import AppProvider from './appProvider';
import 'todomvc-app-css/index.css';

window.onerror = function(msg, url, lineNo, colNo, err){
  console.log('err');
}

render(
  <AppProvider/>,
  document.getElementById('root')
);
