import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import PharmaGuardABI from '../abis/PharmaGuard.json';
import { useApp } from '../context/AppContext';

function DrugManagement({ account, provider }) {
  const [drugs, setDrugs] = useState([]);
  const [newDrug, setNewDrug] = useState({ name: '', price: '', storageConditions: '' });
  const { showLoading, hideLoading, showError, clearError } = useApp();

  useEffect(() => {
    fetchDrugs();
  }, [account, provider]);

  const fetchDrugs = async () => {
    if (account && provider) {
      const contract = new ethers.Contract(PharmaGuardABI.address, PharmaGuardABI.abi, provider.getSigner());
      try {
        showLoading();
        const drugList = await contract.getDrugs();
        setDrugs(drugList);
        hideLoading();
      } catch (error) {
        console.error('Error fetching drugs:', error);
        showError('Error fetching drugs. Please try again.');
        hideLoading();
      }
    }
  };

  const handleAddDrug = async (e) => {
    e.preventDefault();
    clearError();
    if (!newDrug.name || !newDrug.price || !newDrug.storageConditions) {
      showError('Please fill in all fields');
      return;
    }
    if (isNaN(parseFloat(newDrug.price)) || parseFloat(newDrug.price) <= 0) {
      showError('Please enter a valid price');
      return;
    }
    if (account && provider) {
      const contract = new ethers.Contract(PharmaGuardABI.address, PharmaGuardABI.abi, provider.getSigner());
      try {
        showLoading();
        await contract.initialDrug(newDrug.name, ethers.utils.parseEther(newDrug.price), newDrug.storageConditions);
        setNewDrug({ name: '', price: '', storageConditions: '' });
        await fetchDrugs();
        hideLoading();
      } catch (error) {
        console.error('Error adding drug:', error);
        showError('Error adding drug. Please try again.');
        hideLoading();
      }
    }
  };

  return (
    <div className="drug-management">
      <h2>Drug Management</h2>
      <form onSubmit={handleAddDrug}>
        <input
          type="text"
          placeholder="Drug Name"
          value={newDrug.name}
          onChange={(e) => setNewDrug({ ...newDrug, name: e.target.value })}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price (ETH)"
          value={newDrug.price}
          onChange={(e) => setNewDrug({ ...newDrug, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Storage Conditions"
          value={newDrug.storageConditions}
          onChange={(e) => setNewDrug({ ...newDrug, storageConditions: e.target.value })}
          required
        />
        <button type="submit">Add Drug</button>
      </form>
      <h3>Drug List</h3>
      <ul>
        {drugs.map((drug, index) => (
          <li key={index}>
            {drug.name} - {ethers.utils.formatEther(drug.price)} ETH
            <br />
            Storage: {drug.storageConditions}
            <br />
            Status: {drug.inStock ? 'In Stock' : 'Out of Stock'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DrugManagement;