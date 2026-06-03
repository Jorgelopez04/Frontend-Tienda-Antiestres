import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductService } from '../services/ProductService';

const CreateProduct: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await ProductService.create({ name, description, price: parseFloat(price), imageUrl });
      navigate('/products');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Crear Producto</h2>
      <label>Nombre
        <input value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <label>Descripción
        <input value={description} onChange={e => setDescription(e.target.value)} required />
      </label>
      <label>Precio
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
      </label>
      <label>Imagen URL
        <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} required />
      </label>
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={loading}>{loading ? 'Cargando...' : 'Crear'}</button>
    </form>
  );
};

export default CreateProduct;
