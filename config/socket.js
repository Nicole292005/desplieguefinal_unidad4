const configurarSocket = (servidor) => {
    const { Server } = require('socket.io');
    const io = new Server(servidor);

    io.on('connection', (socket) => {
        console.log(`Usuario conectado: ${socket.id}`);

        socket.on('mensajeChat', (datos) => {
            console.log(`Mensaje recibido de ${socket.id}:`, datos);
            socket.broadcast.emit('mensajeChat', datos);
        });

        socket.on('disconnect', () => {
            console.log(`Usuario desconectado: ${socket.id}`);
        });
    });

    return io;
};

module.exports = configurarSocket;
