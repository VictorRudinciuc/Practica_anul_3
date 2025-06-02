// server/src/routes/auth.js
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const SECRET = process.env.JWT_SECRET;

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: 'Token lipsă.' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId  = decoded.id;
    req.isAdmin = decoded.isAdmin || false;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid.' });
  }
}

router.post('/register', async (req, res) => {
  const { nume, prenume, email, password, is_admin } = req.body;
  try {
    const hashed = bcrypt.hashSync(password, 10);

    const regResult = await pool.query(
      `INSERT INTO "user".register (nume, prenume, email, parola, is_admin)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [nume, prenume, email, hashed, is_admin || false]
    );
    const userId = regResult.rows[0].id;

    await pool.query(
      `INSERT INTO "user".login (id, email, parola)
       VALUES ($1, $2, $3)`,
      [userId, email, hashed]
    );

    res.status(201).json({ message: 'Cont creat cu succes!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Eroare la crearea contului.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      `SELECT l.id, l.email, l.parola, r.is_admin
       FROM "user".login AS l
       JOIN "user".register AS r ON l.id = r.id
       WHERE l.email = $1`,
      [email]
    );
    const user = result.rows[0];
    if (!user || !bcrypt.compareSync(password, user.parola)) {
      return res.status(401).json({ error: 'Email sau parolă incorecte.' });
    }

    const payload = {
      id:      user.id,
      isAdmin: user.is_admin,
    };
    const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Eroare la autentificare.' });
  }
});

router.get('/profile', authenticate, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT nume, prenume, email, is_admin
       FROM "user".register
       WHERE id = $1`,
      [req.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Utilizator inexistent.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Eroare server.' });
  }
});

module.exports = router;
