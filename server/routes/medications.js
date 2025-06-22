const express = require('express');
const db = require('../db');
const router = express.Router();

// GET all medications using query 
router.get('/', (req, res) => {
  const userId = req.query.userId || 1; 

  db.all('SELECT * FROM medications WHERE user_id = ?', [userId], (err, rows) => {
    if (err) return res.status(500).send('DB error');
    res.send(rows);
  });
});

// Get all medications for specific user by URL
router.get('/:userId', (req, res) => {
  db.all('SELECT * FROM medications WHERE user_id = ?', [req.params.userId], (err, rows) => {
    if (err) return res.status(500).send('DB error');
    res.send(rows);
  });
});

// Add new medication
router.post('/', (req, res) => {
  const { user_id, name, dosage, frequency } = req.body;
  if (!user_id || !name || !dosage || !frequency)
    return res.status(400).send('Missing fields');

  db.run(
    `INSERT INTO medications (user_id, name, dosage, frequency) VALUES (?, ?, ?, ?)`,
    [user_id, name, dosage, frequency],
    function (err) {
      if (err) return res.status(500).send('DB error');
      res.send({ id: this.lastID });
    }
  );
});

//  Mark medication as taken today
router.post('/:id/mark-taken', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  db.run(
    `INSERT INTO medication_logs (medication_id, taken_date) VALUES (?, ?)`,
    [req.params.id, today],
    function (err) {
      if (err) return res.status(500).send('DB error');
      res.send({ log_id: this.lastID });
    }
  );
});

// Get adherence report for a user
router.get('/adherence/:userId', (req, res) => {
  const userId = req.params.userId;
  db.all(
    `SELECT m.id AS med_id, m.frequency, COUNT(l.id) AS times_taken
     FROM medications m
     LEFT JOIN medication_logs l ON l.medication_id = m.id
     WHERE m.user_id = ?
     GROUP BY m.id`,
    [userId],
    (err, rows) => {
      if (err) return res.status(500).send('DB error');

      let total = rows.length;
      if (total === 0) return res.send({ adherence: 0 });

      let adherence = 0;
      rows.forEach(row => {
        if (row.times_taken > 0) adherence += 1;
      });

      const percentage = (adherence / total) * 100;
      res.send({ adherence: percentage.toFixed(2) });
    }
  );
});

module.exports = router;
