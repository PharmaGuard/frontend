import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ethers } from 'ethers';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PharmacyDashboard from './components/PharmacyDashboard';
import DrugManagement from './components/DrugManagement';
import OrderProcessing from './components/OrderProcessing';
import Tracking from './components/Tracking';
import { AppProvider, useApp } from './context/AppContext';
import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const { showLoading, hideLoading, showError } = useApp();

  useEffect(() => {
    const connectWallet = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          showLoading();
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);
          setProvider(provider);
          hideLoading();
        } catch (error) {
          console.error('Failed to connect wallet:', error);
          showError('Failed to connect wallet. Please try again.');
          hideLoading();
        }
      } else {
        showError('MetaMask is not installed. Please install it to use this app.');
      }
    };

    connectWallet();
  }, [showLoading, hideLoading, showError]);

  return (
    <Router>
      <div className="App">
        <Navbar account={account} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" render={() => <PharmacyDashboard account={account} provider={provider} />} />
          <Route path="/drugs" render={() => <DrugManagement account={account} provider={provider} />} />
          <Route path="/orders" render={() => <OrderProcessing account={account} provider={provider} />} />
          <Route path="/tracking" render={() => <Tracking account={account} provider={provider} />} />
        </Switch>
      </div>
    </Router>
  );
}

function AppWrapper() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}

export default AppWrapper;