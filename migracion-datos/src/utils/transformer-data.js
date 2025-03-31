const knex = require('../config/database');

const transformerDataPaciente = (paciente) => {
  return {
    nombre: paciente.Nombre || 'Desconocido',
    apellido: paciente.Apellidos || 'Desconocido',
    email: paciente.email && paciente.email.trim() ? paciente.email : null,
    telefono: paciente.telefono && paciente.telefono.trim()
      ? paciente.telefono
      : paciente.movil && paciente.movil.trim()
      ? paciente.movil
      : '999999999',
    fecha_nacimiento: paciente.fechadenacimiento === '0000-00-00' ? null : paciente.fechadenacimiento,
    id_sexo: null, 
    direccion: null,
    ciudad: null,
    id_clinica: Math.random() < 0.5 ? 37 : 63,
    codigo_postal: '0',
    nif_cif: '0',
    referido: paciente.compania || 'Particular',
    id_super_clinica: Math.random() < 0.5 ? 2 : 47, 
    id_estado_registro: 1,
    id_cliente: null,
    lopd_aceptado: paciente.firmaLOPD === 'S' ? '0' : '1',
    Importado: null,
    kommo_lead_id: null,
    old_id: paciente.id,
    fecha_alta: paciente.fechadealta || knex.raw('CURRENT_DATE'),
    fecha_creacion: knex.raw('CURRENT_DATE'),
    fecha_modificacion: null,
    usuario_creacion: 'importacion Critenias',
    id_usuario_creacion: null
  };
};

const transformerDataPresupuesto = (presupuesto, idPaciente) => {
  return {
    id_paciente: idPaciente,
    id_super_clinica: Math.random() < 0.5 ? 2 : 47,
    id_clinica: Math.random() < 0.5 ? 37 : 63,
    fecha: knex.raw('CURRENT_TIMESTAMP'),
    url_presupuesto: '',
    monto_total:  parseFloat(presupuesto.total.replace(/\./g, '').replace(',', '.')),
    monto_pagado: '300.00',
    saldo_pendiente: '0.00',
    id_estado: '1',
    id_tipo_pago: '1',
    old_id: presupuesto.dataId,
    id_estado_registro: '1',
    numero_historia:  null,
    id_contacto: null,
    fecha_creacion: knex.raw('CURRENT_TIMESTAMP'),
    fecha_modificacion: knex.raw('CURRENT_TIMESTAMP'),
    usuario_creacion: null,
    id_usuario_creacion: null
  };
};

const transformerDataDetallePresupuesto = (detalle, idPresupuesto, idProducto) => {
  return {
    id_presupuesto: idPresupuesto,
    id_tratamiento: null,
    item: detalle.conceptoId || '0',
    descripcion: detalle.conceptoNombre || '',
    cantidad: parseInt(detalle.conceptoCantidad) || 1,
    precio: parseFloat(detalle.conceptoPrecio) || 0.00,
    descuento: parseFloat(detalle.conceptoDescuento) || 0.00,
    id_tipo_iva: null,
    total_item: (parseFloat(detalle.conceptoPrecio) || 0.00) * (parseInt(detalle.conceptoCantidad) || 1),
    id_producto: idProducto,
    old_id: detalle.id_presupuesto || null,
  };
};

const transformerDataProducto = (detalle) => {
  return {
    id_producto: detalle.conceptoId,
    nombre_producto: detalle.conceptoNombre || 'Producto Desconocido',
    descripcion: 'Antiarrugas',
    stock: 10,
    precio: parseFloat(detalle.conceptoPrecio) || 0.0000,
    id_clinica: Math.random() < 0.5 ? 37 : 63,
    id_super_clinica: Math.random() < 0.5 ? 2 : 47,
    id_tipo_iva: 1,
    id_estado_registro: 1,
    codigo: null,
    codigo_barras: null,
    proveedor: null,
    precio_costo: null,
    descuento: parseFloat(detalle.conceptoDescuento) || 0.00,
    fecha_creacion: knex.raw('CURRENT_TIMESTAMP'),
    fecha_modificacion: null,
    usuario_creacion: null,
    id_usuario_creacion: null
  };
};

const transformerDataTratamiento = (detalle) => {
  return {
    nombre_tratamiento: detalle.conceptoNombre || 'Tratamiento Desconocido',
    descripcion: 'VALORACIÓN PERSONALIZADA DE NUESTRAS PROFESIONALES PARA EL DIAGNOSTICO FACIAL Y CORPORAL INDICANDO LOS MEJORES TRATAMIENTOS SEGÚN LAS PREOCUPACIONES DEL PACIENTE, ASESORANDO DE LAS FORMAS DE PAGO.',
    duracion: "30",
    precio: parseFloat(detalle.conceptoPrecio) || 0.0000,
    id_clinica: Math.random() < 0.5 ? 37 : 63,
    id_super_clinica: Math.random() < 0.5 ? 2 : 47,
    id_tipo_iva: 1,
    id_estado_registro: 1
  };
};




module.exports = { transformerDataPaciente, transformerDataPresupuesto, transformerDataDetallePresupuesto, transformerDataProducto,transformerDataTratamiento };
