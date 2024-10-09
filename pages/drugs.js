import React from 'react';
import Layout from '../components/Layout';
import DrugManagement from '../components/DrugManagement';

export default function DrugsPage() {
  return (
    <Layout>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Drug Management</h1>
      <DrugManagement />
    </Layout>
  );
}