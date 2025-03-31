const presupuestosService = require('../services/presupuestos.service');

// Obtener lista de presupuestos
const getPresupuestos = async (req, res) => {
  try {
    const presupuestos = await presupuestosService.getAllPresupuestos();
    res.json(presupuestos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un presupuesto por ID con sus detalles
const getPresupuesto = async (req, res) => {
  try {
    const { id } = req.params;
    const presupuesto = await presupuestosService.getPresupuestoById(id);

    if (!presupuesto) {
      return res.status(404).json({ error: 'Presupuesto no encontrado' });
    }

    res.json(presupuesto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPresupuestos, getPresupuesto };
