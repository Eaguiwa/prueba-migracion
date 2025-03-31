const express = require('express');
const router = express.Router();

const pacientesRoutes = require('./pacientes.routes');
const presupuestosRoutes = require('./presupuestos.routes');
const tratamientosRoutes = require('./tratamientos.routes');
const productosRoutes = require('./productos.routes');

router.use('/pacientes', pacientesRoutes);
router.use('/presupuestos', presupuestosRoutes);
router.use('/tratamientos', tratamientosRoutes);
router.use('/productos', productosRoutes);

module.exports = router;
