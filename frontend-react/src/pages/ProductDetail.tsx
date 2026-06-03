import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProductById, normalizeImageUrl } from '../services/ProductService'
import type { ProductDTO } from '../services/ProductService'
import { useCart } from '../context/CartContext'

function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<ProductDTO | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { addToCart } = useCart()

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    fetchProductById(id)
      .then((data) => setProduct(data))
      .catch((err: any) => {
        setError(err?.response?.data?.message || err.message || 'No se encontró el producto.')
      })
      .finally(() => setLoading(false))
  }, [id])

  return (
    <section className="page-shell">
      {loading && <p className="page-copy">Cargando producto...</p>}
      {error && <p className="page-copy" style={{ color: '#b91c1c' }}>{error}</p>}
      {!loading && !error && product && (
        <div className="grid-2" style={{ gap: '32px' }}>
          <div className="page-card">
            <img
              src={normalizeImageUrl(product.imageUrl) || 'https://via.placeholder.com/600x420'}
              alt={product.name}
              style={{ width: '100%', borderRadius: '20px' }}
            />
          </div>
          <div className="page-card">
            <h1 className="page-title">{product.name}</h1>
            <p className="page-copy">{product.description}</p>
            <p className="product-price" style={{ fontSize: '1.3rem', marginTop: '18px' }}>
              ${product.price?.toFixed(2)}
            </p>
            <div className="product-actions" style={{ marginTop: '24px' }}>
              <button className="btn-primary" type="button" onClick={() => product && addToCart(product)}>
                Añadir al carrito
              </button>
              <Link to="/products" className="btn-outlined">
                Volver a productos
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductDetail
