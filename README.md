# MercApp — Catálogo de Productos

## Datos del estudiante

- **Nombre:** Nicole Ramos
- **Materia:** Aplicaciones Web
- **Universidad:** Universidad Politécnica Salesiana
- **Unidad:** 3 — Programación del lado del cliente

---

## Descripción

MercApp es una aplicación web de una sola página (SPA) desarrollada con Vue 3 que permite gestionar un catálogo de productos. Consume una API REST propia construida con Node.js y Express, y utiliza MongoDB local como base de datos.

---

## Funcionalidades implementadas

1. API REST con endpoints para productos y categorías (GET, POST, PUT, DELETE)
2. Validación de datos en el backend con express-validator (errores 400/404/500)
3. Script de semilla para poblar la base de datos con 12 productos y 5 categorías
4. Proyecto Vue 3 con Vite y estructura de Single File Components (SFC)
5. Routing con Vue Router: catálogo, detalle, nuevo, edición, carrito, nosotros y 404
6. Lazy loading en las rutas /cart y /about con `<Suspense>` y fallback
7. Listado de productos con buscador por nombre/descripción y filtro por categoría
8. Propiedad computada para la lista filtrada de productos
9. Componente ProductCard reutilizable con prop `product` y evento `added-to-cart`
10. Vista de detalle de producto con acciones de agregar, editar y eliminar
11. Composable genérico `useFetch` con reintento automático y manejo de estados
12. Composable específico `useProducts` para carga y filtrado del catálogo
13. Formulario de creación y edición de productos con validación por campo usando v-model
14. Store Pinia para el carrito: agregar, quitar, eliminar, vaciar y total calculado
15. Persistencia del carrito en localStorage
16. CORS habilitado en el backend para el frontend Vue
17. Diseño responsivo adaptable a móvil y escritorio

---

## Instrucciones de uso

### Requisitos previos

- Node.js v18 o superior
- MongoDB instalado y ejecutándose localmente (puerto 27017)

### 1. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 2. Poblar la base de datos (opcional, solo la primera vez)

```bash
cd backend
npm run seed
```

### 3. Iniciar el backend

```bash
cd backend
npm run dev
```

El servidor queda disponible en `http://localhost:3000`

### 4. Instalar dependencias del frontend

```bash
cd frontend
npm install
```

### 5. Iniciar el frontend

```bash
cd frontend
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`

---

## Endpoints del API REST

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/products | Listar todos los productos |
| GET | /api/products/:id | Obtener un producto por id |
| POST | /api/products | Crear un producto |
| PUT | /api/products/:id | Actualizar un producto |
| DELETE | /api/products/:id | Eliminar un producto |
| GET | /api/categories | Listar todas las categorías |

---

## Estructura del proyecto

```
MercApp/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   └── seed.js
└── frontend/
    └── src/
        ├── components/
        ├── composables/
        ├── router/
        ├── services/
        ├── stores/
        └── views/
```
