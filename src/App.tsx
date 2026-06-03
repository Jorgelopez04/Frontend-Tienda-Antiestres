import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AdminRoute } from './routes/AdminRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';

const App: React.FC = () => (
  <MainLayout>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/create" element={<CreateProduct />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />
        <Route element={<AdminRoute />}>
          {/* Rutas solo para admin aquí */}
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </MainLayout>
);

export default App;
