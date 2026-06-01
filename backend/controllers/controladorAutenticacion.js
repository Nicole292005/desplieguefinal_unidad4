const { body, validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');

const validacionesLogin = [
    body('correo').notEmpty().withMessage('El correo es obligatorio').isEmail().withMessage('Debe ingresar un correo válido'),
    body('contrasena').notEmpty().withMessage('La contraseña es obligatoria')
];

const validacionesRegistro = [
    body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
    body('correo').isEmail().withMessage('Debe ingresar un correo válido'),
    body('contrasena').isLength({ min: 6 }).withMessage('La contraseña debe tener mínimo 6 caracteres')
];

const mostrarLogin = (req, res) => {
    try {
        res.render('autenticacion/login');
    } catch (error) {
        console.error('Error al mostrar el login:', error.message);
        res.status(500).send('Error interno del servidor');
    }
};

const mostrarRegistro = (req, res) => {
    try {
        res.render('autenticacion/registro');
    } catch (error) {
        console.error('Error al mostrar el registro:', error.message);
        res.status(500).send('Error interno del servidor');
    }
};

const iniciarSesion = async (req, res) => {
    try {
        await Promise.all(validacionesLogin.map(v => v.run(req)));
        const erroresValidacion = validationResult(req);
        if (!erroresValidacion.isEmpty()) {
            return res.render('autenticacion/login', {
                errores: erroresValidacion.array(),
                correo: req.body.correo
            });
        }

        const { correo, contrasena } = req.body;

        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.render('autenticacion/login', {
                errores: [{ msg: 'Correo o contraseña incorrectos' }],
                correo
            });
        }

        /* Usa el método del modelo para comparar contraseñas */
        const contrasenaValida = await usuario.compararContrasena(contrasena);
        if (!contrasenaValida) {
            return res.render('autenticacion/login', {
                errores: [{ msg: 'Correo o contraseña incorrectos' }],
                correo
            });
        }

        req.session.usuario = {
            id: usuario._id,
            nombre: usuario.nombre,
            correo: usuario.correo
        };

        console.log('Sesión iniciada para el usuario:', usuario.nombre);
        res.redirect('/productos');
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        res.status(500).send('Error interno del servidor');
    }
};

const cerrarSesion = (req, res) => {
    try {
        req.session.destroy((error) => {
            if (error) {
                console.error('Error al cerrar la sesión:', error.message);
                return res.status(500).send('Error interno del servidor');
            }
            console.log('Sesión cerrada exitosamente');
            res.redirect('/');
        });
    } catch (error) {
        console.error('Error al cerrar la sesión:', error.message);
        res.status(500).send('Error interno del servidor');
    }
};

const registrar = async (req, res) => {
    try {
        await Promise.all(validacionesRegistro.map(v => v.run(req)));
        const erroresValidacion = validationResult(req);
        if (!erroresValidacion.isEmpty()) {
            return res.render('autenticacion/registro', {
                errores: erroresValidacion.array(),
                nombre: req.body.nombre,
                correo: req.body.correo
            });
        }

        const { nombre, correo, contrasena } = req.body;

        /* El modelo encripta la contraseña automáticamente en el pre save */
        const nuevoUsuario = new Usuario({ nombre, correo, contrasena });
        await nuevoUsuario.save();

        console.log('Usuario registrado exitosamente:', nuevoUsuario.nombre);
        res.redirect('/');
    } catch (error) {
        console.error('Error al registrar el usuario:', error.message);
        res.status(500).send('Error interno del servidor');
    }
};

module.exports = {
    mostrarLogin,
    mostrarRegistro,
    iniciarSesion,
    cerrarSesion,
    registrar
};
