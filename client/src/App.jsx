import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Orders from './pages/Orders.jsx';
import Admin from './pages/Admin.jsx';

export default function App({ Protected }) {
  return <>
    <Navbar />
    <main className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/men" element={<Products category="Men" title="Men" />} />
        <Route path="/women" element={<Products category="Women" title="Women" />} />
        <Route path="/kids" element={<Products category="Kids" title="Kids" />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Protected userOnly><Cart /></Protected>} />
        <Route path="/checkout" element={<Protected userOnly><Checkout /></Protected>} />
        <Route path="/orders" element={<Protected userOnly><Orders /></Protected>} />
        <Route path="/admin" element={<Protected admin><Admin /></Protected>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
  </>;
}
