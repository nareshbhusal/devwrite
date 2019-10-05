import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'

const AlertTemplate = ({ style, options, message, close }) => {
    console.log(message)
    style = {
        margin: '3rem',
        backgroundColor: 'tomato',
        color: '#fff',
        border: '1px solid red',
        padding: '1rem'
    }
    return (
    <div style={style}>
      {options.type === 'info' && '!'}
      {options.type === 'success' && ':)'}
      {options.type === 'error' && ':('}
      {message}
      <button onClick={close}>X</button>
    </div>
)};

// config for react-alet
const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 500000,
    offset: '3rem',
    transition: transitions.FADE
  }

ReactDOM.render(
    <AlertProvider template={AlertTemplate} {...options}>
        <App />
    </AlertProvider>,
    document.querySelector('#root')
);