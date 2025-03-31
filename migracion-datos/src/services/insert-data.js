const knex = require('../config/database');
const { pacientes, presupuestos, detallePresupuesto } = require('../utils/read-excel');
const { transformerDataPaciente, transformerDataPresupuesto,transformerDataTratamiento, transformerDataDetallePresupuesto,transformerDataProducto } = require('../utils/transformer-data');

// Insertar pacientes
const insertPacientes = async () => {
    try {
      if (!pacientes || pacientes.length === 0) return console.log('No hay pacientes para insertar.');
      await knex.transaction(async (trx) => {
        for (const paciente of pacientes) {
          const pacienteTransformado = transformerDataPaciente(paciente);
          await trx('pacientes').insert(pacienteTransformado);
        }
      });
  
      console.log('Pacientes insertados correctamente.');
    } catch (error) {
      console.error('Error al insertar pacientes:', error.message);
    }
  };

// Insertar presupuestos
const insertPresupuestos = async () => {
  try {
    if (!presupuestos || presupuestos.length === 0) return console.log('No hay presupuestos para insertar.');

    await knex.transaction(async (trx) => {
      for (const presupuesto of presupuestos) {
        const paciente = await trx('pacientes').where('old_id', presupuesto.dataIdPaciente).first();

        if (!paciente) {
          console.warn(`No se encontró paciente con old_id: ${presupuesto.dataIdPaciente}, presupuesto omitido.`);
          continue;
        }

        const nuevoPresupuesto = transformerDataPresupuesto(presupuesto, paciente.id_paciente);
        await trx('presupuestos').insert(nuevoPresupuesto);
      }
    });

    console.log('Presupuestos insertados correctamente.');
  } catch (error) {
    console.error('Error al insertar presupuestos:', error.message);
  }
};

// Insertar productos
const insertProductos = async () => {
  try {
    if (!detallePresupuesto || detallePresupuesto.length === 0) return console.log('No hay productos para insertar.');

    await knex.transaction(async (trx) => {
      for (const producto of detallePresupuesto) {
        const nuevoProducto = transformerDataProducto(producto);
        const existeProducto = await trx('productos').where('nombre_producto', nuevoProducto.nombre_producto).first();
        if (!existeProducto) {
          await trx('productos').insert(nuevoProducto);
        }
      }
    });

    console.log('Productos insertados correctamente.');
  } catch (error) {
    console.error('Error al insertar productos:', error.message);
  }
};

// Insertar tratamientos
const insertTratamientos = async () => {
  try {
    if (!detallePresupuesto || detallePresupuesto.length === 0) return console.log('No hay tratamientos para insertar.');

    await knex.transaction(async (trx) => {
      for (const tratamiento of detallePresupuesto) {
        const nuevoTratamiento = transformerDataTratamiento(tratamiento);
        const existeTratamiento = await trx('tratamientos').where('nombre_tratamiento', nuevoTratamiento.nombre_tratamiento).first();
        if (!existeTratamiento) {
          await trx('tratamientos').insert(nuevoTratamiento);
        }
      }
    });

    console.log('Tratamientos insertados correctamente.');
  } catch (error) {
    console.error('Error al insertar tratamientos:', error.message);
  }
};

// Insertar detalles
const insertDetallePresupuesto = async () => {
  try {
    if (!detallePresupuesto || detallePresupuesto.length === 0) return console.log('No hay detalles de presupuesto para insertar.');

    await knex.transaction(async (trx) => {
      for (const detalle of detallePresupuesto) {
        const presupuesto = await trx('presupuestos').where('old_id', detalle.id_presupuesto).first();
        if (!presupuesto) {
          console.warn(`No se encontró presupuesto con old_id: ${detalle.id_presupuesto}, detalle omitido.`);
          continue;
        }

        const producto = await trx('productos').where('id_producto', detalle.conceptoId).first();
        if (!producto) {
          continue;
        }

        const nuevoDetalle = transformerDataDetallePresupuesto(detalle, presupuesto.id_presupuesto, producto.id_producto);
        await trx('detalle_presupuesto').insert(nuevoDetalle);
      }
    });

    console.log('Detalles de presupuesto insertados correctamente.');
  } catch (error) {
    console.error('Error al insertar detalles de presupuesto:', error.message);
  }
};


// Función para verificar la conexión a la base de datos
const verifyConnection = async () => {
  try {
    await knex.raw('SELECT 1+1 AS resultado');
    console.log('------------------------------------------'); 
    console.log('Conexión a la base de datos exitosa.');
    return true;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    return false;
  }
};

module.exports = {
  verifyConnection,
  insertPacientes,
  insertPresupuestos,
  insertProductos,
  insertTratamientos,
  insertDetallePresupuesto
};

