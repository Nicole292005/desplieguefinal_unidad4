const mongoose = require('mongoose');

const esquemaCategoria = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la categoría es obligatorio'],
        trim: true
    }
});

module.exports = mongoose.model('Categoria', esquemaCategoria);
