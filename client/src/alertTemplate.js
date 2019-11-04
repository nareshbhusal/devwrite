import React from 'react';

let alertStyle = {
  backgroundColor: '#151515',
  color: 'white',
  padding: '1rem 2rem',
  margin: '2.5rem 0',
  borderRadius: '3px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0px 3px 2px 2px rgba(0, 0, 0, 0.03)',
  boxShadow: '0 2px 1.5rem 0 rgba(0,0,0,.3)',
  fontFamily: 'Arial',
  fontSize: '1.8rem',
  boxSizing: 'border-box',
  width: '100%',
  writable: true
}

let errorStyle = {
  border: '1px solid #ebccd1',
  backgroundColor: '#f2dede',
  color: '#a94442',
  writable: true,
  maxWidth: '90vw !important',
  width: '330px'
}

let successStyle = {
  backgroundColor: '#dff0d8',
  color: '#3c753d',
  border: '1px solid #d6e9c6',
  writable: true
}
  
let button = {
  marginLeft: '1.2rem',
  fontSize: '1.85rem',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  writable: true
}
let successButton = {
  ...button,
  color: '#bad6b8'
}
let failedButton = {
  ...button,
  color: '#e2bdbe'
}
  
const AlertTemplate = ({ message, options, style, close }) => {
  let buttonStyle=button;
  if (options.type === 'success'){
    alertStyle = { ...alertStyle, ...successStyle };
    buttonStyle = successButton;
  } else{
    alertStyle = { ...alertStyle, ...errorStyle };
    buttonStyle = failedButton;
  }
  return (
    <div style={{ ...alertStyle, ...style }}>
      <span style={{ flex: 2 }}>
          {message}
      </span>
      <button onClick={close} style={buttonStyle}>
        x
      </button>
    </div>
  );
}
  
export default AlertTemplate