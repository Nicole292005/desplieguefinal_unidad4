const multer = require('multer');
const ruta = require('path');

const almacenamiento = multer.diskStorage({
    destination: (req, archivo, siguiente) => {
        siguiente(null, 'uploads/');
    },
    filename: (req, archivo, siguiente) => {
        const nombreArchivo = Date.now() + archivo.originalname;
        siguiente(null, nombreArchivo);
    }
});

const filtroArchivos = (req, archivo, siguiente) => {
    const tiposPermitidos = ['image/jpeg', 'image/png'];
    if (tiposPermitidos.includes(archivo.mimetype)) {
        siguiente(null, true);
    } else {
        siguiente(new Error('Solo se permiten archivos de tipo JPEG o PNG'), false);
    }
};

const cargarArchivo = multer({
    storage: almacenamiento,
    fileFilter: filtroArchivos,
    limits: { fileSize: 5 * 1024 * 1024 }
});

module.exports = cargarArchivo;
