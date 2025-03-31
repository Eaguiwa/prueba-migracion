const pacientesService = require('../services/pacientes.service');

// Obtener lista de pacientes
const getPacientes = async (req, res) => {
  try {
    const pacientes = await pacientesService.getAllPacientes();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un paciente por ID
const getPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const paciente = await pacientesService.getPacienteById(id);

    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    res.json(paciente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPacientes, getPaciente };
