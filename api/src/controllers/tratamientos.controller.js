const tratamientosService = require('../services/tratamientos.service');

// Obtener lista de tratamientos
const getTratamientos = async (req, res) => {
  try {
    const tratamientos = await tratamientosService.getAllTratamientos();
    res.json(tratamientos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTratamientos };
