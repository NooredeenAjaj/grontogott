const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./database');
const { authenticateToken } = require('./auth');

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";

router.post('/register', async (req, res) => {
  const { email, password, address_street, address_city, address_postal_code } = req.body;
  if (password && email && address_street && address_city && address_postal_code) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Inkludera adressinformation i SQL-frågan
    db.query('INSERT INTO users (username, password, address_street, address_city, address_postal_code) VALUES (?, ?, ?, ?, ?)', 
    [email, hashedPassword, address_street, address_city, address_postal_code], (err, results) => {
      if (err) {
        console.error('Error inserting new user:', err);
        res.status(500).send({ message: 'Error registering new user' });
        return;
      }
      res.send({ message: 'User registered successfully' });
    });
  } else {
    res.status(400).send({ message: 'Email, password, and address information are required' });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  db.query('SELECT id, password FROM users WHERE username = ?', [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).send({ message: 'User not found' });
    }
    
    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    
    if (match) {
      const token = jwt.sign({ user_id: user.id, email }, SECRET_KEY, { expiresIn: '2h' });
      res.send({ message: 'Login successful', token });
    } else {
      res.status(401).send({ message: 'Password is incorrect' });
    }
  });
});

router.post('/logout', (req, res) => {

  res.status(200).send({ message: 'Du har loggat ut.' });
});
module.exports = router;
