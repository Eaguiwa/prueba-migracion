const productosService = require('../services/productos.service');

// Obtener lista de productos
const getProductos = async (req, res) => {
  try {
    const productos = await productosService.getAllProductos();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProductos };
