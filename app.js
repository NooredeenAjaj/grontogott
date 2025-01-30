const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // För att hantera JSON-data från klienten.

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'logintest'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log("MySQL connected");
});

// Register User
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (password && email) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [email, hashedPassword], (err, results) => {
      if (err) {
        console.error('Error inserting new user:', err);
        res.status(500).send({ message: 'Error registering new user' });
        return;
      }
      res.send({ message: 'User registered successfully' });
    });
  } else {
    res.status(400).send({ message: 'Email and password are required' });
  }
});

// Login User
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT password FROM users WHERE username = ?', [email], async (err, results) => {
    if (err || results.length === 0) {
      res.status(401).send({ message: 'User not found' });
      return;
    }
    const match = await bcrypt.compare(password, results[0].password);
    if (match) {
      res.send({ message: 'Login successful' });
    } else {
      res.status(401).send({ message: 'Password is incorrect' });
    }
  });
});


// Get all inventory items
app.get('/inventory', (req, res) => {
    db.query('SELECT * FROM inventory_items', (err, results) => {
      if (err) {
        console.error('Error fetching inventory items:', err);
        res.status(500).send({ message: 'Error fetching inventory items' });
        return;
      }
      res.json(results);
    });
  });
  app.post('/orders', (req, res) => {
    const { user_id, foundation, protein, dressing, extras, uuid } = req.body;
    const sql = "INSERT INTO orders (user_id, foundation, protein, dressing, extras, uuid) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [user_id, foundation, protein, dressing, extras, uuid], (err, result) => {
        if (err) throw err;
        res.send({ status: 'Order received', order: uuid });
    });
});
  
app.listen(5001, () => console.log("Server started at port 5001"));
