# Tienda Antiestrés (CalmaPlus): Frontend

Tienda en línea de productos antiestrés. Los usuarios pueden registrarse, iniciar sesión, explorar el catálogo y las ofertas, ver el detalle de cada producto y armar un carrito de compras. Los administradores tienen un panel para gestionar productos.

La API está en [Backend-ProductosAntiestres](https://github.com/Jorgelopez04/Backend-ProductosAntiestres).

<!-- Agrega aquí una captura de la página de inicio y otra del catálogo o del carrito -->

## Tecnologías

- **React** y **TypeScript**
- **Vite**
- **React Router** para la navegación
- **Axios** para consumir la API
- Manejo de estado con **Context API** (sesión y carrito)

## Funcionalidades

- Registro e inicio de sesión, con persistencia de la sesión
- Catálogo de productos (`/products`) y detalle (`/products/:id`)
- Ofertas, carrito de compras y confirmación de compra
- Perfil de usuario (`/perfil`), solo para usuarios con sesión
- Panel de administración (`/admin`), solo para administradores
- Páginas informativas: nosotros, contacto y términos

## Estructura del repositorio

La aplicación está en la carpeta `frontend-react/`.

La primera versión de la tienda, hecha solo con HTML y CSS, está en el repositorio [Tienda-antiestres](https://github.com/Jorgelopez04/Tienda-antiestres).

## Cómo ejecutarlo

### Requisitos

- Node.js 20 o superior
- La API de la tienda en ejecución ([Backend-ProductosAntiestres](https://github.com/Jorgelopez04/Backend-ProductosAntiestres))

### Configuración

Por defecto la aplicación usa `http://localhost:3000/api/v1`. Para cambiarlo, crea `frontend-react/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

### Desarrollo

```bash
cd frontend-react
npm install
npm run dev
```

Abre la dirección que muestra la consola (normalmente `http://localhost:5173`).

### Producción

```bash
npm run build
```

## Autor

[Jorge Steven López Arenas](https://github.com/Jorgelopez04)
