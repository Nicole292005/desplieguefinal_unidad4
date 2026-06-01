const express = require('express');
const enrutador = express.Router();
const controladorAutenticacion = require('../controllers/controladorAutenticacion');

enrutador.get('/', controladorAutenticacion.mostrarLogin);
enrutador.post('/login', controladorAutenticacion.iniciarSesion);
enrutador.get('/logout', controladorAutenticacion.cerrarSesion);
enrutador.get('/registro', controladorAutenticacion.mostrarRegistro);
enrutador.post('/registro', controladorAutenticacion.registrar);

module.exports = enrutador;
