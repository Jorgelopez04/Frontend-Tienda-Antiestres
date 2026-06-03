import { useState } from 'react'
import { sendSupportMessage } from '../services/SupportService'

function Contact() {
  return (
    <section className="page-shell">
      <div className="section-header">
        <div>
          <h1 className="page-title">Contacto</h1>
          <p className="page-copy">
            Escríbenos si tienes preguntas, necesitas ayuda con tu pedido o quieres conocer más de nuestros productos.
          </p>
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: '24px' }}>
        <div className="page-card">
          <h2>Información de contacto</h2>
          <p>Teléfono: (604) 580 6935 ext 002</p>
          <p>Correo: calmaplus@gmail.com</p>
          <p>Dirección: Av32 #57-26</p>
          <p>
            WhatsApp: <a href="https://wa.me/573054070814">+57 305 4070814</a>
          </p>
          <p>
            Síguenos en Instagram: <a href="https://www.instagram.com/j.lopez0456/">@j.lopez0456</a>
          </p>
        </div>

        <div className="page-card">
          <h2>¿Necesitas ayuda?</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError(null)
    setSuccess(null)
    if (!message.trim()) {
      setError('Por favor escribe un mensaje antes de enviar')
      return
    }

    setLoading(true)
    try {
      await sendSupportMessage(name.trim(), email.trim(), message.trim())
      setSuccess('Mensaje enviado. Nuestro equipo admin podrá verlo pronto.')
      setName('')
      setEmail('')
      setMessage('')
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'No se pudo enviar el mensaje')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="form-card" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
      <div className="form-field">
        <label htmlFor="contact-name">Nombre</label>
        <input id="contact-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" />
      </div>
      <div className="form-field">
        <label htmlFor="contact-email">Correo electrónico</label>
        <input id="contact-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Tu correo" />
      </div>
      <div className="form-field">
        <label htmlFor="contact-message">Mensaje</label>
        <textarea id="contact-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Escribe tu consulta aquí" />
      </div>
      {error && <p className="page-copy" style={{ color: '#b91c1c' }}>{error}</p>}
      {success && <p className="page-copy" style={{ color: '#16a34a' }}>{success}</p>}
      <button className="btn-primary" type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar mensaje'}
      </button>
    </form>
  )
}

export default Contact
