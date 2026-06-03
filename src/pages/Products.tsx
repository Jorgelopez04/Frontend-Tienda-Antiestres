import React, { useEffect, useState } from 'react';
import { ProductService } from '../services/ProductService';
import { Link } from 'react-router-dom';

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    ProductService.getAll(page, 10)
      .then(res => {
        setProducts(res.data);
        setMeta(res.meta);
      })
      .catch(() => setError('Error al cargar productos'))
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!products.length) return <div>No hay productos.</div>;

  return (
    <div>
      <h2>Productos</h2>
      <Link to="/products/create">Crear producto</Link>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <Link to={`/products/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
      {meta && (
        <div>
          Página {meta.page} de {meta.totalPages}
          <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Anterior</button>
          <button disabled={page >= meta.totalPages} onClick={() => setPage(page + 1)}>Siguiente</button>
        </div>
      )}
    </div>
  );
};

export default Products;
