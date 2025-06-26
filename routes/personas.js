const express = require('express');
const router = express.Router();
const db = require('../db');

// Ruta para registrar una persona
router.post('/registrar', (req, res) => {
  const { cedula, nombres, apellidos, correo, telefono, direccion, tipo } = req.body;

  // Validar que todos los campos estén presentes
  if (!cedula || !nombres || !apellidos || !correo || !telefono || !direccion || !tipo) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  const sql = `
    INSERT INTO personas (cedula_per, nombres_per, apellidos_per, correo_per, telefono_per, direccion_per, tipo_per)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [cedula, nombres, apellidos, correo, telefono, direccion, tipo], (err, result) => {
    if (err) {
      console.error('❌ Error al registrar:', err);
      return res.status(500).json({ mensaje: 'Error en el servidor' });
    }

    res.json({ mensaje: '✅ Persona registrada con éxito', id: result.insertId });
  });
});

// (Opcional) Ruta para probar si está viva la API
router.get('/ping', (req, res) => {
  res.send('pong');
});

module.exports = router;
