const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token lipsă.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;
    req.isAdmin = decoded.isAdmin || false;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid.' });
  }
}

router.post('/', authenticate, async (req, res) => {
  const {
    idnp,
    nume,
    prenume,
    dataNasterii,
    telefon,
    serviciu,
    locatie,
    data,
    ora,
  } = req.body;
  try {
    const check = await pool.query(
      `SELECT * FROM programari WHERE data_programare = $1 AND ora = $2 AND serviciu = $3`,
      [data, ora, serviciu]
    );
    if (check.rows.length) {
      return res.status(400).json({ error: 'Slot deja ocupat.' });
    }
    const result = await pool.query(
      `INSERT INTO programari
        (user_id, idnp, nume, prenume, data_nasterii, telefon, serviciu, locatie, data_programare, ora)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       RETURNING *`,
      [
        req.userId,
        idnp,
        nume,
        prenume,
        dataNasterii,
        telefon,
        serviciu,
        locatie,
        data,
        ora,
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Eroare server.' });
  }
});

router.get('/', authenticate, async (req, res) => {
  const { data, serviciu } = req.query;
  try {
    const result = await pool.query(
      `SELECT ora FROM programari WHERE data_programare = $1 AND serviciu = $2`,
      [data, serviciu]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Eroare server.' });
  }
});

router.get('/mine', authenticate, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM programari WHERE user_id = $1 ORDER BY data_programare DESC, ora DESC`,
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Eroare server.' });
  }
});

router.get('/all', authenticate, async (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).json({ error: 'Acces interzis: doar admin.' });
  }
  try {
    const result = await pool.query(
      `SELECT * FROM programari ORDER BY data_programare DESC, ora DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Eroare server.' });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).json({ error: 'Acces interzis: doar admin.' });
  }
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM programari WHERE id = $1`, [id]);
    res.json({ message: 'Programare ștearsă cu succes.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Eroare server.' });
  }
});

module.exports = router;
