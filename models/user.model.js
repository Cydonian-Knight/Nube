// ─────────────────────────────────────────────────────────────
// models/user.model.js  —  Capa de Model (MVC)
//
// El Model es el único que habla con la base de datos.
// Aquí van las consultas SQL o las operaciones con Mongoose.
// El Controller nunca toca la DB directamente; siempre pasa
// por el Model.
//
// En este ejemplo usamos un array en memoria para no necesitar
// una DB instalada en el primer día. En producción este archivo
// usaría Mongoose (MongoDB) o Sequelize / pg (PostgreSQL).
// ─────────────────────────────────────────────────────────────

// Simulación de base de datos en memoria
let users = [
  { id: 1, name: 'Ana García',   email: 'ana@ejemplo.com'  },
  { id: 2, name: 'Luis Pérez',   email: 'luis@ejemplo.com' },
];
let nextId = 3; // Contador simple para generar IDs únicos

// Devuelve todos los usuarios
// En producción: SELECT * FROM users  /  User.find()
const findAll = async () => {
  return users;
};

// Devuelve un usuario por ID, o null si no existe
// En producción: SELECT * FROM users WHERE id = $1  /  User.findById(id)
const findById = async (id) => {
  return users.find(u => u.id === Number(id)) || null;
};

// Crea un usuario nuevo y lo agrega a la colección
// En producción: INSERT INTO users (name, email) VALUES ($1, $2)  /  User.create(data)
const create = async ({ name, email }) => {
  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  return newUser;
};

// Actualiza los datos de un usuario existente
// En producción: UPDATE users SET ... WHERE id = $1  /  User.findByIdAndUpdate(id, data)
const update = async (id, data) => {
  const index = users.findIndex(u => u.id === Number(id));
  if (index === -1) return null;

  // Object.assign mezcla los campos nuevos sobre el usuario existente
  users[index] = { ...users[index], ...data };
  return users[index];
};

// Elimina un usuario por ID
// En producción: DELETE FROM users WHERE id = $1  /  User.findByIdAndDelete(id)
const deleteUser = async (id) => {
  users = users.filter(u => u.id !== Number(id));
};

module.exports = { findAll, findById, create, update, delete: deleteUser };
