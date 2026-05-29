import { Link, NavLink } from 'react-router-dom';
import { Monitor, Moon, ShoppingCart, ShieldCheck, Sun } from 'lucide-react';
import { useStore } from '../context/StoreContext.jsx';
export default function Navbar() {
  const { user, logout, cartCount, theme, setTheme } = useStore();
  const isAdmin = user?.role === 'admin';
  const initials = user?.name?.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase() || user?.email?.slice(0, 2).toUpperCase();
  return <header className="nav"><Link className="logo" to="/">ShopSphere</Link><nav>
    <NavLink to="/products">Products</NavLink>
    <NavLink to="/men">Men</NavLink>
    <NavLink to="/women">Women</NavLink>
    <NavLink to="/kids">Kids</NavLink>
    {user && !isAdmin && <NavLink to="/orders">Orders</NavLink>}
    {isAdmin && <NavLink to="/admin"><ShieldCheck size={16}/> Admin</NavLink>}
    {!isAdmin && <NavLink to="/cart"><ShoppingCart size={17}/> Cart <span className="badge">{cartCount}</span></NavLink>}
    {user ? <div className="account-box">
      <div className="avatar" title={user.name || user.email}>{initials}</div>
      <div className="account-meta"><b>{user.name}</b><span>{user.email}</span></div>
      <div className="theme-switch" aria-label="Theme selector">
        <button className={theme === 'system' ? 'active' : ''} title="System theme" onClick={() => setTheme('system')}><Monitor size={15}/></button>
        <button className={theme === 'light' ? 'active' : ''} title="Light theme" onClick={() => setTheme('light')}><Sun size={15}/></button>
        <button className={theme === 'dark' ? 'active' : ''} title="Dark theme" onClick={() => setTheme('dark')}><Moon size={15}/></button>
      </div>
      <button onClick={logout}>Logout</button>
    </div> : <><NavLink to="/login">Login</NavLink><NavLink className="pill" to="/register">Register</NavLink></>}
  </nav></header>;
}
