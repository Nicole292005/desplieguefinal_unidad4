const { validationResult } = require('express-validator');
const Producto = require('../models/Producto');
const fs = require('fs');
const path = require('path');

const eliminarImagenDisco = (nombreArchivo) => {
    if (!nombreArchivo) return;
    const ruta = path.join(__dirname, '../uploads', nombreArchivo);
    fs.unlink(ruta, (err) => {
        if (err && err.code !== 'ENOENT') console.error('Error al eliminar imagen:', err.message);
    });
};

const mostrarProductos = async (req, res) => {
    try {
        /* .lean() devuelve objetos planos; _id se convierte a string para que Handlebars lo renderice */
        const productos = await Producto.find().lean();
        const productosPlanos = productos.map(p => ({ ...p, _id: p._id.toString() }));
        res.render('productos/lista', { productos: productosPlanos });
    } catch (error) {
        console.error('Error al obtener los productos:', error.message);
        res.status(500).send('Error interno del servidor');
    }
};

const mostrarFormularioCrear = (req, res) => {
    try {
        res.render('productos/crear');
    } catch (error) {
        console.error('Error al mostrar el formulario de creación:', error.message);
        res.status(500).send('Error interno del servidor');
    }
};

const crearProducto = async (req, res) => {
    try {
        const listaErrores = validationResult(req).array();
        if (req.errorMulter) listaErrores.push({ msg: req.errorMulter });

        if (listaErrores.length > 0) {
            return res.render('productos/crear', {
                errores: listaErrores,
                nombre: req.body.nombre,
                precio: req.body.precio,
                descripcion: req.body.descripcion
            });
        }

        const { nombre, descripcion, precio, cantidad } = req.body;
        const imagen = req.file ? req.file.filename : null;

        const nuevoProducto = new Producto({ nombre, descripcion, precio, cantidad, imagen });
        await nuevoProducto.save();

        console.log('Producto creado exitosamente:', nuevoProducto.nombre);
        res.redirect('/productos');
    } catch (error) {
        console.error('Error al crear el producto:', error.message);
        res.status(500).send('Error interno del servidor');
    }
};

const mostrarFormularioEditar = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id).lean();
        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }
        producto._id = producto._id.toString();
        res.render('productos/editar', { producto });
    } catch (error) {
        console.error('Error al obtener el producto para editar:', error.message);
        res.status(500).send('Error interno del servidor');
    }
};

const actualizarProducto = async (req, res) => {
    try {
        const listaErrores = validationResult(req).array();
        if (req.errorMulter) listaErrores.push({ msg: req.errorMulter });

        if (listaErrores.length > 0) {
            const productoActual = await Producto.findById(req.params.id);
            const producto = {
                _id: req.params.id,
                nombre: req.body.nombre,
                precio: req.body.precio,
                descripcion: req.body.descripcion,
                cantidad: req.body.cantidad,
                imagen: productoActual ? productoActual.imagen : null
            };
            return res.render('productos/editar', {
                errores: listaErrores,
                producto
            });
        }

        const { nombre, descripcion, precio, cantidad } = req.body;
        const datosActualizados = { nombre, descripcion, precio, cantidad };

        if (req.file) {
            const productoAnterior = await Producto.findById(req.params.id);
            if (productoAnterior) eliminarImagenDisco(productoAnterior.imagen);
            datosActualizados.imagen = req.file.filename;
        }

        await Producto.findByIdAndUpdate(req.params.id, datosActualizados);
        console.log('Producto actualizado exitosamente, id:', req.params.id);
        res.redirect('/productos');
    } catch (error) {
        console.error('Error al actualizar el producto:', error.message);
        res.status(500).send('Error interno del servidor');
    }
};

const eliminarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);
        if (producto) eliminarImagenDisco(producto.imagen);
        console.log('Producto eliminado exitosamente, id:', req.params.id);
        res.redirect('/productos');
    } catch (error) {
        console.error('Error al eliminar el producto:', error.message);
        res.status(500).send('Error interno del servidor');
    }
};

module.exports = {
    mostrarProductos,
    mostrarFormularioCrear,
    crearProducto,
    mostrarFormularioEditar,
    actualizarProducto,
    eliminarProducto
};
