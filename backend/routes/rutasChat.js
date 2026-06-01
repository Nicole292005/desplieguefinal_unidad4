const express = require('express');
const enrutador = express.Router();
const controladorChat = require('../controllers/controladorChat');

enrutador.get('/', controladorChat.mostrarChat);

module.exports = enrutador;
