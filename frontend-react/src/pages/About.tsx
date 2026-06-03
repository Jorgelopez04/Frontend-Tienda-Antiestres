function About() {
  return (
    <section className="page-shell">
      <div className="section-header">
        <div>
          <h1 className="page-title">Sobre nosotros</h1>
          <p className="page-copy">
            CalmaPlus es una tienda dedicada a ofrecer productos antiestrés que te apoyan en el cuidado de tu salud mental y física.
          </p>
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: '24px' }}>
        <div className="page-card">
          <h2>Nuestra misión</h2>
          <p>
            Brindar herramientas accesibles para reducir el estrés, aumentar la relajación y mejorar tu bienestar diario.
          </p>
        </div>
        <div className="page-card">
          <h2>Nuestros valores</h2>
          <p>
            Calidad, cercanía y compromiso con tu tranquilidad. Cada producto se selecciona pensando en experiencias serenas y seguras.
          </p>
        </div>
      </div>

      <div className="section-card" style={{ marginTop: '24px' }}>
        <h2>¿Por qué elegirnos?</h2>
        <ul style={{ margin: '16px 0 0', paddingLeft: '20px', color: '#475569' }}>
          <li>Envíos rápidos y asesoría clara.</li>
          <li>Productos pensados para aliviar la tensión física y emocional.</li>
          <li>Soporte cercano para tu satisfacción.</li>
        </ul>
      </div>
    </section>
  )
}

export default About
