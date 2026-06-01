const express = require('express');
const { body } = require('express-validator');
const enrutador = express.Router();
const controladorProductos = require('../controllers/controladorProductos');
const cargarArchivo = require('../config/multer');

const validacionesProducto = [
    body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener mínimo 3 caracteres'),
    body('precio').notEmpty().withMessage('El precio es obligatorio')
        .isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
    body('descripcion').trim().notEmpty().withMessage('La descripción es obligatoria')
        .isLength({ min: 10 }).withMessage('La descripción debe tener mínimo 10 caracteres')
];

/* Envuelve Multer para capturar sus errores y pasarlos al controlador sin cortar la cadena */
const manejarSubidaImagen = (req, res, siguiente) => {
    cargarArchivo.single('imagen')(req, res, (error) => {
        if (error) {
            req.errorMulter = error.code === 'LIMIT_FILE_SIZE'
                ? 'La imagen no puede superar 5MB'
                : 'Solo se permiten archivos JPG o PNG';
        }
        siguiente();
    });
};

enrutador.get('/', controladorProductos.mostrarProductos);
enrutador.get('/crear', controladorProductos.mostrarFormularioCrear);
enrutador.post('/crear', manejarSubidaImagen, validacionesProducto, controladorProductos.crearProducto);
enrutador.get('/editar/:id', controladorProductos.mostrarFormularioEditar);
enrutador.post('/editar/:id', manejarSubidaImagen, validacionesProducto, controladorProductos.actualizarProducto);
enrutador.get('/eliminar/:id', controladorProductos.eliminarProducto);

module.exports = enrutador;
