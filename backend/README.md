# MiInventarioExpress

Aplicacion web de gestion de productos con autenticacion y chat en tiempo real.

## Autora
Nicole Ramos

## Tecnologias utilizadas
- Node.js
- Express.js
- MongoDB Local
- Mongoose
- Handlebars
- Socket.io
- Multer
- Bcrypt
- Express-session
- Express-validator

## Funcionalidades
- Registro e inicio de sesion de usuarios
- Gestion de productos (crear, listar, editar, eliminar)
- Carga de imagenes por producto
- Validacion de formularios
- Chat en tiempo real entre usuarios autenticados

## Instalacion

1. Clonar el repositorio
```
git clone https://github.com/Nicole292005/MiInventarioExpres.git
```

2. Instalar dependencias
```
npm install
```

3. Configuración (Opcional)
El sistema utiliza valores por defecto para MongoDB local y el secreto de sesión. Si deseas cambiarlos, crea un archivo `.env` en la carpeta `backend` con:
```
MONGODB_URI=tu_uri_de_mongodb
PUERTO=3000
SECRETO_SESION=tu_clave_secreta
```

4. Ejecutar la semilla para crear usuarios iniciales
```
npm run seed
```

5. Iniciar el servidor
```
npm start o npm run dev
```

6. Abrir en el navegador
```
http://localhost:3000
```

## Usuarios iniciales
- Correo: nicole@inventario.com | Contrasena: nicole123
- Correo: invitado@inventario.com | Contrasena: invitado123
