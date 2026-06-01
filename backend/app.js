require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const { engine } = require('express-handlebars');
const sesion = require('express-session');
const ruta = require('path');

const conectarBaseDatos = require('./config/baseDatos');
const configurarSocket = require('./config/socket');
const { verificarSesion, pasarUsuarioAVistas } = require('./config/middlewares');

const rutasAutenticacion = require('./routes/rutasAutenticacion');
const rutasProductos = require('./routes/rutasProductos');
const rutasChat = require('./routes/rutasChat');
const rutasApiProductos = require('./routes/rutasApiProductos');
const rutasApiCategorias = require('./routes/rutasApiCategorias');

const aplicacion = express();
const servidor = http.createServer(aplicacion);

// Conexión a la base de datos
conectarBaseDatos();

// Configuración de Handlebars
aplicacion.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'principal',
    layoutsDir: ruta.join(__dirname, 'views', 'layouts'),
    partialsDir: ruta.join(__dirname, 'views', 'partials')
}));
aplicacion.set('view engine', 'hbs');
aplicacion.set('views', ruta.join(__dirname, 'views'));

// CORS para el frontend Vue
aplicacion.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Middlewares de parseo y archivos estáticos
aplicacion.use(express.urlencoded({ extended: true }));
aplicacion.use(express.json());
aplicacion.use(express.static(ruta.join(__dirname, 'public')));
aplicacion.use('/uploads', express.static(ruta.join(__dirname, 'uploads')));

// Configuración de sesión
aplicacion.use(sesion({
    secret: process.env.SECRETO_SESION || 'clave_secreta_por_defecto_123',
    resave: false,
    saveUninitialized: false
}));

// Pasar datos del usuario a todas las vistas
aplicacion.use(pasarUsuarioAVistas);

// Rutas API REST (publicas, sin sesion)
aplicacion.use('/api/products', rutasApiProductos);
aplicacion.use('/api/categories', rutasApiCategorias);

// Rutas web con Handlebars
aplicacion.use('/', rutasAutenticacion);
aplicacion.use('/productos', verificarSesion, rutasProductos);
aplicacion.use('/chat', verificarSesion, rutasChat);

// Configuración de Socket.io
configurarSocket(servidor);

// Inicio del servidor
const PUERTO = process.env.PUERTO || 3000;
servidor.listen(PUERTO, () => {
    console.log(`Servidor iniciado en http://localhost:${PUERTO}`);
});
