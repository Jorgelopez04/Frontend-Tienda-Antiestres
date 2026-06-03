import { useEffect, useMemo, useState } from 'react'
import { useCart } from '../context/CartContext'
import { fetchProducts, type ProductDTO } from '../services/ProductService'

type OfferCombo = {
  id: string
  title: string
  description: string
  items: ProductDTO[]
  discountedPrice: number
}

function Offers() {
  const [products, setProducts] = useState<ProductDTO[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { addComboToCart } = useCart()

  useEffect(() => {
    const loadOffers = async () => {
      setLoading(true)
      setError(null)
      try {
        const allProducts = await fetchProducts()
        setProducts(allProducts.slice(0, 8))
      } catch (err: any) {
        setError(err?.response?.data?.message || err.message || 'No se pudieron cargar las ofertas.')
      } finally {
        setLoading(false)
      }
    }

    loadOffers()
  }, [])

  const combos = useMemo<OfferCombo[]>(() => {
    if (products.length >= 3) {
      const [first, second, third, fourth] = products
      const comboA = [first, second]
      const comboB = [second, third, fourth].filter(Boolean)
      const comboC = [first, third]

      const totalA = comboA.reduce((sum, item) => sum + (item.price ?? 0), 0)
      const totalB = comboB.reduce((sum, item) => sum + (item.price ?? 0), 0)
      const totalC = comboC.reduce((sum, item) => sum + (item.price ?? 0), 0)

      return [
        {
          id: 'combo-relajacion',
          title: 'Combo Relajación',
          description: `Incluye ${comboA.map((item) => item.name).join(' + ')} con 12% de descuento.`,
          items: comboA,
          discountedPrice: Math.round(totalA * 0.88),
        },
        {
          id: 'combo-bienestar',
          title: 'Pack Bienestar',
          description: `Incluye ${comboB.map((item) => item.name).join(' + ')} con 18% de descuento.`,
          items: comboB,
          discountedPrice: Math.round(totalB * 0.82),
        },
        {
          id: 'combo-tranquilidad',
          title: 'Combo Tranquilidad',
          description: `Incluye ${comboC.map((item) => item.name).join(' + ')} con 10% de descuento.`,
          items: comboC,
          discountedPrice: Math.round(totalC * 0.9),
        },
      ]
    }

    return []
  }, [products])

  const handleAddCombo = (combo: OfferCombo) => {
    addComboToCart(combo)
  }

  return (
    <section className="page-shell">
      <div className="section-header">
        <div>
          <h1 className="page-title">Ofertas</h1>
          <p className="page-copy">
            Estos son nuestros combos especiales: varios productos juntos por un mejor precio.
          </p>
        </div>
      </div>

      {loading && <p className="page-copy">Cargando ofertas...</p>}
      {error && <p className="page-copy" style={{ color: '#b91c1c' }}>{error}</p>}

      {!loading && !error && (
        <>
          <div className="card-list" style={{ marginTop: '24px' }}>
            {combos.length > 0 ? (
              combos.map((combo) => (
                <article key={combo.id} className="card-item">
                  <h3>{combo.title}</h3>
                  <p>{combo.description}</p>
                  <p className="product-price">${combo.discountedPrice.toFixed(2)}</p>
                  <button className="btn-primary" type="button" onClick={() => handleAddCombo(combo)}>
                    Añadir combo al carrito
                  </button>
                </article>
              ))
            ) : (
              <article className="card-item">
                <h3>No hay combos disponibles por el momento</h3>
                <p>Aún puedes revisar nuestros productos disponibles en la tienda.</p>
              </article>
            )}
          </div>

          <div className="page-card" style={{ marginTop: '24px' }}>
            <h2>Promoción activa</h2>
            <p className="page-copy">
              Estos combos incluyen productos seleccionados juntos para que puedas ahorrar tiempo y dinero.
              Agrégalos al carrito con un solo clic.
            </p>
          </div>
        </>
      )}
    </section>
  )
}

export default Offers
