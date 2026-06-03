import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  normalizeImageUrl,
  updateProduct,
} from '../services/ProductService'
import { fetchUsers, updateUserRole } from '../services/UserService'
import { fetchSupportMessages, markSupportMessageRead, deleteSupportMessage, type SupportMessageDTO } from '../services/SupportService'
import type { ProductDTO } from '../services/ProductService'
import type { UserDTO } from '../services/UserService'

function AdminPanel() {
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState<ProductDTO[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<ProductDTO | null>(null)
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  })
  const [users, setUsers] = useState<UserDTO[]>([])
  const [usersLoading, setUsersLoading] = useState(false)
  const [usersError, setUsersError] = useState<string | null>(null)
  const [roleUpdatingId, setRoleUpdatingId] = useState<string | null>(null)
  const [supportMessages, setSupportMessages] = useState<SupportMessageDTO[]>([])
  const [messagesLoading, setMessagesLoading] = useState(false)
  const [messagesError, setMessagesError] = useState<string | null>(null)
  const [productsPage, setProductsPage] = useState(1)
  const [usersPage, setUsersPage] = useState(1)
  const [messagesPage, setMessagesPage] = useState(1)
  const itemsPerPage = 5

  const location = useLocation()

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login')
      return
    }

    const load = async () => {
      setLoading(true)
      setError(null)
      setUsersLoading(true)
        setMessagesLoading(true)
      setUsersError(null)
        setMessagesError(null)
      try {
        const [productData, userData] = await Promise.all([
          fetchProducts(),
          token ? fetchUsers(token) : Promise.resolve([]),
        ])
        setProducts(productData)
        setProductsPage(1)
        setUsers(userData)
        setUsersPage(1)
          if (token) {
            const supportData = await fetchSupportMessages(token)
            setSupportMessages(supportData)
            setMessagesPage(1)
          }
        // if navigated with an editId, preselect the product
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const editId = location.state?.editId
        if (editId) {
          const toEdit = productData.find((p) => p.id === editId)
          if (toEdit) {
            setSelectedProduct(toEdit)
            setFormValues({
              name: toEdit.name,
              description: toEdit.description ?? '',
              price: toEdit.price?.toString() ?? '',
              imageUrl: toEdit.imageUrl ?? '',
            })
          }
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || err.message || 'No se pudieron cargar los productos.')
        if (err?.response?.data?.message?.includes('Forbidden') || err?.response?.data?.message?.includes('Unauthorized')) {
          setUsersError('No tienes permiso para ver los usuarios.')
            setMessagesError('No tienes permiso para ver los mensajes de soporte.')
        } else {
          setUsersError(err?.response?.data?.message || err.message || 'No se pudieron cargar los usuarios.')
            setMessagesError(err?.response?.data?.message || err.message || 'No se pudieron cargar los mensajes de soporte.')
        }
      } finally {
        setLoading(false)
        setUsersLoading(false)
          setMessagesLoading(false)
      }
    }

    load()
  }, [navigate, user])

  const resetForm = () => {
    setSelectedProduct(null)
    setFormValues({ name: '', description: '', price: '', imageUrl: '' })
  }

  const selectProduct = (product: ProductDTO) => {
    setSelectedProduct(product)
    setFormValues({
      name: product.name,
      description: product.description ?? '',
      price: product.price?.toString() ?? '',
      imageUrl: product.imageUrl ?? '',
    })
  }

  const handleChange = (field: keyof typeof formValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!token) return

    const productPayload = {
      name: formValues.name,
      description: formValues.description,
      price: Number(formValues.price),
      imageUrl: formValues.imageUrl,
    }

    try {
      setLoading(true)
      if (selectedProduct) {
        const updated = await updateProduct(selectedProduct.id, productPayload, token)
        setProducts((current) => current.map((item) => (item.id === updated.id ? updated : item)))
      } else {
        const created = await createProduct(productPayload, token)
        setProducts((current) => [created, ...current])
      }
      resetForm()
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'No se pudo guardar el producto.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!token) return
    try {
      await deleteProduct(id, token)
      setProducts((current) => current.filter((product) => product.id !== id))
      if (selectedProduct?.id === id) resetForm()
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'No se pudo eliminar el producto.')
    }
  }

  const handleRoleChange = async (userId: string, newRole: string) => {
    if (!token) return
    setRoleUpdatingId(userId)
    try {
      const updated = await updateUserRole(userId, newRole, token)
      setUsers((current) => current.map((item) => (item.id === updated.id ? updated : item)))
    } catch (err: any) {
      setUsersError(err?.response?.data?.message || err.message || 'No se pudo actualizar el rol del usuario.')
    } finally {
      setRoleUpdatingId(null)
    }
  }

  const handleMarkRead = async (id: string) => {
    if (!token) return
    try {
      const updated = await markSupportMessageRead(id, token)
      setSupportMessages((current) => current.map((item) => (item.id === updated.id ? updated : item)))
    } catch (err: any) {
      setMessagesError(err?.response?.data?.message || err.message || 'No se pudo marcar el mensaje como leído.')
    }
  }

  const totalProducts = useMemo(() => products.length, [products])

  const totalProductPages = useMemo(() => Math.max(1, Math.ceil(products.length / itemsPerPage)), [products.length])
  const totalUserPages = useMemo(() => Math.max(1, Math.ceil(users.length / itemsPerPage)), [users.length])
  const totalMessagePages = useMemo(() => Math.max(1, Math.ceil(supportMessages.length / itemsPerPage)), [supportMessages.length])

  const paginatedProducts = useMemo(() => {
    const start = (productsPage - 1) * itemsPerPage
    return products.slice(start, start + itemsPerPage)
  }, [products, productsPage])

  const paginatedUsers = useMemo(() => {
    const start = (usersPage - 1) * itemsPerPage
    return users.slice(start, start + itemsPerPage)
  }, [users, usersPage])

  const paginatedSupportMessages = useMemo(() => {
    const start = (messagesPage - 1) * itemsPerPage
    return supportMessages.slice(start, start + itemsPerPage)
  }, [supportMessages, messagesPage])

  useEffect(() => {
    if (productsPage > totalProductPages) {
      setProductsPage(totalProductPages)
    }
  }, [productsPage, totalProductPages])

  useEffect(() => {
    if (usersPage > totalUserPages) {
      setUsersPage(totalUserPages)
    }
  }, [usersPage, totalUserPages])

  useEffect(() => {
    if (messagesPage > totalMessagePages) {
      setMessagesPage(totalMessagePages)
    }
  }, [messagesPage, totalMessagePages])

  return (
    <section className="page-shell">
      <div className="section-header">
        <div>
          <h1 className="page-title">Panel administrativo</h1>
          <p className="page-copy">
            Administra productos: crea, edita o elimina artículos disponibles en la tienda.
          </p>
          <p className="page-copy" style={{ marginTop: '12px' }}>
            Productos disponibles: {totalProducts}
          </p>
        </div>
      </div>

      <div className="grid-2" style={{ gap: '24px', marginTop: '24px' }}>
        <div className="page-card">
          <h2>{selectedProduct ? 'Editar producto' : 'Crear producto'}</h2>
          <form className="form-card" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                value={formValues.name}
                onChange={(event) => handleChange('name', event.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                value={formValues.description}
                onChange={(event) => handleChange('description', event.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="price">Precio</label>
              <input
                id="price"
                type="number"
                value={formValues.price}
                onChange={(event) => handleChange('price', event.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="imageUrl">URL de imagen</label>
              <input
                id="imageUrl"
                value={formValues.imageUrl}
                onChange={(event) => handleChange('imageUrl', event.target.value)}
              />
            </div>
            {error && <p className="page-copy" style={{ color: '#b91c1c' }}>{error}</p>}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button className="btn-primary" type="submit" disabled={loading}>
                {selectedProduct ? 'Actualizar producto' : 'Crear producto'}
              </button>
              {selectedProduct && (
                <button className="btn-outlined" type="button" onClick={resetForm}>
                  Cancelar edición
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="page-card">
          <h2>Productos</h2>
          {loading && <p className="page-copy">Cargando productos...</p>}
          {!loading && products.length === 0 && <p className="page-copy">No hay productos registrados.</p>}
          {!loading && products.length > 0 && (
            <>
              <p className="page-copy" style={{ marginTop: '8px' }}>
                Mostrando {paginatedProducts.length} de {products.length} productos.
              </p>
              <div className="card-list" style={{ marginTop: '18px' }}>
                {paginatedProducts.map((product) => (
                  <div key={product.id} className="card-item">
                    <h3>{product.name}</h3>
                    {product.imageUrl && (
                      <img
                        src={normalizeImageUrl(product.imageUrl)}
                        alt={product.name}
                        style={{
                          width: '100%',
                          maxHeight: '180px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          marginBottom: '12px',
                        }}
                      />
                    )}
                    <p>{product.description}</p>
                    <p className="product-price">${product.price?.toFixed(2)}</p>
                    <div className="product-actions">
                      <button type="button" className="btn-outlined" onClick={() => selectProduct(product)}>
                        Editar
                      </button>
                      <button type="button" className="btn-secondary" onClick={() => handleDelete(product.id)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '18px' }}>
                <button
                  type="button"
                  className="btn-outlined"
                  onClick={() => setProductsPage((current) => Math.max(1, current - 1))}
                  disabled={productsPage === 1}
                >
                  Anterior
                </button>
                <span className="page-copy">Página {productsPage} de {totalProductPages}</span>
                <button
                  type="button"
                  className="btn-outlined"
                  onClick={() => setProductsPage((current) => Math.min(totalProductPages, current + 1))}
                  disabled={productsPage === totalProductPages}
                >
                  Siguiente
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="page-card" style={{ marginTop: '24px' }}>
        <h2>Gestión de usuarios</h2>
        {usersLoading && <p className="page-copy">Cargando usuarios...</p>}
        {usersError && <p className="page-copy" style={{ color: '#b91c1c' }}>{usersError}</p>}
        {!usersLoading && users.length === 0 && <p className="page-copy">No hay usuarios registrados.</p>}
        {!usersLoading && users.length > 0 && (
          <>
            <p className="page-copy" style={{ marginTop: '8px' }}>
              Mostrando {paginatedUsers.length} de {users.length} usuarios.
            </p>
            <div className="card-list" style={{ marginTop: '18px' }}>
              {paginatedUsers.map((userItem) => {
                const isCurrentUser = user?.id === userItem.id
                return (
                  <div key={userItem.id} className="card-item">
                    <h3>{userItem.name}</h3>
                    <p>{userItem.email}</p>
                    <div className="form-field">
                      <label htmlFor={`role-${userItem.id}`}>Rol</label>
                      <select
                        id={`role-${userItem.id}`}
                        value={userItem.role}
                        disabled={isCurrentUser || roleUpdatingId === userItem.id}
                        onChange={(event) => handleRoleChange(userItem.id, event.target.value)}
                      >
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                      </select>
                    </div>
                    {isCurrentUser && <p className="page-copy">No puedes cambiar tu propio rol desde aquí.</p>}
                    <p className="product-price">Rol actual: {userItem.role}</p>
                  </div>
                )
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '18px' }}>
              <button
                type="button"
                className="btn-outlined"
                onClick={() => setUsersPage((current) => Math.max(1, current - 1))}
                disabled={usersPage === 1}
              >
                Anterior
              </button>
              <span className="page-copy">Página {usersPage} de {totalUserPages}</span>
              <button
                type="button"
                className="btn-outlined"
                onClick={() => setUsersPage((current) => Math.min(totalUserPages, current + 1))}
                disabled={usersPage === totalUserPages}
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>

      <div className="page-card" style={{ marginTop: '24px' }}>
        <h2>Mensajes de soporte</h2>
        {messagesLoading && <p className="page-copy">Cargando mensajes de soporte...</p>}
        {messagesError && <p className="page-copy" style={{ color: '#b91c1c' }}>{messagesError}</p>}
        {!messagesLoading && supportMessages.length === 0 && (
          <p className="page-copy">Aún no hay mensajes de soporte.</p>
        )}
        {!messagesLoading && supportMessages.length > 0 && (
          <>
            <p className="page-copy" style={{ marginTop: '8px' }}>
              Mostrando {paginatedSupportMessages.length} de {supportMessages.length} mensajes.
            </p>
            <div className="card-list" style={{ marginTop: '18px' }}>
              {paginatedSupportMessages.map((message) => (
                <div key={message.id} className="card-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                    <div>
                      <h3>{message.name || 'Sin nombre'}</h3>
                      <p>{message.email || 'Sin correo'}</p>
                    </div>
                    <p style={{ fontWeight: 700, color: message.isRead ? '#6b7280' : '#111827' }}>
                      {message.isRead ? 'Leído' : 'Nuevo'}
                    </p>
                  </div>
                  <p className="page-copy" style={{ marginTop: '12px' }}>{message.message}</p>
                  <p className="product-price">Recibido: {new Date(message.createdAt).toLocaleString()}</p>
                  {!message.isRead && (
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => handleMarkRead(message.id)}
                    >
                      Marcar como leído
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={async () => {
                      if (!token) return
                      if (!confirm('¿Eliminar mensaje de soporte?')) return
                      try {
                        await deleteSupportMessage(message.id, token)
                        setSupportMessages((current) => current.filter((item) => item.id !== message.id))
                      } catch (err: any) {
                        setMessagesError(err?.response?.data?.message || err.message || 'No se pudo eliminar el mensaje.')
                      }
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '18px' }}>
              <button
                type="button"
                className="btn-outlined"
                onClick={() => setMessagesPage((current) => Math.max(1, current - 1))}
                disabled={messagesPage === 1}
              >
                Anterior
              </button>
              <span className="page-copy">Página {messagesPage} de {totalMessagePages}</span>
              <button
                type="button"
                className="btn-outlined"
                onClick={() => setMessagesPage((current) => Math.min(totalMessagePages, current + 1))}
                disabled={messagesPage === totalMessagePages}
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default AdminPanel
