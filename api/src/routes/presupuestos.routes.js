const express = require('express');
const router = express.Router();
const presupuestosController = require('../controllers/presupuestos.controller');

router.get('/', presupuestosController.getPresupuestos);
router.get('/:id', presupuestosController.getPresupuesto);

module.exports = router;
