const fs = require('fs');
const path = require('path');

const entity = process.argv[2]; // Captura el nombre de la entidad (ej: Store)

if (!entity) {
    console.log("❌ Por favor, indica el nombre de la entidad. Ej: node generate.js Store");
    process.exit(1);
}

const nameLower = entity.toLowerCase();
const nameUpper = entity.charAt(0).toUpperCase() + entity.slice(1);

// Definición de plantillas
const templates = {
    service: `const ${nameUpper} = require('../models/${nameUpper}');

const getAll = async () => await ${nameUpper}.find();
const create = async (data) => await ${nameUpper}.create(data);

module.exports = { getAll, create };`,

    controller: `const ${nameLower}Service = require('../services/${nameLower}Service');
const response = require('../utils/responseHandler');

const getAll = async (req, res) => {
  try {
    const data = await ${nameLower}Service.getAll();
    response.success(res, data);
  } catch (err) {
    response.error(res, err.message);
  }
};

const create = async (req, res) => {
  try {
    const data = await ${nameLower}Service.create(req.body);
    response.success(res, data, '${nameUpper} creado con éxito', 201);
  } catch (err) {
    response.error(res, err.message);
  }
};

module.exports = { getAll, create };`,

    routes: `const express = require('express');
const router = express.Router();
const ${nameLower}Controller = require('../controllers/${nameLower}Controller');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', ${nameLower}Controller.getAll);
router.post('/', protect, ${nameLower}Controller.create);

module.exports = router;`
};

// Función para crear archivos
const createFile = (dir, fileName, content) => {
    const fullPath = path.join(__dirname, 'src', dir, fileName);
    if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, content);
        console.log(`✅ Creado: ${fullPath}`);
    } else {
        console.log(`⚠️ El archivo ya existe: ${fullPath}`);
    }
};

// Ejecución
console.log(`🚀 Generando archivos para: ${nameUpper}...`);
createFile('services', `${nameLower}Service.js`, templates.service);
createFile('controllers', `${nameLower}Controller.js`, templates.controller);
createFile('routes', `${nameLower}Routes.js`, templates.routes);