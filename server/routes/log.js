const express = require('express');
const db = require('../db');
const router = express.Router();


router.post('/', (req, res) => {
  const { medication_id, taken_date } = req.body;
  if (!medication_id || !taken_date) {
    return res.status(400).json({ error: 'medication_id and taken_date are required' });
  }

  const query = `INSERT INTO medication_logs (medication_id, taken_date) VALUES (?, ?)`;
  db.run(query, [medication_id, taken_date], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Log added', id: this.lastID });
  });
});



router.get('/:medication_id', (req, res) => {
  const { medication_id } = req.params;

  const query = `SELECT * FROM medication_logs WHERE medication_id = ? ORDER BY taken_date DESC`;
  db.all(query, [medication_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
