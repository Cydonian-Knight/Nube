// ─────────────────────────────────────────────────────────────
// controllers/users.controller.js  —  Capa de Controller (MVC)
//
// El Controller es el intermediario entre la ruta y el modelo.
// Su trabajo es:
//   1. Leer los datos de la petición (req.params, req.body)
//   2. Pedirle al Model que haga algo con la base de datos
//   3. Enviar la respuesta HTTP al cliente (res.json / res.status)
//
// NO contiene lógica de base de datos — eso lo hace el Model.
// ─────────────────────────────────────────────────────────────

const UserModel = require('../models/user.model');

// GET /api/users
const getAll = async (req, res) => {
  try {
    const users = await UserModel.findAll(); // Pide todos los usuarios al Model
    res.json(users);                          // Responde con JSON (esto es la "View" en APIs)
  } catch (error) {
    // Si algo falla, enviamos código 500 (error interno del servidor)
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};

// GET /api/users/:id
const getById = async (req, res) => {
  try {
    const { id } = req.params;              // Extraemos el :id de la URL
    const user = await UserModel.findById(id);

    if (!user) {
      // 404 = recurso no encontrado
      return res.status(404).json({ message: `Usuario ${id} no encontrado` });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar usuario', error: error.message });
  }
};

// POST /api/users
const create = async (req, res) => {
  try {
    const { name, email } = req.body;       // Leemos el cuerpo de la petición

    if (!name || !email) {
      // 400 = Bad Request (el cliente mandó datos incompletos)
      return res.status(400).json({ message: 'name y email son requeridos' });
    }

    const newUser = await UserModel.create({ name, email });
    // 201 = Created (recurso creado exitosamente)
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuario', error: error.message });
  }
};

// PUT /api/users/:id
const update = async (req, res) => {
  try {
    const { id }   = req.params;
    const data     = req.body;
    const updated  = await UserModel.update(id, data);

    if (!updated) {
      return res.status(404).json({ message: `Usuario ${id} no encontrado` });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
  }
};

// DELETE /api/users/:id
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await UserModel.delete(id);
    // 204 = No Content (operación exitosa, sin datos que devolver)
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
  }
};

// Exportamos todas las funciones para que el Router las use
module.exports = { getAll, getById, create, update, remove };
