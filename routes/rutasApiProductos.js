const express = require('express');
const { body } = require('express-validator');
const enrutador = express.Router();
const ctrl = require('../controllers/controladorApiProductos');

const validaciones = [
    body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener minimo 3 caracteres'),
    body('precio').notEmpty().withMessage('El precio es obligatorio')
        .isFloat({ min: 0.01 }).withMessage('El precio debe ser mayor a 0'),
    body('descripcion').trim().notEmpty().withMessage('La descripcion es obligatoria')
        .isLength({ min: 10 }).withMessage('La descripcion debe tener minimo 10 caracteres'),
    body('stock').optional().isInt({ min: 0 }).withMessage('El stock debe ser un numero entero mayor o igual a 0'),
    body('categoryId').optional().isMongoId().withMessage('La categoria no es valida')
];

enrutador.get('/', ctrl.listarProductos);
enrutador.get('/:id', ctrl.obtenerProducto);
enrutador.post('/', validaciones, ctrl.crearProducto);
enrutador.put('/:id', validaciones, ctrl.actualizarProducto);
enrutador.delete('/:id', ctrl.eliminarProducto);

module.exports = enrutador;
