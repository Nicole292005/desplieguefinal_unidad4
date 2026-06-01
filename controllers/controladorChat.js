const mostrarChat = (req, res) => {
    try {
        if (!req.session.usuario) {
            console.log('Acceso al chat denegado: no hay sesión activa');
            return res.redirect('/');
        }

        const nombreUsuario = req.session.usuario.nombre;
        console.log('Usuario accediendo al chat:', nombreUsuario);
        res.render('chat/index', { nombreUsuario });
    } catch (error) {
        console.error('Error al mostrar el chat:', error.message);
        res.status(500).send('Error interno del servidor');
    }
};

module.exports = {
    mostrarChat
};
