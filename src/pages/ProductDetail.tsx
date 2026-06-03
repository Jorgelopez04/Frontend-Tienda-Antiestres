import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductService } from '../services/ProductService';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    ProductService.getById(id)
      .then(setProduct)
      .catch(() => setError('Producto no encontrado'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No existe el producto.</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <img src={product.imageUrl} alt={product.name} style={{ maxWidth: 200 }} />
      <div>
        <Link to={`/products/${product.id}/edit`}>Editar</Link>
      </div>
    </div>
  );
};

export default ProductDetail;
