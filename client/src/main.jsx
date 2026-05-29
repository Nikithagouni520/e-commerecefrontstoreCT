import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import { StoreProvider, useStore } from './context/StoreContext.jsx';
import './styles/style.css';

const Protected = ({ children, admin = false, userOnly = false }) => {
  const { user } = useStore();
  if (!user) return <Navigate to="/login" />;
  if (admin && user.role !== 'admin') return <Navigate to="/" />;
  if (userOnly && user.role !== 'user') return <Navigate to="/admin" />;
  return children;
};

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <Routes>
          <Route path="/*" element={<App Protected={Protected} />} />
        </Routes>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
