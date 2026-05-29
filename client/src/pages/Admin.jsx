import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/api.js';

const empty = { name: '', brand: '', category: 'Men', description: '', image: '', photos: '', price: '', countInStock: '' };
const categories = ['Men', 'Women', 'Kids', 'Mobiles', 'Laptops', 'Audio', 'Fashion', 'Wearables', 'Accessories'];

export default function Admin() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState('dashboard');
  const [stats, setStats] = useState({});
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(empty);
  const [edit, setEdit] = useState(null);

  const load = async () => {
    const [statsRes, productsRes] = await Promise.all([
      api.get('/admin/stats'),
      api.get('/products', { params: { pageSize: 100 } })
    ]);
    setStats(statsRes.data);
    setProducts(productsRes.data.products);
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    const editId = searchParams.get('edit');
    if (!editId || !products.length) return;
    const product = products.find(p => p._id === editId);
    if (product) startEdit(product);
  }, [searchParams, products]);

  const save = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      brand: form.brand,
      category: form.category,
      description: form.description,
      image: form.image,
      photos: String(form.photos || '').split(',').map(p => p.trim()).filter(Boolean),
      price: Number(form.price),
      countInStock: Number(form.countInStock)
    };
    if (edit) await api.put(`/products/${edit}`, payload);
    else await api.post('/products', payload);
    setForm(empty);
    setEdit(null);
    setSearchParams({});
    setTab('dashboard');
    load();
  };

  const startEdit = (p) => {
    setEdit(p._id);
    setForm({ ...p, photos: (p.photos || []).join(', ') });
    setTab('add');
  };

  const remove = async (id) => {
    await api.delete(`/products/${id}`);
    if (edit === id) {
      setEdit(null);
      setForm(empty);
    }
    load();
  };

  return <>
    <div className="page-title">
      <div>
        <p className="eyebrow">Admin</p>
        <h1>Admin Panel</h1>
        <p>Use Dashboard for product stock, edit and delete. Use Add Product to create or update items.</p>
      </div>
      <div className="admin-tabs">
        <button className={tab === 'dashboard' ? 'primary' : 'secondary'} onClick={() => setTab('dashboard')}>Dashboard</button>
        <button className={tab === 'add' ? 'primary' : 'secondary'} onClick={() => setTab('add')}>Add Product</button>
      </div>
    </div>

    {tab === 'dashboard' && <>
      <div className="stats">{['users', 'products', 'orders', 'pendingOrders', 'outOfStock', 'sales'].map(k => <div className="stat" key={k}><span>{k}</span><b>{k === 'sales' ? `₹${Math.round(stats[k] || 0)}` : stats[k] || 0}</b></div>)}</div>
      <h2>Products</h2>
      <div className="admin-list">{products.map(p => <div key={p._id}>
        <span>{p.name}<small>{p.category} - {p.brand}</small></span>
        <b>₹{p.price.toLocaleString('en-IN')}</b>
        <span className={p.countInStock ? 'stock ok' : 'stock out'}>{p.countInStock ? `${p.countInStock} in stock` : 'Stock unavailable'}</span>
        <button onClick={() => startEdit(p)}>Edit</button>
        <button onClick={() => remove(p._id)}>Delete</button>
      </div>)}</div>
    </>}

    {tab === 'add' && <form className="form admin-form" onSubmit={save}>
      <h2>{edit ? 'Edit Product' : 'Add Product'}</h2>
      <input required placeholder="Product name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}/>
      <input required placeholder="Brand" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })}/>
      <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>{categories.map(c => <option key={c}>{c}</option>)}</select>
      <input required type="number" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}/>
      <input required type="number" placeholder="No. of items present" value={form.countInStock} onChange={e => setForm({ ...form, countInStock: e.target.value })}/>
      <input required placeholder="Main photo URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })}/>
      <input placeholder="More photo URLs separated by comma" value={form.photos} onChange={e => setForm({ ...form, photos: e.target.value })}/>
      <textarea required placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}/>
      <button className="primary">{edit ? 'Update Product' : 'Create Product'}</button>
      {edit && <button type="button" onClick={() => { setEdit(null); setForm(empty); setSearchParams({}); }}>Cancel</button>}
    </form>}
  </>;
}
