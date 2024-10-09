import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import PharmaGuardABI from '../abis/PharmaGuard.json';

function PharmacyDashboard({ account, provider }) {
  const [pharmacy, setPharmacy] = useState(null);
  const [drugs, setDrugs] = useState([]);

  useEffect(() => {
    const fetchPharmacyData = async () => {
      if (account && provider) {
        const contract = new ethers.Contract(PharmaGuardABI.address, PharmaGuardABI.abi, provider.getSigner());
        try {
          const pharmacyData = await contract.getPharmacy(account);
          setPharmacy(pharmacyData);
        } catch (error) {
          console.error('Error fetching pharmacy data:', error);
        }
      }
    };

    fetchPharmacyData();
  }, [account, provider]);

  const handleInitializePharmacy = async () => {
    if (account && provider) {
      const contract = new ethers.Contract(PharmaGuardABI.address, PharmaGuardABI.abi, provider.getSigner());
      try {
        await contract.initialPharmacy('My Pharmacy', 'Pharmacy Address');
        // Refresh pharmacy data after initialization
        const pharmacyData = await contract.getPharmacy(account);
        setPharmacy(pharmacyData);
      } catch (error) {
        console.error('Error initializing pharmacy:', error);
      }
    }
  };

  const handleFetchDrugs = async () => {
    if (account && provider) {
      const contract = new ethers.Contract(PharmaGuardABI.address, PharmaGuardABI.abi, provider.getSigner());
      try {
        const drugList = await contract.getDrugs();
        setDrugs(drugList);
      } catch (error) {
        console.error('Error fetching drugs:', error);
      }
    }
  };

  return (
    <div className="pharmacy-dashboard">
      <h2>Pharmacy Dashboard</h2>
      {pharmacy ? (
        <div>
          <h3>{pharmacy.name}</h3>
          <p>Address: {pharmacy.address}</p>
        </div>
      ) : (
        <button onClick={handleInitializePharmacy}>Initialize Pharmacy</button>
      )}
      <button onClick={handleFetchDrugs}>Fetch Available Drugs</button>
      <ul>
        {drugs.map((drug, index) => (
          <li key={index}>{drug.name} - {drug.price} ETH</li>
        ))}
      </ul>
    </div>
  );
}

export default PharmacyDashboard;