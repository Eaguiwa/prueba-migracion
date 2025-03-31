const db = require('../config/database');

const getAllProductos = async () => {
  try {
    return await db('productos').select('*');
  } catch (error) {
    throw new Error('Error al obtener los productos');
  }
};

module.exports = { getAllProductos };
