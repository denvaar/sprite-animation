import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app.js';
import '../styles/styles.css';


ReactDOM.render(
  <App />,
  document.getElementById('app')
);

if (module.hot) module.hot.accept();
