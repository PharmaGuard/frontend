import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import PharmaGuardABI from '../abis/PharmaGuard.json';

function Tracking({ account, provider }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
    setupEventListeners();
  }, [account, provider]);

  const fetchOrders = async () => {
    if (account && provider) {
      const contract = new ethers.Contract(PharmaGuardABI.address, PharmaGuardABI.abi, provider.getSigner());
      try {
        const orderList = await contract.getOrders(account);
        setOrders(orderList);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }
  };

  const setupEventListeners = () => {
    if (account && provider) {
      const contract = new ethers.Contract(PharmaGuardABI.address, PharmaGuardABI.abi, provider);

      contract.on('OrderDispatched', (orderId, event) => {
        console.log('Order dispatched:', orderId.toString());
        fetchOrders();
      });

      contract.on('OrderDelivered', (orderId, event) => {
        console.log('Order delivered:', orderId.toString());
        fetchOrders();
      });

      return () => {
        contract.removeAllListeners('OrderDispatched');
        contract.removeAllListeners('OrderDelivered');
      };
    }
  };

  const handleSelectOrder = async (orderId) => {
    if (account && provider) {
      const contract = new ethers.Contract(PharmaGuardABI.address, PharmaGuardABI.abi, provider.getSigner());
      try {
        const orderDetails = await contract.getOrderDetails(orderId);
        setSelectedOrder(orderDetails);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    }
  };

  return (
    <div className="tracking">
      <h2>Order Tracking</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            Order ID: {order.id.toString()}
            <br />
            Drug: {order.drugName}
            <br />
            Quantity: {order.quantity.toString()}
            <br />
            Status: {order.status}
            <br />
            <button onClick={() => handleSelectOrder(order.id)}>View Details</button>
          </li>
        ))}
      </ul>
      {selectedOrder && (
        <div>
          <h3>Order Details</h3>
          <p>Order ID: {selectedOrder.id.toString()}</p>
          <p>Drug: {selectedOrder.drugName}</p>
          <p>Quantity: {selectedOrder.quantity.toString()}</p>
          <p>Status: {selectedOrder.status}</p>
          {/* Add more order details here */}
        </div>
      )}
    </div>
  );
}

export default Tracking;