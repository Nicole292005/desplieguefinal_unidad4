const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const esquemaUsuario = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del usuario es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo del usuario es obligatorio'],
        unique: true
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña del usuario es obligatoria']
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

/* Encripta la contraseña antes de guardar, solo si fue modificada */
esquemaUsuario.pre('save', async function (siguiente) {
    if (!this.isModified('contrasena')) return siguiente();
    this.contrasena = await bcrypt.hash(this.contrasena, 10);
    siguiente();
});

/* Compara una contraseña en texto plano con la contraseña encriptada del usuario */
esquemaUsuario.methods.compararContrasena = function (contrasena) {
    return bcrypt.compare(contrasena, this.contrasena);
};

module.exports = mongoose.model('Usuario', esquemaUsuario);
