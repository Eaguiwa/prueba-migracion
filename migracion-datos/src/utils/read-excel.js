const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const DATA_FOLDER = path.join(__dirname, '../../data'); 

// Función para leer los archivos XLSX
const readExcelFile = (fileName) => {
  try {
    const filePath = path.join(DATA_FOLDER, fileName);
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; 
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); 

    return data;
  } catch (error) {
    console.error(`Error al leer ${fileName}:`, error.message);
    return null;
  }
};

// Leer los archivos XLSX
const pacientes = readExcelFile('pacientes.xlsx');
const presupuestos = readExcelFile('presupuestos.xlsx');
const detallePresupuesto = readExcelFile('presupuestos_detalle.xlsx');

module.exports = { pacientes, presupuestos, detallePresupuesto };
