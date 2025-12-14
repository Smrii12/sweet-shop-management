const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();
const db = new sqlite3.Database('./sweetshop.db');
const SECRET = 'SWEETSHOP_SECRET';

router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users(username, password, role) VALUES(?,?,?)`,
    [username, hash, role || 'user'],
    err => {
      if (err) return res.status(400).json({ message: 'User exists' });
      res.json({ message: 'Registered' });
    }
  );
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get(
    `SELECT * FROM users WHERE username=?`,
    [username],
    async (err, user) => {
      if (!user) return res.status(400).json({ message: 'User not found' });

      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(401).json({ message: 'Wrong password' });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        SECRET,
        { expiresIn: '2h' }
      );

      res.json({ token, role: user.role });
    }
  );
});

module.exports = router;
