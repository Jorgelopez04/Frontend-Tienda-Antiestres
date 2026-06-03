import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import Offers from './pages/Offers'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Confirmation from './pages/Confirmation'
import EmptyCart from './pages/EmptyCart'
import Terms from './pages/Terms'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductDetail from './pages/ProductDetail'
import AdminPanel from './pages/AdminPanel'
import AdminRoute from './components/AdminRoute'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        <Navbar />
        <main className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/ofertas" element={<Offers />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/confirmacion" element={<Confirmation />} />
            <Route path="/carrito/vacio" element={<EmptyCart />} />
            <Route path="/terminos" element={<Terms />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
