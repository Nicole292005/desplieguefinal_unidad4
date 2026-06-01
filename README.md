# MecApp — Gestión de inventario

Aplicación web de gestión de productos con autenticación y chat en tiempo real.
Desplegada con **Netlify** (frontend), **Railway** (backend) y **MongoDB Atlas** (base de datos).

## Autora
Nicole Ramos

## Links

| | URL |
|---|---|
| Frontend | https://iridescent-melomakarona-94644b.netlify.app/ |
| Backend / Health | https://desplieguefinalunidad4-production.up.railway.app/health |
| Repositorio | https://github.com/Nicole292005/desplieguefinal_unidad4.git |
| Documentación | https://nicole292005.github.io/desplieguefinal_unidad4/ |

## Stack

| Capa | Tecnología | Plataforma |
|---|---|---|
| Frontend | Vue 3 + Vite + Vue Router + Pinia | Netlify |
| Backend | Node.js + Express + Socket.io | Railway |
| Base de datos | MongoDB + Mongoose | MongoDB Atlas |
| Autenticación | express-session + bcrypt | — |
| Uploads | Multer | — |

## Funcionalidades

- Gestión de productos: crear, listar, editar, eliminar
- Carga de imágenes por producto
- Validación de formularios

## Variables de entorno

### Backend (Railway)

```
MONGODB_URI=mongodb+srv://...
SECRETO_SESION=clave_secreta_aleatoria
CORS_ORIGIN=https://iridescent-melomakarona-94644b.netlify.app
```

### Frontend (Netlify)

```
VITE_API_URL=https://desplieguefinalunidad4-production.up.railway.app/api
```

## Desarrollo local

1. Clonar el repositorio

```bash
git clone https://github.com/Nicole292005/desplieguefinal_unidad4.git
```

2. Instalar dependencias del backend

```bash
npm install
```

3. Crear `.env` en la raíz con los valores locales

```
MONGODB_URI=mongodb://127.0.0.1:27017/mecapp
SECRETO_SESION=clave_local
CORS_ORIGIN=http://localhost:5173
```

4. Poblar la base de datos (opcional)

```bash
npm run seed
```

5. Iniciar el backend

```bash
npm run dev
```

6. Instalar dependencias del frontend e iniciarlo

```bash
cd frontend
npm install
npm run dev
```

7. Abrir `http://localhost:5173`

## Usuarios iniciales (seed)

| Correo | Contraseña |
|---|---|
| nicole@inventario.com | nicole123 |
| invitado@inventario.com | invitado123 |
