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

app.listen(5001, () => console.log("Server started at port 5001"));
