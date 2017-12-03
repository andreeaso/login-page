import 'babel-polyfill';

import ReactDOM from 'react-dom';
import React from 'react';
import App from 'App';

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('app');
  ReactDOM.render(<App />, el);
});
