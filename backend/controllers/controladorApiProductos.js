const { validationResult } = require('express-validator');
const Producto = require('../models/Producto');

const listarProductos = async (req, res) => {
    try {
        const productos = await Producto.find().populate('categoryId', 'nombre').lean();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

const obtenerProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id).populate('categoryId', 'nombre').lean();
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

const crearProducto = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });

    try {
        const { nombre, descripcion, precio, stock, categoryId, imagen } = req.body;
        const producto = new Producto({ nombre, descripcion, precio, stock, categoryId, imagen });
        await producto.save();
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

const actualizarProducto = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });

    try {
        const { nombre, descripcion, precio, stock, categoryId, imagen } = req.body;
        const producto = await Producto.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion, precio, stock, categoryId, imagen },
            { new: true, runValidators: true }
        );
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

const eliminarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};

module.exports = { listarProductos, obtenerProducto, crearProducto, actualizarProducto, eliminarProducto };
