// ─────────────────────────────────────────────────────────────
// routes/users.routes.js  —  Capa de Routing (MVC)
//
// Define qué función del Controller se ejecuta según el
// método HTTP (GET, POST, PUT, DELETE) y la URL recibida.
// El Router NO tiene lógica de negocio; solo conecta URLs
// con sus controladores.
// ─────────────────────────────────────────────────────────────

const express    = require('express');
const router     = express.Router(); // Mini-app de rutas independiente
const controller = require('../controllers/users.controller');

// GET  /api/users          → devuelve todos los usuarios
router.get('/', controller.getAll);

// GET  /api/users/:id      → devuelve un usuario por su ID
// :id es un parámetro dinámico; se lee en req.params.id
router.get('/:id', controller.getById);

// POST /api/users          → crea un usuario nuevo
// El body con los datos llega en req.body
router.post('/', controller.create);

// PUT  /api/users/:id      → actualiza un usuario existente
router.put('/:id', controller.update);

// DELETE /api/users/:id    → elimina un usuario
router.delete('/:id', controller.remove);

module.exports = router;
