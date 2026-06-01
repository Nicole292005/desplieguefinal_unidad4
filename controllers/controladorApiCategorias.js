const Categoria = require('../models/Categoria');

const listarCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find().lean();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las categorías' });
    }
};

module.exports = { listarCategorias };
