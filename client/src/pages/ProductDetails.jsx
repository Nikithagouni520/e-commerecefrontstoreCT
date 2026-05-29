import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import api from '../api/api.js';
import { useStore } from '../context/StoreContext.jsx';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, notify, user } = useStore();
  const isAdmin = user?.role === 'admin';
  const [p, setP] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [qty, setQty] = useState(1);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const photos = useMemo(() => p?.photos?.length ? p.photos : [p?.image].filter(Boolean), [p]);
  const [activePhoto, setActivePhoto] = useState('');

  const load = async () => {
    const [{ data: product }, { data: related }] = await Promise.all([
      api.get(`/products/${id}`),
      api.get(`/products/${id}/similar`)
    ]);
    setP(product);
    setSimilar(related);
    setActivePhoto((product.photos?.length ? product.photos : [product.image])[0]);
  };

  useEffect(() => { load(); }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    await api.post(`/products/${id}/reviews`, review);
    setReview({ rating: 5, comment: '' });
    notify('Review added');
    load();
  };

  if (!p) return <p>Loading...</p>;

  return <>
    <section className="details">
      <div>
        <img className="detail-image" src={activePhoto || p.image} alt={p.name}/>
        <div className="photo-strip">{photos.map(photo => <button key={photo} className={activePhoto === photo ? 'active' : ''} onClick={() => setActivePhoto(photo)}><img src={photo} alt="Product"/></button>)}</div>
      </div>
      <div>
        <span className="category">{p.category}</span>
        <h1>{p.name}</h1>
        <p>{p.description}</p>
        <h2>₹{p.price.toLocaleString('en-IN')}</h2>
        <p className="rating-line"><Star size={18}/> {p.rating} rating ({p.numReviews} reviews)</p>
        <p className={p.countInStock ? 'stock ok' : 'stock out'}>{p.countInStock ? `${p.countInStock} items available` : 'Stock unavailable'}</p>
        {isAdmin ? <p className="admin-note">Admin account is for managing products and orders only. Use a normal user account to shop.</p> : <div className="buy-row">
            <input type="number" min="1" max={p.countInStock} value={qty} onChange={e => setQty(Number(e.target.value))}/>
            <button className="primary big" disabled={!p.countInStock} onClick={() => addToCart(p._id, qty)}><ShoppingCart size={18}/> Add to Cart</button>
          </div>}
        <form onSubmit={submit} className="review">
          <h3>Add Review</h3>
          <select value={review.rating} onChange={e => setReview({ ...review, rating: e.target.value })}>{[5, 4, 3, 2, 1].map(n => <option key={n}>{n}</option>)}</select>
          <textarea required placeholder="Your review" value={review.comment} onChange={e => setReview({ ...review, comment: e.target.value })}/>
          <button>Submit</button>
        </form>
      </div>
    </section>

    <section className="compare">
      <div className="page-title"><h2>Compare Similar Products</h2><p>Same category or brand, sorted by best rating and price.</p></div>
      <div className="compare-grid">
        {[p, ...similar].map(item => <Link className="compare-card" to={`/products/${item._id}`} key={item._id}>
          <img src={item.image} alt={item.name}/>
          <b>{item.name}</b>
          <span>₹{item.price.toLocaleString('en-IN')}</span>
          <span>{item.rating} rating</span>
          <span>{item.countInStock ? 'Available' : 'Unavailable'}</span>
        </Link>)}
      </div>
    </section>

    <section className="reviews">
      <h2>Reviews</h2>
      {p.reviews?.map(r => <div className="review-item" key={r._id}><b>{r.name}</b><span>{r.rating} rating</span><p>{r.comment}</p></div>)}
      {!p.reviews?.length && <p>No reviews yet.</p>}
    </section>
  </>;
}
