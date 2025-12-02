# User Post — Node.js Backend (Express + Mongoose)

Proyecto backend sencillo que ofrece gestión de usuarios (registro, login y logout) construido con Node.js, Express y MongoDB (Mongoose).

## 🧭 Resumen

Este repositorio contiene un pequeño backend para manejar usuarios. Incluye:

- Rutas para registrar, iniciar sesión y cerrar sesión de usuarios.
- Validaciones básicas en el servidor.
- Hash de contraseñas con bcrypt.

## 🛠️ Tecnologías

- Node.js (ES Modules)
- Express
- MongoDB + Mongoose
- bcrypt (hash de contraseñas)
- dotenv
- nodemon (dev)

## 📦 Instalación y ejecución

Requisitos:

- Node.js (v16+ recomendable)
- MongoDB (URI disponible o servicio en la nube)

Pasos:

1. Clona el repositorio y entra en la carpeta backend:

```powershell
cd bk-node/backend
```

2. Instala dependencias:

```powershell
npm install
```

3. Crea un archivo `.env` en `backend` con al menos estas variables:

```
MONGODB_URI=<tu-mongodb-uri>
PORT=4000
```

4. Ejecuta en modo desarrollo:

```powershell
npm run dev
```

La aplicación escuchará en el puerto configurado por `PORT` o en `8000` por defecto.

## 📁 Estructura principal

- backend/src/index.js — punto de arranque / conexión DB
- backend/src/app.js — configuración de Express y rutas
- backend/src/routes/user.route.js — endpoints de usuario (/api/users)
- backend/src/controllers/user.controller.js — lógica de controladores de usuario
- backend/src/models/user.model.js — esquema y métodos del modelo `User`
- backend/src/config/database.js — conexión a MongoDB

## 🔧 Variables de entorno necesarias

- MONGODB_URI — URI de conexión a MongoDB
- PORT — puerto donde corre el servidor (opcional)

## 🚦 Endpoints (API)

Base URL: http://localhost:8000/api/users

- POST /register

  - Descripción: Crea un nuevo usuario.
  - Body JSON: { "username": "nombre", "email": "correo@ejemplo.com", "password": "secreto" }
  - Respuestas:
    - 201: Usuario creado -> devuelve id, username y email
    - 400: Faltan campos
    - 409: Usuario ya existe
    - 500: Error del servidor

- POST /login

  - Descripción: Inicia sesión (verifica email y password).
  - Body JSON: { "email": "correo@ejemplo.com", "password": "secreto" }
  - Respuestas:
    - 200: Login correcto
    - 401: Credenciales inválidas
    - 404: Usuario no encontrado

- POST /logout
  - Descripción: Cierra sesión (demo — sólo verifica existencia de usuario en esta app).
  - Body JSON: { "email": "correo@ejemplo.com" }
  - Respuestas:
    - 200: Logout correcto
    - 404: Usuario no encontrado

### Posts (API)

Base URL: http://localhost:8000/api/posts

- POST /create

  - Descripción: Crea un nuevo post.
  - Body JSON: { "name": "Titulo", "description": "Texto...", "age": 30 }
  - Respuestas:
    - 201: Post creado -> devuelve el objeto `Post` creado
    - 400: Faltan campos
    - 500: Error del servidor

- GET /all

  - Descripción: Obtiene todos los posts.
  - Respuestas:
    - 200: Array de posts
    - 500: Error del servidor

- PATCH /update/:id

  - Descripción: Actualiza un post por su `id`.
  - Params: `id` — identificador del post (MongoDB ObjectId)
  - Body JSON: cualquier campo modificable del post, por ejemplo { "name": "Nuevo título" }
  - Respuestas:
    - 200: Post actualizado -> devuelve el post actualizado
    - 400: Body vacío
    - 404: Post no encontrado
    - 500: Error del servidor

- DELETE /delete/:id
  - Descripción: Elimina un post por su `id`.
  - Params: `id` — identificador del post
  - Respuestas:
    - 200: Eliminado correctamente
    - 404: Post no encontrado
    - 500: Error del servidor

## 🔐 Modelo User (mongoose)

Campos principales (ver `backend/src/models/user.model.js`):

- username: String, requerido, único, min 1, max 30
- email: String, requerido, único
- password: String, requerido, min 6, max 50

El esquema incluye:

- Middleware pre-save para hashear la contraseña con bcrypt (genSalt + hash).
- Método `comparePassword` para comprobar una contraseña con el hash almacenado.

````

## 🧪 Pruebas rápidas con curl

Registro (register):

```bash
curl -X POST http://localhost:8000/api/users/register \
	-H "Content-Type: application/json" \
	-d '{"username":"test","email":"test@example.com","password":"123456"}'
````

Login:

```bash
curl -X POST http://localhost:8000/api/users/login \
	-H "Content-Type: application/json" \
	-d '{"email":"test@example.com","password":"123456"}'
```

Licence: ISC
