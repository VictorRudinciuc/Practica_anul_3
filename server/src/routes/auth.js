require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const SECRET = process.env.JWT_SECRET;


router.post('/register', async (req, res) => {
  const { nume, prenume, email, password } = req.body;
  try {
    
    const hashed = await bcrypt.hash(password, 10);

    
    const result = await pool.query(
      `INSERT INTO "user".register (nume, prenume, email, parola)
       VALUES ($1, $2,  $3,     $4)
       RETURNING id`,
      [nume, prenume, email, hashed]
    );
    const userId = result.rows[0].id;

    
    await pool.query(
      `INSERT INTO "user".login (id, email, parola)
       VALUES ($1,  $2,    $3)`,
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
      `SELECT * FROM "user".login WHERE email = $1`,
      [email]
    );
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.parola))) {
      return res.status(401).json({ error: 'Email sau parolă incorecte.' });
    }
    
    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Eroare la autentificare.' });
  }
});

module.exports = router;
