import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import globalStyles from '../styles/globals';

const OrderProcessing = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const { showLoading, hideLoading, showError } = useAppContext();

  const handleProcessOrder = async (e) => {
    e.preventDefault();
    // Implement the logic to process an order
    // This would typically involve interacting with your smart contract
    console.log(`Processing order: ${orderNumber}`);
    // You would call your contract method here
    // Remember to use showLoading() before the operation and hideLoading() after
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Order Processing</h2>
      <form onSubmit={handleProcessOrder} style={styles.form}>
        <input
          type="text"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          placeholder="Enter Order Number"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Process Order</button>
      </form>
      {/* Add more order processing functionality here */}
    </div>
  );
};

const styles = {
  ...globalStyles,
  container: {
    ...globalStyles.card,
    maxWidth: '600px',
    margin: '0 auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #bdc3c7',
  },
  button: {
    ...globalStyles.button,
    alignSelf: 'flex-start',
  },
};

export default OrderProcessing;