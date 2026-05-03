// ─────────────────────────────────────────────────────────────
// app.js  —  Punto de entrada del servidor
//
// Este archivo arranca Express, conecta los middlewares globales
// y registra las rutas. Es lo primero que Node.js ejecuta.
// ─────────────────────────────────────────────────────────────

const express = require('express'); // Framework para crear el servidor HTTP
const path = require('path');    // Módulo nativo de Node para rutas de carpetas

const app = express();             // Crea la instancia principal de la app
const PORT = process.env.PORT || 3000; // Puerto: usa variable de entorno o 3000 por defecto

// ── Middlewares globales ──────────────────────────────────────
// Los middlewares son funciones que se ejecutan ANTES de llegar
// a las rutas. Express las aplica a cada petición entrante.

app.use(express.json());            // Permite leer JSON en req.body
app.use(express.urlencoded({ extended: true })); // Permite leer formularios HTML

// Sirve los archivos de /public como estáticos.
// Al abrir http://localhost:3000 Express devuelve public/index.html
app.use(express.static(path.join(__dirname, 'public')));

// ── Rutas de la API ───────────────────────────────────────────
// Importamos el router de usuarios y lo montamos en /api/users.
// Cualquier petición que empiece con /api/users irá a ese archivo.

const userRoutes = require('./routes/users.routes');
app.use('/api/users', userRoutes);

// ── Arranque del servidor ─────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Cliente HTML en    http://localhost:${PORT}/index.html`);
});