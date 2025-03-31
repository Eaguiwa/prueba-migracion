const knex = require('./config/database');
const { 
  verifyConnection, 
  insertPacientes, 
  insertPresupuestos, 
  insertDetallePresupuesto, 
  insertTratamientos, 
  insertProductos 
} = require('./services/insert-data');

const runMigrations = async () => {
  try {
    const conexionExitosa = await verifyConnection();
    if (!conexionExitosa) {
      console.error('Error de conexión.');
      knex.destroy();
      return;
    }
    console.log('------------------------------------------');
    console.log('Iniciando Migración ...');

    try {
      await insertPacientes();
    } catch (error) {
      console.error('Error al insertar pacientes:', error.message);
    }

    try {
      await insertPresupuestos();
    } catch (error) {
      console.error('Error al insertar presupuestos:', error.message);
    }

    try {
      await insertProductos();
    } catch (error) {
      console.error('Error al insertar productos:', error.message);
    }

    try {
      await insertTratamientos();
    } catch (error) {
      console.error('Error al insertar tratamientos:', error.message);
    }

    try {
      await insertDetallePresupuesto();
    } catch (error) {
      console.error('Error al insertar detalles de presupuesto:', error.message);
    }

    console.log('Migración completada.');
    console.log('------------------------------------------');

  } catch (error) {
    console.error('Error inesperado en la migración:', error.message);
  } finally {
    knex.destroy();
  }
};

runMigrations();
