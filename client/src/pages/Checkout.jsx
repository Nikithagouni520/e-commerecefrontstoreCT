import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import api from '../api/api.js';
import { useStore } from '../context/StoreContext.jsx';

export default function Checkout() {
  const { cart, user, clearCart, notify } = useStore();
  const nav = useNavigate();
  const [addr, setAddr] = useState(user?.address || { street: '', city: '', state: '', pincode: '', phone: '' });
  const items = cart?.items || [];
  const itemsPrice = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const tax = Number((itemsPrice * 0.05).toFixed(2));
  const shipping = itemsPrice > 999 ? 0 : 49;
  const orderItems = items.map(i => ({ product: i.product._id, qty: i.qty }));

  const place = async (e) => {
    e.preventDefault();
    try {
      const { data: order } = await api.post('/orders', { orderItems, shippingAddress: addr, paymentMethod: 'Mock Card' });
      await api.put(`/orders/${order._id}/pay`);
      await clearCart();
      notify('Order placed successfully');
      nav('/orders');
    } catch (err) {
      notify(err.response?.data?.message || 'Could not place order');
    }
  };

  return <form className="form checkout" onSubmit={place}>
    <h1>Checkout</h1>
    <p className="muted"><MapPin size={17}/> Set your delivery location.</p>
    {['street', 'city', 'state', 'pincode', 'phone'].map(k => <input key={k} required placeholder={k} value={addr[k] || ''} onChange={e => setAddr({ ...addr, [k]: e.target.value })}/>)}
    <div className="summary">
      <p>Items: ₹{itemsPrice.toLocaleString('en-IN')}</p>
      <p>Tax: ₹{tax.toLocaleString('en-IN')}</p>
      <p>Shipping: ₹{shipping.toLocaleString('en-IN')}</p>
      <h2>Total: ₹{(itemsPrice + tax + shipping).toLocaleString('en-IN')}</h2>
    </div>
    <button className="primary big" disabled={!items.length}>Pay & Place Order</button>
  </form>;
}
