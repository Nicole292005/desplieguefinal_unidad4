const mongoose = require('mongoose');

const esquemaProducto = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        minlength: [3, 'El nombre debe tener mínimo 3 caracteres']
    },
    precio: {
        type: Number,
        required: [true, 'El precio del producto es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción del producto es obligatoria'],
        minlength: [10, 'La descripción debe tener mínimo 10 caracteres']
    },
    imagen: {
        type: String,
        required: false
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: false
    },
    stock: {
        type: Number,
        default: 0,
        min: [0, 'El stock no puede ser negativo']
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Producto', esquemaProducto);
