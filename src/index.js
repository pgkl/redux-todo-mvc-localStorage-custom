import React from 'react';
import { render } from 'react-dom';
import AppProvider from './appProvider';
import 'todomvc-app-css/index.css';


render(
  <AppProvider/>,
  document.getElementById('root')
);
