import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
//Bootstrap-icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App';

import reportWebVitals from './reportWebVitals';
import AppTest from './AppTests';

ReactDOM.render(
  <React.StrictMode>
    <App />
  {/* <AppTest></AppTest> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
