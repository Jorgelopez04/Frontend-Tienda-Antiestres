import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="page-footer">
      <div className="footer-grid">
        <div className="footer-column">
          <h3>Tienda</h3>
          <ul>
            <li>
              <Link to="/products">Productos</Link>
            </li>
            <li>
              <Link to="/ofertas">Ofertas</Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Soporte</h3>
          <ul>
            <li>
              <Link to="/terminos">Términos y condiciones</Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Contáctanos</h3>
          <ul>
            <li>Teléfono: (604) 580 6935 ext 002</li>
            <li>Correo: calmaplus@gmail.com</li>
            <li>
              <a href="https://maps.app.goo.gl/5FmbYn1FWK1jNLmaA" target="_blank" rel="noreferrer">
                Dirección: Av32 #57-26
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Redes sociales</h3>
          <ul>
            <li>
              <a href="https://wa.me/573054070814" target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/j.lopez0456/" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com" target="_blank" rel="noreferrer">
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="footer-copy">© 2026 CalmaPlus - Todos los derechos reservados.</p>
    </footer>
  )
}

export default Footer
