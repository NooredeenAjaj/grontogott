const express = require('express');
const db = require('./database');
const { authenticateToken } = require('./auth');

const router = express.Router();

router.get('/inventory', (req, res) => {
  db.query('SELECT * FROM inventory_items', (err, results) => {
    if (err) {
      console.error('Error fetching inventory items:', err);
      return res.status(500).send({ message: 'Error fetching inventory items' });
    }
    res.json(results);
  });
});

router.post('/orders', authenticateToken, (req, res) => {
  const { foundation, protein, dressing, extras, uuid } = req.body;
  const user_id = req.user.user_id;
  
  const sql = "INSERT INTO orders (user_id, foundation, protein, dressing, extras, uuid) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [user_id, foundation, protein, dressing, extras, uuid], (err, result) => {
    if (err) {
      console.error('Error inserting order:', err);
      return res.status(500).send({ message: 'Error placing order' }); 
    }
    res.send({ status: 'Order received', order: uuid });
  });
});

module.exports = router;
