const verificarSesion = (req, res, siguiente) => {
    if (!req.session.usuario) {
        console.log('Acceso denegado: no hay sesión activa, redirigiendo al login');
        return res.redirect('/');
    }
    siguiente();
};

const pasarUsuarioAVistas = (req, res, siguiente) => {
    res.locals.usuario = req.session.usuario || null;
    siguiente();
};

module.exports = { verificarSesion, pasarUsuarioAVistas };
