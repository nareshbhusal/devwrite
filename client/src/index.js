import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from './alertTemplate';


// config for react-alet
const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 3000,
    offset: '3rem',
    transition: transitions.FADE
  }

ReactDOM.render(
    <AlertProvider template={AlertTemplate} {...options}>
        <App />
    </AlertProvider>,
    document.querySelector('#root')
);