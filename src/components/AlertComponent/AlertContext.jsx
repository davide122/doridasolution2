"use client"
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const AlertContext = createContext();

export function useAlert() {
  return useContext(AlertContext);
}

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  const showAlert = (message, type = 'info') => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: '', type: '' });
    }, 3000); // dismiss alert after 3 seconds
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
      {alert.show && <Alert message={alert.message} type={alert.type} />}
    </AlertContext.Provider>
  );
};

const Alert = ({ message, type }) => {
  return (
    <div className={`alert alert-${type} alert-position`}>
      {message}
    </div>
  );
};
