import { useEffect, useState } from 'react';
import api from '../api/api.js';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => { api.get('/orders/my').then(r => setOrders(r.data)); }, []);
  return <>
    <div className="page-title"><div><h1>My Orders</h1><p>Track placed orders, status, and payment.</p></div></div>
    <div className="table">{orders.map(o => <div className="order" key={o._id}>
      <b>Order #{o._id.slice(-6)}</b>
      <span>₹{o.totalPrice.toLocaleString('en-IN')}</span>
      <span>{o.status}</span>
      <span>{o.isPaid ? 'Paid' : 'Pending'}</span>
    </div>)}</div>
    {!orders.length && <p className="empty">No orders placed yet.</p>}
  </>;
}
