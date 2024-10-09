import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import PharmaGuardABI from '../abis/PharmaGuard.json';

function OrderProcessing({ account, provider }) {
  const [drugs, setDrugs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchDrugs();
    fetchOrders();
  }, [account, provider]);

  const fetchDrugs = async () => {
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

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (account && provider && selectedDrug) {
      const contract = new ethers.Contract(PharmaGuardABI.address, PharmaGuardABI.abi, provider.getSigner());
      try {
        await contract.takeoutOrder(selectedDrug, quantity);
        fetchOrders();
      } catch (error) {
        console.error('Error placing order:', error);
      }
    }
  };

  const handleDispatchOrder = async (orderId) => {
    if (account && provider) {
      const contract = new ethers.Contract(PharmaGuardABI.address, PharmaGuardABI.abi, provider.getSigner());
      try {
        await contract.sendOut(orderId);
        fetchOrders();
      } catch (error) {
        console.error('Error dispatching order:', error);
      }
    }
  };

  const handleConfirmReceipt = async (orderId) => {
    if (account && provider) {
      const contract = new ethers.Contract(PharmaGuardABI.address, PharmaGuardABI.abi, provider.getSigner());
      try {
        await contract.signFor(orderId);
        fetchOrders();
      } catch (error) {
        console.error('Error confirming receipt:', error);
      }
    }
  };

  return (
    <div className="order-processing">
      <h2>Order Processing</h2>
      <form onSubmit={handlePlaceOrder}>
        <select value={selectedDrug} onChange={(e) => setSelectedDrug(e.target.value)}>
          <option value="">Select a drug</option>
          {drugs.map((drug, index) => (
            <option key={index} value={drug.id}>
              {drug.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <button type="submit">Place Order</button>
      </form>
      <h3>Your Orders</h3>
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
            {order.status === 'Pending' && (
              <button onClick={() => handleDispatchOrder(order.id)}>Dispatch</button>
            )}
            {order.status === 'Dispatched' && (
              <button onClick={() => handleConfirmReceipt(order.id)}>Confirm Receipt</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderProcessing;