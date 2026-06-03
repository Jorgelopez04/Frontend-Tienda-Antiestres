import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductService } from '../services/ProductService';

const EditProduct: React.FC = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    ProductService.getById(id)
      .then((p) => {
        setName(p.name);
        setDescription(p.description);
        setPrice(p.price.toString());
        setImageUrl(p.imageUrl);
      })
      .catch(() => setError('Producto no encontrado'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await ProductService.update(id!, { name, description, price: parseFloat(price), imageUrl });
      navigate(`/products/${id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al actualizar producto');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Editar Producto</h2>
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
      <button type="submit" disabled={loading}>{loading ? 'Cargando...' : 'Actualizar'}</button>
    </form>
  );
};

export default EditProduct;
