import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);
  const showError = (message) => setError(message);
  const clearError = () => setError(null);

  return (
    <AppContext.Provider value={{ loading, error, showLoading, hideLoading, showError, clearError }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}