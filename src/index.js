const express = require('express');
const cors = require('cors');
const { initDatabase } = require('./database');
const registrosRouter = require('./routes/registros');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'API REST - Gestión de Registros',
    version: '1.0.0',
    endpoints: {
      'GET    /api/registros':      'Obtener todos los registros',
      'GET    /api/registros/:id':  'Obtener un registro por ID',
      'POST   /api/registros':      'Crear un nuevo registro',
      'PUT    /api/registros/:id':  'Actualizar un registro',
      'DELETE /api/registros/:id':  'Eliminar un registro'
    }
  });
});

// Rutas de la API
app.use('/api/registros', registrosRouter);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Error interno del servidor' });
});

// Inicializar base de datos y levantar servidor
initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log(`Documentación en http://localhost:${PORT}/`);
    });
  })
  .catch(err => {
    console.error('Error al inicializar la base de datos:', err);
    process.exit(1);
  });
