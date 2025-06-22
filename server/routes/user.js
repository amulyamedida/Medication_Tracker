const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/:id', (req, res) => {
  db.get('SELECT id, username, role FROM users WHERE id = ?', [req.params.id], (err, user) => {
    if (err || !user) return res.status(404).send('User not found');
    res.send(user);
  });
});

module.exports = router;
