import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import api from '../api/api.js';
import ProductCard from '../components/ProductCard.jsx';

const categories = ['Men', 'Women', 'Kids', 'Mobiles', 'Laptops', 'Audio', 'Fashion', 'Wearables', 'Accessories'];

export default function Products({ category = '', title = 'Products' }) {
  const [data, setData] = useState({ products: [], page: 1, pages: 1, count: 0 });
  const [q, setQ] = useState({ keyword: '', category, sort: 'newest', min: '', max: '', page: 1 });
  const activeCategory = category || q.category;

  useEffect(() => setQ(prev => ({ ...prev, category, page: 1 })), [category]);

  const params = useMemo(() => ({
    ...q,
    category: activeCategory,
    min: q.min || undefined,
    max: q.max || undefined
  }), [q, activeCategory]);

  const load = async () => {
    const { data } = await api.get('/products', { params });
    setData(data);
  };

  useEffect(() => { load(); }, [q.page, q.sort, activeCategory]);

  const apply = (e) => {
    e.preventDefault();
    setQ(prev => ({ ...prev, page: 1 }));
    load();
  };

  return <>
    <div className="page-title">
      <div>
        <p className="eyebrow">Storefront</p>
        <h1>{title}</h1>
        <p>Search items, sort by price or rating, and add available products to your cart.</p>
      </div>
      <span className="count-pill">{data.count} items</span>
    </div>

    <form className="filters" onSubmit={apply}>
      <label className="search-box"><Search size={18}/><input placeholder="Search by item, brand, description" value={q.keyword} onChange={e => setQ({ ...q, keyword: e.target.value })}/></label>
      {!category && <select value={q.category} onChange={e => setQ({ ...q, category: e.target.value, page: 1 })}><option value="">All Categories</option>{categories.map(c => <option key={c}>{c}</option>)}</select>}
      <input placeholder="Min price" value={q.min} onChange={e => setQ({ ...q, min: e.target.value })}/>
      <input placeholder="Max price" value={q.max} onChange={e => setQ({ ...q, max: e.target.value })}/>
      <select value={q.sort} onChange={e => setQ({ ...q, sort: e.target.value })}>
        <option value="newest">Newest</option>
        <option value="priceLow">Price: Low to High</option>
        <option value="priceHigh">Price: High to Low</option>
        <option value="rating">Rating: High to Low</option>
      </select>
      <button className="primary"><SlidersHorizontal size={17}/> Apply</button>
    </form>

    <div className="grid">{data.products.map(p => <ProductCard key={p._id} product={p} onDeleted={load}/>)}</div>
    {!data.products.length && <p className="empty">No products found for this search.</p>}
    <div className="pagination">{Array.from({ length: data.pages }, (_, i) => <button key={i} className={q.page === i + 1 ? 'active' : ''} onClick={() => setQ({ ...q, page: i + 1 })}>{i + 1}</button>)}</div>
  </>;
}
