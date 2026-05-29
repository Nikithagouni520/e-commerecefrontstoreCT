import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext.jsx';

export default function Cart() {
  const { cart, updateQty, removeCart } = useStore();
  const items = cart?.items || [];
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const hasUnavailable = items.some(i => !i.product.countInStock || i.qty > i.product.countInStock);

  return <>
    <div className="page-title"><div><h1>Cart</h1><p>Update quantities, review stock, and continue to checkout.</p></div></div>
    {items.length === 0 ? <p className="empty">Your cart is empty.</p> : <div className="cart-layout">
      <div>{items.map(i => <div className="cart-item" key={i.product._id}>
        <img src={i.product.image} alt={i.product.name}/>
        <div><h3>{i.product.name}</h3><p>₹{i.product.price.toLocaleString('en-IN')}</p><p className={i.product.countInStock ? 'stock ok' : 'stock out'}>{i.product.countInStock ? `${i.product.countInStock} in stock` : 'Stock unavailable'}</p></div>
        <input type="number" min="1" max={i.product.countInStock} value={i.qty} onChange={e => updateQty(i.product._id, Number(e.target.value))}/>
        <strong>₹{(i.product.price * i.qty).toLocaleString('en-IN')}</strong>
        <button className="icon-button" onClick={() => removeCart(i.product._id)}><Trash2 size={17}/></button>
      </div>)}</div>
      <aside className="summary"><h2>Total</h2><strong>₹{total.toLocaleString('en-IN')}</strong><p>Taxes and delivery are calculated at checkout.</p><Link className={`primary big ${hasUnavailable ? 'disabled' : ''}`} to={hasUnavailable ? '#' : '/checkout'}>Checkout</Link>{hasUnavailable && <p className="stock out">Remove unavailable items before checkout.</p>}</aside>
    </div>}
  </>;
}
