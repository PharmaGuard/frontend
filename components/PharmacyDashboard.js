import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import globalStyles from '../styles/globals';

const PharmacyDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { showLoading, hideLoading, showError } = useAppContext();

  useEffect(() => {
    // Fetch mock data for demonstration
    setOrders([
      { id: '001', drugName: 'Aspirin', status: 'Delivered', expectedDelivery: '2023-05-15' },
      { id: '002', drugName: 'Ibuprofen', status: 'In Transit', expectedDelivery: '2023-05-18' },
      { id: '003', drugName: 'Paracetamol', status: 'Pending', expectedDelivery: '2023-05-20' },
      { id: '004', drugName: 'Amoxicillin', status: 'In Transit', expectedDelivery: '2023-05-19' },
      { id: '005', drugName: 'Lisinopril', status: 'Delivered', expectedDelivery: '2023-05-14' },
    ]);
  }, []);

  const totalOrders = orders.length;
  const deliveredToday = orders.filter(order => order.status === 'Delivered' && order.expectedDelivery === new Date().toISOString().split('T')[0]).length;
  const pendingOrders = orders.filter(order => order.status === 'Pending').length;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pharmacy Dashboard</h1>
      <div style={styles.statusCards}>
        <StatusCard icon="📦" title="Total Orders" value={totalOrders} />
        <StatusCard icon="✅" title="Delivered Today" value={deliveredToday} />
        <StatusCard icon="⏳" title="Pending Orders" value={pendingOrders} />
      </div>
      <div style={styles.tableContainer}>
        <h2 style={styles.tableTitle}>Current Delivery Status</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Drug Name</th>
              <th style={styles.tableHeader}>Order ID</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Expected Delivery</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                <td style={styles.tableCell}>{order.drugName}</td>
                <td style={styles.tableCell}>{order.id}</td>
                <td style={styles.tableCell}>
                  <span style={getStatusStyle(order.status)}>{order.status}</span>
                </td>
                <td style={styles.tableCell}>{order.expectedDelivery}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => console.log('Refresh data')}>Refresh Data</button>
        <button style={styles.button} onClick={() => console.log('View details')}>View Details</button>
      </div>
    </div>
  );
};

const StatusCard = ({ icon, title, value }) => (
  <div style={styles.statusCard}>
    <span style={styles.statusIcon}>{icon}</span>
    <h3 style={styles.statusTitle}>{title}</h3>
    <p style={styles.statusValue}>{value}</p>
  </div>
);

const getStatusStyle = (status) => {
  const baseStyle = {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  };
  switch (status) {
    case 'Delivered':
      return { ...baseStyle, backgroundColor: '#2ecc71', color: 'white' };
    case 'In Transit':
      return { ...baseStyle, backgroundColor: '#3498db', color: 'white' };
    case 'Pending':
      return { ...baseStyle, backgroundColor: '#f39c12', color: 'white' };
    default:
      return baseStyle;
  }
};

const styles = {
  ...globalStyles,
  container: {
    ...globalStyles.container,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  statusCards: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  statusCard: {
    flex: '1 1 200px',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  statusIcon: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  statusTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '0.5rem',
  },
  statusValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#3498db',
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflowX: 'auto',
  },
  tableTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '1rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#ecf0f1',
    color: '#2c3e50',
    fontWeight: 'bold',
    padding: '0.75rem',
    textAlign: 'left',
  },
  tableRowEven: {
    backgroundColor: 'white',
  },
  tableRowOdd: {
    backgroundColor: '#f8f9fa',
  },
  tableCell: {
    padding: '0.75rem',
    borderBottom: '1px solid #ecf0f1',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '2rem',
  },
  button: {
    ...globalStyles.button,
    fontSize: '1rem',
    padding: '0.75rem 1.5rem',
  },
};


export default PharmacyDashboard;