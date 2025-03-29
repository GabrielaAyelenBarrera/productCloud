# 🐾 AdoptMe API

API RESTful para la gestión de usuarios, mascotas y adopciones. Desarrollada con Node.js, Express, MongoDB y autenticación JWT mediante cookies.

---

## 🚀 Tecnologías utilizadas

- Node.js + Express
- MongoDB + Mongoose
- JWT para autenticación
- Cookie-Parser
- Handlebars para vistas
- Supertest + Node:test para testing
- Multer para subida de imágenes

---

## 📦 Instalación

```bash
git clone https://github.com/tuusuario/adoptme-api.git
cd adoptme-api
npm install
```

---

## ⚙️ Variables de entorno

Creá un archivo `.env` en la raíz con las siguientes variables:

```
MONGO_URL=mongodb+srv://gbarrera:coderhouse@cluster0.eetr1.mongodb.net/adoptme?retryWrites=true&w=majority&appName=Cluster0
PORT=8080
```

---

## 🧪 Comandos de desarrollo

### Iniciar en modo desarrollo
```bash
npm run dev
```

### Iniciar en modo producción
```bash
npm start
```

### Ejecutar tests
```bash
npm test
```

---

## 📄 Documentación de Rutas del Proyecto – AdoptMe API

Este documento describe todas las rutas disponibles en la API del proyecto **AdoptMe**, organizadas por módulo.

---

### 🔐 Autenticación

Algunas rutas requieren autenticación mediante token o cookie (`coderCookie`). Están señaladas con un ícono 🔒.

---

## 📁 `/api/users`

| Método | Ruta               | Descripción                     |
|--------|--------------------|---------------------------------|
| GET    | `/api/users`       | Obtener todos los usuarios      |
| GET    | `/api/users/:uid`  | Obtener un usuario por ID       |
| PUT    | `/api/users/:uid`  | Actualizar un usuario por ID    |
| DELETE | `/api/users/:uid`  | Eliminar un usuario por ID      |

📌 *Documentado con Swagger en `/api-docs`.*

---

## 📁 `/api/pets`

| Método | Ruta                        | Descripción                            |
|--------|-----------------------------|----------------------------------------|
| GET    | `/api/pets`                 | Obtener todas las mascotas             |
| POST   | `/api/pets`                 | Crear una nueva mascota (JSON)         |
| POST   | `/api/pets/withimage`       | Crear mascota con imagen (form-data)   |
| PUT    | `/api/pets/:pid`            | Actualizar una mascota por ID          |
| DELETE | `/api/pets/:pid`            | Eliminar una mascota por ID            |

---

## 📁 `/api/adoptions`

| Método | Ruta                               | Descripción                            |
|--------|------------------------------------|----------------------------------------|
| GET    | `/api/adoptions`                   | Obtener todas las adopciones           |
| GET    | `/api/adoptions/:aid`              | Obtener una adopción por ID            |
| POST   | `/api/adoptions/:uid/:pid`         | Crear una adopción para un usuario y mascota |

---

## 📁 `/api/sessions`

| Método | Ruta                      | Descripción                          |
|--------|---------------------------|--------------------------------------|
| POST   | `/api/sessions/register`  | Registrar un nuevo usuario           |
| POST   | `/api/sessions/login`     | Iniciar sesión                       |
| GET    | `/api/sessions/current`   | 🔒 Obtener el usuario autenticado    |
| GET    | `/api/sessions/unprotectedLogin` | Login de prueba sin token    |
| GET    | `/api/sessions/unprotectedCurrent` | Usuario actual sin autenticación |

---

## 🌐 Rutas de vistas (`/`)

| Método | Ruta         | Descripción                          |
|--------|--------------|--------------------------------------|
| GET    | `/`          | Página de inicio (home)              |
| GET    | `/users`     | Vista de usuarios (handlebars)       |
| GET    | `/pets`      | Vista de mascotas (handlebars)       |

---

## 📌 Observaciones

- Las rutas `/withimage` requieren usar `form-data` con el campo `image`.
- Las rutas `current` requieren autenticación con token o cookie (`authToken` middleware).
- Toda la API está montada en `http://localhost:8080`.

---

## 🧾 Endpoints disponibles

### Usuarios (`/api/users`)
- `GET /` Obtener todos los usuarios
- `GET /:uid` Obtener un usuario por ID
- `PUT /:uid` Actualizar usuario
- `DELETE /:uid` Eliminar usuario

### Mascotas (`/api/pets`)
- `GET /` Obtener todas las mascotas
- `POST /` Crear mascota
- `PUT /:pid` Actualizar mascota
- `DELETE /:pid` Eliminar mascota
- `POST /withimage` Crear mascota con imagen

### Adopciones (`/api/adoptions`)
- `GET /` Obtener todas las adopciones
- `GET /:aid` Obtener adopción por ID
- `POST /:uid/:pid` Crear adopción

### Autenticación (`/api/sessions`)
- `POST /register` Registro de usuario
- `POST /login` Login con JWT (setea cookie `coderCookie`)
- `GET /current` Obtener usuario autenticado (protegido)
- `POST /unprotectedLogin` Login alternativo sin middleware
- `GET /unprotectedCurrent` Obtener usuario sin protección

---

## 🔐 Middleware de autenticación

El archivo `src/middlewares/authToken.js` protege rutas mediante validación del JWT presente en la cookie `coderCookie`.

---

## 🧰 Tests automatizados

Se utilizan `node:test`, `supertest` y `assert` para validar todos los endpoints:

- CRUD de usuarios y mascotas
- Flujo de adopciones
- Registro, login, autenticación JWT

---

## ▶️ Ejecutar tests individuales desde consola

Además del comando `npm test`, podés ejecutar un archivo de test específico usando:

```bash
node --test tests/adoptions.test.js
```

📂 Otros ejemplos:

```bash
node --test tests/users.test.js
node --test tests/pets.test.js
node --test tests/sessions.test.js
```

---

## 📬 Postman Collection

Incluida en el repo: [`Ducumentación`](./src/docs/Users.yaml)

Importala en Postman para probar con Swagger el módulo de “Users” con ejemplos de requests.

---

## 🐳 Imagen Docker

Podés correr el proyecto directamente desde Docker usando la imagen publicada:

👉 Imagen en DockerHub:  
[docker.io/gabriellabarrera/proyectofinal](https://hub.docker.com/repository/docker/gabriellabarrera/proyectofinal)

### Ejecutar la imagen localmente

```bash
docker pull gabriellabarrera/proyectofinal:latest
docker run -p 8080:8080 --env-file .env gabriellabarrera/proyectofinal
```

📌 Recordá crear un archivo `.env` con al menos la variable `MONGO_URL` para que el contenedor funcione correctamente.
