import { Link } from 'react-router-dom';

export default function Home() {
  return <section className="hero">
    <div>
      <p className="eyebrow">ShopSphere Storefront</p>
      <h1>Browse, compare, cart, checkout, and track orders.</h1>
      <p>A MERN ecommerce app with separate shopping sections for men, women, and kids plus admin tools for dashboard counts, product stock, edit, delete, and add product.</p>
      <div className="actions"><Link className="primary big" to="/products">Start Shopping</Link><Link className="secondary big" to="/admin">Admin Panel</Link></div>
    </div>
    <div className="category-panel">
      <Link to="/men"><span>Men</span><b>Clothing, shoes, and daily essentials</b></Link>
      <Link to="/women"><span>Women</span><b>Fashion, accessories, and lifestyle</b></Link>
      <Link to="/kids"><span>Kids</span><b>School, play, and comfort picks</b></Link>
    </div>
  </section>;
}
