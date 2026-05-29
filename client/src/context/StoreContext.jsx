import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/api.js';

const StoreContext = createContext();
export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));
  const [cart, setCart] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState('');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');

  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };
  const login = async (email, password) => { const { data } = await api.post('/auth/login', { email, password }); setUser(data); localStorage.setItem('user', JSON.stringify(data)); notify('Login successful'); };
  const register = async (name, email, password) => { const { data } = await api.post('/auth/register', { name, email, password }); setUser(data); localStorage.setItem('user', JSON.stringify(data)); notify('Account created'); };
  const logout = () => { setUser(null); setCart(null); setWishlist([]); localStorage.removeItem('user'); notify('Logged out'); };
  const loadCart = async () => { if (!user || user.role !== 'user') return; const { data } = await api.get('/cart'); setCart(data); };
  const addToCart = async (productId, qty = 1) => {
    if (!user) return notify('Please login first');
    try { const { data } = await api.post('/cart', { productId, qty }); setCart(data); notify('Added to cart'); }
    catch (err) { notify(err.response?.data?.message || 'Could not add item'); }
  };
  const updateQty = async (productId, qty) => {
    try { const { data } = await api.put(`/cart/${productId}`, { qty }); setCart(data); }
    catch (err) { notify(err.response?.data?.message || 'Could not update cart'); }
  };
  const removeCart = async (productId) => { const { data } = await api.delete(`/cart/${productId}`); setCart(data); notify('Removed from cart'); };
  const clearCart = async () => { await api.delete('/cart'); setCart({ items: [] }); };
  const loadWishlist = async () => { if (!user || user.role !== 'user') return; const { data } = await api.get('/wishlist'); setWishlist(data.products || []); };
  const toggleWishlist = async (productId) => {
    if (!user) return notify('Please login first');
    if (user.role !== 'user') return notify('Only normal users can shop');
    const { data } = await api.post('/wishlist/toggle', { productId }); setWishlist(data.products || []); notify('Wishlist updated');
  };

  useEffect(() => { loadCart(); loadWishlist(); }, [user?._id]);
  useEffect(() => {
    const applyTheme = () => {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const resolvedTheme = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;
      document.documentElement.dataset.theme = resolvedTheme;
      document.documentElement.dataset.themeChoice = theme;
    };
    applyTheme();
    localStorage.setItem('theme', theme);
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', applyTheme);
    return () => media.removeEventListener('change', applyTheme);
  }, [theme]);
  const cartCount = useMemo(() => cart?.items?.reduce((s, i) => s + i.qty, 0) || 0, [cart]);
  const value = { user, cart, wishlist, toast, cartCount, theme, setTheme, notify, login, register, logout, loadCart, addToCart, updateQty, removeCart, clearCart, loadWishlist, toggleWishlist };
  return <StoreContext.Provider value={value}>{children}{toast && <div className="toast">{toast}</div>}</StoreContext.Provider>;
};
