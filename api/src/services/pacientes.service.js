const db = require('../config/database');

// Obtener todos los pacientes
const getAllPacientes = async () => {
  try {
    return await db('pacientes').select('*');
  } catch (error) {
    throw new Error('Error al obtener pacientes');
  }
};

// Obtener un paciente por ID
const getPacienteById = async (id) => {
  try {
    const paciente = await db('pacientes').where({ id_paciente: id }).first();
    return paciente || null;
  } catch (error) {
    throw new Error('Error al obtener el paciente');
  }
};

module.exports = { getAllPacientes, getPacienteById };
