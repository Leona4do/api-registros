const express = require('express');
const router = express.Router();
const { getDb, saveDatabase } = require('../database');

// GET /api/registros — Obtener todos los registros
router.get('/', (req, res) => {
  try {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM registro ORDER BY id_registro ASC');
    const registros = [];
    while (stmt.step()) {
      registros.push(stmt.getAsObject());
    }
    stmt.free();
    res.json({ success: true, data: registros });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener registros', error: error.message });
  }
});

// GET /api/registros/:id — Obtener un registro por ID
router.get('/:id', (req, res) => {
  try {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM registro WHERE id_registro = :id');
    stmt.bind({ ':id': req.params.id });
    if (stmt.step()) {
      const registro = stmt.getAsObject();
      stmt.free();
      return res.json({ success: true, data: registro });
    }
    stmt.free();
    res.status(404).json({ success: false, message: 'Registro no encontrado' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener el registro', error: error.message });
  }
});

// POST /api/registros — Crear un nuevo registro
router.post('/', (req, res) => {
  try {
    const { nombre, correo, fecha_registro, estado } = req.body;

    if (!nombre || !correo || !fecha_registro || !estado) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos: nombre, correo, fecha_registro, estado'
      });
    }

    const db = getDb();
    db.run(
      'INSERT INTO registro (nombre, correo, fecha_registro, estado) VALUES (?, ?, ?, ?)',
      [nombre, correo, fecha_registro, estado]
    );

    // Obtener el ID del registro recién insertado
    const result = db.exec('SELECT last_insert_rowid() as id');
    const newId = result[0].values[0][0];

    saveDatabase();

    res.status(201).json({
      success: true,
      message: 'Registro creado exitosamente',
      data: { id_registro: newId, nombre, correo, fecha_registro, estado }
    });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ success: false, message: 'El correo ya está registrado' });
    }
    res.status(500).json({ success: false, message: 'Error al crear el registro', error: error.message });
  }
});

// PUT /api/registros/:id — Actualizar un registro existente
router.put('/:id', (req, res) => {
  try {
    const { nombre, correo, fecha_registro, estado } = req.body;

    if (!nombre || !correo || !fecha_registro || !estado) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos: nombre, correo, fecha_registro, estado'
      });
    }

    const db = getDb();

    // Verificar que existe
    const check = db.prepare('SELECT id_registro FROM registro WHERE id_registro = ?');
    check.bind([req.params.id]);
    if (!check.step()) {
      check.free();
      return res.status(404).json({ success: false, message: 'Registro no encontrado' });
    }
    check.free();

    db.run(
      'UPDATE registro SET nombre = ?, correo = ?, fecha_registro = ?, estado = ? WHERE id_registro = ?',
      [nombre, correo, fecha_registro, estado, req.params.id]
    );

    saveDatabase();

    res.json({
      success: true,
      message: 'Registro actualizado exitosamente',
      data: { id_registro: parseInt(req.params.id), nombre, correo, fecha_registro, estado }
    });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ success: false, message: 'El correo ya está registrado por otro usuario' });
    }
    res.status(500).json({ success: false, message: 'Error al actualizar el registro', error: error.message });
  }
});

// DELETE /api/registros/:id — Eliminar un registro
router.delete('/:id', (req, res) => {
  try {
    const db = getDb();

    // Verificar que existe
    const check = db.prepare('SELECT id_registro FROM registro WHERE id_registro = ?');
    check.bind([req.params.id]);
    if (!check.step()) {
      check.free();
      return res.status(404).json({ success: false, message: 'Registro no encontrado' });
    }
    check.free();

    db.run('DELETE FROM registro WHERE id_registro = ?', [req.params.id]);
    saveDatabase();

    res.json({ success: true, message: 'Registro eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar el registro', error: error.message });
  }
});

module.exports = router;
