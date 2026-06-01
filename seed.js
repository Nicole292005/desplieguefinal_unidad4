require('dotenv').config();
const mongoose = require('mongoose');
const Categoria = require('./models/Categoria');
const Producto = require('./models/Producto');

const categorias = [
    { nombre: 'Electrónica' },
    { nombre: 'Ropa' },
    { nombre: 'Hogar' },
    { nombre: 'Alimentos' },
    { nombre: 'Deportes' }
];

const poblarBaseDatos = async () => {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mecapp';
        await mongoose.connect(uri);
        console.log(`Conectado a MongoDB en ${uri}`);

        // Limpiar colecciones existentes
        await Categoria.deleteMany({});
        await Producto.deleteMany({});
        console.log('Colecciones limpiadas');

        // Insertar categorías
        const categoriasCreadas = await Categoria.insertMany(categorias);
        console.log(`${categoriasCreadas.length} categorías creadas`);

        const electronica = categoriasCreadas[0]._id;
        const ropa        = categoriasCreadas[1]._id;
        const hogar       = categoriasCreadas[2]._id;
        const alimentos   = categoriasCreadas[3]._id;
        const deportes    = categoriasCreadas[4]._id;

        const productos = [
            {
                nombre: 'Laptop Lenovo IdeaPad',
                descripcion: 'Laptop con procesador Intel Core i5, 8GB RAM y 512GB SSD. Ideal para trabajo y estudios universitarios.',
                precio: 750.00,
                stock: 15,
                categoryId: electronica,
                imagen: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'
            },
            {
                nombre: 'Smartphone Samsung Galaxy A54',
                descripcion: 'Teléfono inteligente con pantalla AMOLED de 6.4 pulgadas, cámara de 50MP y batería de 5000mAh.',
                precio: 380.00,
                stock: 30,
                categoryId: electronica,
                imagen: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'
            },
            {
                nombre: 'Audífonos Bluetooth JBL',
                descripcion: 'Audífonos inalámbricos con cancelación de ruido, hasta 30 horas de batería y sonido premium.',
                precio: 85.00,
                stock: 50,
                categoryId: electronica,
                imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
            },
            {
                nombre: 'Camiseta Deportiva Nike',
                descripcion: 'Camiseta de alto rendimiento fabricada con tela Dri-FIT que mantiene el cuerpo fresco durante el ejercicio.',
                precio: 35.00,
                stock: 100,
                categoryId: ropa,
                imagen: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'
            },
            {
                nombre: 'Chaqueta Impermeable Columbia',
                descripcion: 'Chaqueta resistente al agua con tecnología Omni-Tech, ideal para actividades al aire libre en cualquier clima.',
                precio: 120.00,
                stock: 25,
                categoryId: ropa,
                imagen: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400'
            },
            {
                nombre: 'Cafetera Nespresso Vertuo',
                descripcion: 'Cafetera de cápsulas con tecnología Centrifusion, prepara café espresso y lungo de alta calidad en segundos.',
                precio: 150.00,
                stock: 20,
                categoryId: hogar,
                imagen: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400'
            },
            {
                nombre: 'Set de Sartenes Antiadherentes',
                descripcion: 'Juego de 3 sartenes de aluminio con recubrimiento antiadherente de cerámica, aptas para todo tipo de cocinas.',
                precio: 65.00,
                stock: 35,
                categoryId: hogar,
                imagen: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'
            },
            {
                nombre: 'Aceite de Oliva Extra Virgen',
                descripcion: 'Aceite de oliva extra virgen de primera prensada en frío, 1 litro. Ideal para ensaladas y cocina mediterránea.',
                precio: 12.50,
                stock: 200,
                categoryId: alimentos,
                imagen: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'
            },
            {
                nombre: 'Proteína Whey Gold Standard',
                descripcion: 'Suplemento de proteína de suero de leche con 24g de proteína por porción. Sabor chocolate, presentación de 2lb.',
                precio: 55.00,
                stock: 40,
                categoryId: alimentos,
                imagen: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400'
            },
            {
                nombre: 'Bicicleta de Montaña Trek',
                descripcion: 'Bicicleta todo terreno con marco de aluminio, 21 velocidades y frenos de disco hidráulicos. Rin 29 pulgadas.',
                precio: 480.00,
                stock: 10,
                categoryId: deportes,
                imagen: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400'
            },
            {
                nombre: 'Mancuernas Ajustables 20kg',
                descripcion: 'Par de mancuernas ajustables de 2 a 20kg con sistema de bloqueo rápido. Perfectas para entrenamiento en casa.',
                precio: 95.00,
                stock: 18,
                categoryId: deportes,
                imagen: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400'
            },
            {
                nombre: 'Tablet iPad Air',
                descripcion: 'Tablet con chip M1, pantalla Liquid Retina de 10.9 pulgadas, 64GB de almacenamiento y compatible con Apple Pencil.',
                precio: 620.00,
                stock: 12,
                categoryId: electronica,
                imagen: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400'
            }
        ];

        const productosCreados = await Producto.insertMany(productos);
        console.log(`${productosCreados.length} productos creados`);

        console.log('\nBase de datos poblada exitosamente');
        process.exit(0);
    } catch (error) {
        console.error('Error al poblar la base de datos:', error.message);
        process.exit(1);
    }
};

poblarBaseDatos();
