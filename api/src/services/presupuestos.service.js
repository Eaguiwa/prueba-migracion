const db = require('../config/database');

// Obtener todos los presupuestos
const getAllPresupuestos = async () => {
  try {
    return await db('presupuestos').select('*');
  } catch (error) {
    throw new Error('Error al obtener los presupuestos');
  }
};

// Obtener un presupuesto por ID incluyendo sus detalles
const getPresupuestoById = async (id) => {
  try {
    const presupuesto = await db('presupuestos').where({ id_presupuesto: id }).first();
    
    if (!presupuesto) return null;

    const detalles = await db('detalle_presupuesto').where({ id_presupuesto: id });

    return { ...presupuesto, detalles };
  } catch (error) {
    throw new Error('Error al obtener el presupuesto');
  }
};

module.exports = { getAllPresupuestos, getPresupuestoById };
