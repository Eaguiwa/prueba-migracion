const db = require('../config/database');

// Obtener todos los tratamientos
const getAllTratamientos = async () => {
  try {
    return await db('tratamientos').select('*');
  } catch (error) {
    throw new Error('Error al obtener los tratamientos');
  }
};

module.exports = { getAllTratamientos };
