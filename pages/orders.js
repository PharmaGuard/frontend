import React from 'react';
import Layout from '../components/Layout';
import OrderProcessing from '../components/OrderProcessing';

export default function OrdersPage() {
  return (
    <Layout>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Orders</h1>
      <OrderProcessing />
    </Layout>
  );
}