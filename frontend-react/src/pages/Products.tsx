import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchProducts, deleteProduct, normalizeImageUrl } from '../services/ProductService'
import type { ProductDTO } from '../services/ProductService'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function Products() {
  const [products, setProducts] = useState<ProductDTO[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { addToCart } = useCart()
  const { user, token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchProducts()
        setProducts(data)
      } catch (err: any) {
        setError(err?.response?.data?.message || err.message || 'No se pudieron cargar los productos.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        [product.name, product.description]
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [products, search]
  )

  return (
    <section className="page-shell">
      <div className="section-header">
        <div>
          <h1 className="page-title">Productos</h1>
          <p className="page-copy">Explora todos los productos antiestrés disponibles en CalmaPlus.</p>
        </div>
        <Link to="/carrito" className="btn-outlined">
          Ir al carrito
        </Link>
      </div>

      <div className="form-field" style={{ marginTop: '20px' }}>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por nombre o descripción..."
        />
      </div>

      {loading && <p className="page-copy">Cargando productos...</p>}
      {error && <p className="page-copy" style={{ color: '#b91c1c' }}>{error}</p>}

      <div className="product-grid" style={{ marginTop: '24px' }}>
        {filteredProducts.map((product) => (
          <article key={product.id} className="product-card">
            <img src={normalizeImageUrl(product.imageUrl) || 'https://via.placeholder.com/400x300'} alt={product.name} />
            <div className="product-card-content">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="product-price">${product.price?.toFixed(2)}</p>
              <div className="product-actions">
                <Link className="btn-outlined" to={`/products/${product.id}`}>
                  Ver detalle
                </Link>
                <button className="btn-primary" type="button" onClick={() => addToCart(product)}>
                  Añadir al carrito
                </button>
                {user?.role === 'admin' && (
                  <>
                    <button
                      className="btn-outlined"
                      type="button"
                      onClick={() => navigate('/admin', { state: { editId: product.id } })}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-secondary"
                      type="button"
                      onClick={async () => {
                        if (!token) return alert('Acceso denegado')
                        if (!confirm('Eliminar producto?')) return
                        try {
                          await deleteProduct(product.id, token)
                          setProducts((cur) => cur.filter((p) => p.id !== product.id))
                        } catch (err: any) {
                          alert(err?.response?.data?.message || 'Error al eliminar')
                        }
                      }}
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredProducts.length === 0 && !loading && !error && (
        <div className="page-card" style={{ marginTop: '24px' }}>
          <h2>No encontramos productos</h2>
          <p>Intenta con otro término de búsqueda o vuelve más tarde.</p>
        </div>
      )}
    </section>
  )
}

export default Products
