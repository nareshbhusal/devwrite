import React from 'react';

let alertStyle = {
    backgroundColor: '#151515',
    color: 'white',
    padding: '1rem',
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 3px 2px 2px rgba(0, 0, 0, 0.03)',
    fontFamily: 'Arial',
    boxSizing: 'border-box'
}

const errorStyle = {
    border: '1px solid #ebccd1',
    backgroundColor: '#f2dede',
    color: '#a94442'
}

const successStyle = {
    backgroundColor: '#dff0d8',
    color: '#3c753d',
    border: '1px solid #d6e9c6'
}
  
let buttonStyle = {
    marginLeft: '1.2rem',
    fontSize: '1.85rem',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: '#FFFFFF'
}
  
  const AlertTemplate = ({ message, options, style, close }) => {
      if (options.type === 'success'){
        alertStyle = { ...alertStyle, ...successStyle };
        buttonStyle.color = '#bad6b8';
      } else if (options.type === 'error'){
        alertStyle = { ...alertStyle, ...errorStyle };
        buttonStyle.color = '#e2bdbe';
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
    )
  }
  
  export default AlertTemplate