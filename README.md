# API REST - Gestión de Registros

API REST desarrollada con **Node.js**, **Express** y **SQLite** para la gestión de registros. Implementa operaciones CRUD completas sobre la entidad `Registro`.

---

## 🗂️ Estructura del proyecto

```
api-registros/
├── src/
│   ├── index.js          # Punto de entrada del servidor
│   ├── database.js       # Conexión e inicialización de la base de datos
│   └── routes/
│       └── registros.js  # Rutas y controladores CRUD
├── package.json
├── .gitignore
└── README.md
```

---

## 🗄️ Modelo de datos

**Tabla: `registro`**

| Campo           | Tipo     | Descripción                      |
|----------------|----------|----------------------------------|
| id_registro    | INTEGER  | Clave primaria autoincremental   |
| nombre         | VARCHAR  | Nombre del registro              |
| correo         | VARCHAR  | Correo electrónico (único)       |
| fecha_registro | DATETIME | Fecha y hora del registro        |
| estado         | VARCHAR  | Estado del registro              |

---

## 🚀 Instalación y ejecución

### Requisitos previos
- Node.js v16 o superior
- npm

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/Leona4do/api-registros

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor
npm start
```

El servidor estará disponible en: `http://localhost:3000`

---

## 📡 Endpoints de la API

### Base URL: `http://localhost:3000/api`

| Método | Endpoint              | Descripción                    |
|--------|-----------------------|--------------------------------|
| GET    | `/registros`          | Obtener todos los registros    |
| GET    | `/registros/:id`      | Obtener un registro por ID     |
| POST   | `/registros`          | Crear un nuevo registro        |
| PUT    | `/registros/:id`      | Actualizar un registro         |
| DELETE | `/registros/:id`      | Eliminar un registro           |

---

## 📋 Ejemplos de uso

### Crear un registro (POST)
```http
POST /api/registros
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "correo": "juan@example.com",
  "fecha_registro": "2025-05-23T10:00:00",
  "estado": "activo"
}
```

### Obtener todos los registros (GET)
```http
GET /api/registros
```

### Obtener un registro por ID (GET)
```http
GET /api/registros/1
```

### Actualizar un registro (PUT)
```http
PUT /api/registros/1
Content-Type: application/json

{
  "nombre": "Juan Pérez Actualizado",
  "correo": "juan@example.com",
  "fecha_registro": "2025-05-23T12:00:00",
  "estado": "inactivo"
}
```

### Eliminar un registro (DELETE)
```http
DELETE /api/registros/1
```

---

## 🧪 Pruebas con Postman

1. Importa la colección o crea requests manualmente en Postman.
2. Asegúrate de que el servidor esté corriendo.
3. Prueba cada endpoint en el orden: POST → GET → PUT → DELETE.

---

## 🛠️ Tecnologías utilizadas

- **Node.js** — Entorno de ejecución
- **Express** — Framework web
- **sql.js** — SQLite compilado en WebAssembly (sin dependencias nativas)
- **CORS** — Middleware para Cross-Origin Resource Sharing
## 🧪 Capturas de pruebas en Postman

### POST - Crear registro
![POST](capturas/Captura%20Crea%20un%20registro.png)

### PUT - Actualizar registro
![PUT](capturas/Captura%20de%20actualizar.png)

### DELETE - Eliminar registro
![DELETE](capturas/Captura%20de%20eleminar.png)

### GET - Ver todos los registros
![GET todos](capturas/Captura%20de%20ver%20todos%20los%20registros.png)

### GET - Ver por ID
![GET por ID](capturas/Captura%20de%20ver%20uno%20por%20ID.png)
