import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const DrugManagement = () => {
  const [drugName, setDrugName] = useState('');
  const [quantity, setQuantity] = useState('');
  const { showLoading, hideLoading, showError } = useAppContext();

  const handleAddDrug = async (e) => {
    e.preventDefault();
    // Implement the logic to add a drug to the inventory
    // This would typically involve interacting with your smart contract
    console.log(`Adding drug: ${drugName}, Quantity: ${quantity}`);
    // You would call your contract method here
    // Remember to use showLoading() before the operation and hideLoading() after
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Drug Management</h2>
      <form onSubmit={handleAddDrug} style={styles.form}>
        <input
          type="text"
          value={drugName}
          onChange={(e) => setDrugName(e.target.value)}
          placeholder="Drug Name"
          style={styles.input}
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add Drug</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '1.5em',
    color: '#2c3e50',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    fontSize: '1em',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  button: {
    marginTop: '10px',
    padding: '10px',
    fontSize: '1em',
    color: 'white',
    backgroundColor: '#3498db',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default DrugManagement;