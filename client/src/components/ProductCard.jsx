import { Link } from 'react-router-dom';
import { Heart, Pencil, ShoppingCart, Star, Trash2 } from 'lucide-react';
import api from '../api/api.js';
import { useStore } from '../context/StoreContext.jsx';
export default function ProductCard({ product, onDeleted }) {
  const { addToCart, wishlist, toggleWishlist, user, notify } = useStore();
  const isAdmin = user?.role === 'admin';
  const wished = wishlist.some(p => p._id === product._id);
  const remove = async () => {
    await api.delete(`/products/${product._id}`);
    notify('Product deleted');
    onDeleted?.();
  };
  return <article className="card product-card">
    {!isAdmin && <button className={`wish ${wished ? 'active' : ''}`} onClick={() => toggleWishlist(product._id)}><Heart size={18}/></button>}
    <Link to={`/products/${product._id}`}><img src={product.image} alt={product.name}/></Link>
    <div className="product-body"><span className="category">{product.category}</span><h3>{product.name}</h3><p>{product.brand}</p>
      <div className="row"><strong>₹{product.price.toLocaleString('en-IN')}</strong><span><Star size={15}/> {product.rating}</span></div>
      <p className={product.countInStock ? 'stock ok' : 'stock out'}>{product.countInStock ? `${product.countInStock} in stock` : 'Stock unavailable'}</p>
      {isAdmin ? <div className="admin-card-actions"><Link className="secondary" to={`/admin?edit=${product._id}`}><Pencil size={16}/> Edit</Link><button className="secondary" onClick={remove}><Trash2 size={16}/> Delete</button></div> : <button className="primary" disabled={!product.countInStock} onClick={() => addToCart(product._id)}><ShoppingCart size={17}/> Add to Cart</button>}
    </div>
  </article>;
}
