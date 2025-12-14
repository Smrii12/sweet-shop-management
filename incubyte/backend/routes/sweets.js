const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');

const router = express.Router();
const db = new sqlite3.Database('./sweetshop.db');
const SECRET = 'SWEETSHOP_SECRET';

/* ---------- AUTH MIDDLEWARE ---------- */
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token' });

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin only' });
  }
  next();
}

/* ---------- GET ALL SWEETS ---------- */
router.get('/', authenticate, (req, res) => {
  db.all(`SELECT * FROM sweets`, [], (err, rows) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    res.json(rows);
  });
});

/* ---------- SEARCH ---------- */
router.get('/search', authenticate, (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;

  let query = `SELECT * FROM sweets WHERE 1=1`;
  const params = [];

  if (name) {
    query += ` AND name LIKE ?`;
    params.push(`%${name}%`);
  }

  if (category) {
    query += ` AND category LIKE ?`;
    params.push(`%${category}%`);
  }

  if (minPrice) {
    query += ` AND price >= ?`;
    params.push(minPrice);
  }

  if (maxPrice) {
    query += ` AND price <= ?`;
    params.push(maxPrice);
  }

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ message: 'Search failed' });
    res.json(rows);
  });
});

/* ---------- ADD SWEET (ADMIN) ---------- */
router.post('/', authenticate, adminOnly, (req, res) => {
  const { name, category, price, quantity } = req.body;

  if (!name || !category || !price || !quantity) {
    return res.status(400).json({ message: 'All fields required' });
  }

  db.run(
    `INSERT INTO sweets (name, category, price, quantity)
     VALUES (?, ?, ?, ?)`,
    [name, category, price, quantity],
    function (err) {
      if (err) return res.status(500).json({ message: 'Insert failed' });
      res.json({ id: this.lastID });
    }
  );
});

/* ---------- PURCHASE ---------- */
router.post('/:id/purchase', authenticate, (req, res) => {
  const sweetId = req.params.id;

  db.get(
    `SELECT quantity FROM sweets WHERE id = ?`,
    [sweetId],
    (err, row) => {
      if (!row) return res.status(404).json({ message: 'Sweet not found' });
      if (row.quantity <= 0)
        return res.status(400).json({ message: 'Out of stock' });

      db.run(
        `UPDATE sweets SET quantity = quantity - 1 WHERE id = ?`,
        [sweetId],
        () => res.json({ message: 'Purchase successful' })
      );
    }
  );
});

/* ---------- RESTOCK (ADMIN) ---------- */
router.post('/:id/restock', authenticate, adminOnly, (req, res) => {
  const sweetId = req.params.id;
  const { amount } = req.body;
  const restockAmount = amount && amount > 0 ? amount : 1;

  db.run(
    `UPDATE sweets SET quantity = quantity + ? WHERE id = ?`,
    [restockAmount, sweetId],
    function (err) {
      if (err) return res.status(500).json({ message: 'Restock failed' });
      if (this.changes === 0)
        return res.status(404).json({ message: 'Sweet not found' });

      res.json({ message: 'Sweet restocked successfully' });
    }
  );
});

/* ---------- UPDATE (ADMIN) ---------- */
router.put('/:id', authenticate, adminOnly, (req, res) => {
  const { name, category, price, quantity } = req.body;
  const sweetId = req.params.id;

  db.run(
    `UPDATE sweets
     SET name = ?, category = ?, price = ?, quantity = ?
     WHERE id = ?`,
    [name, category, price, quantity, sweetId],
    function (err) {
      if (err) return res.status(500).json({ message: 'Update failed' });
      if (this.changes === 0)
        return res.status(404).json({ message: 'Sweet not found' });

      res.json({ message: 'Sweet updated successfully' });
    }
  );
});

/* ---------- DELETE (ADMIN) ---------- */
router.delete('/:id', authenticate, adminOnly, (req, res) => {
  db.run(`DELETE FROM sweets WHERE id = ?`, [req.params.id], function () {
    res.json({ message: 'Deleted' });
  });
});

module.exports = router;
