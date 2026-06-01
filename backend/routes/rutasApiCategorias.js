const express = require('express');
const enrutador = express.Router();
const ctrl = require('../controllers/controladorApiCategorias');

enrutador.get('/', ctrl.listarCategorias);

module.exports = enrutador;
