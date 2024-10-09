import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, setState] = useState({
    // Add any initial state properties here
  });

  const showLoading = () => {
    // Implement showLoading logic
  };

  const hideLoading = () => {
    // Implement hideLoading logic
  };

  const showError = (message) => {
    // Implement showError logic
  };

  return (
    <AppContext.Provider value={{ state, setState, showLoading, hideLoading, showError }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}