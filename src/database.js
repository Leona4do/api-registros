const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'database.sqlite');

let db;

async function initDatabase() {
  const SQL = await initSqlJs();

  // Si ya existe el archivo, cargarlo; si no, crear uno nuevo
  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  // Crear la tabla si no existe
  db.run(`
    CREATE TABLE IF NOT EXISTS registro (
      id_registro INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre      VARCHAR(255) NOT NULL,
      correo      VARCHAR(255) NOT NULL UNIQUE,
      fecha_registro DATETIME NOT NULL,
      estado      VARCHAR(100) NOT NULL
    )
  `);

  saveDatabase();
  console.log('Base de datos inicializada correctamente.');
  return db;
}

function saveDatabase() {
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

function getDb() {
  return db;
}

module.exports = { initDatabase, saveDatabase, getDb };
