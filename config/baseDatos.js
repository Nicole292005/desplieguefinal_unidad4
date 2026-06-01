require('dotenv').config();
const mongoose = require('mongoose');

const conectarBaseDatos = async () => {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mecapp';
        await mongoose.connect(uri);
        console.log(`Conexión exitosa a la base de datos MongoDB en ${uri}`);
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error.message);
        process.exit(1);
    }
};

mongoose.connection.on('disconnected', () => {
    console.log('Se perdió la conexión con la base de datos');
});

module.exports = conectarBaseDatos;
