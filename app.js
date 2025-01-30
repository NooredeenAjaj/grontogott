const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Hantera JSON-data från klienten

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

const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey"; // Använd en säker hemlig nyckel

// ** Registrera användare **
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

// ** Logga in användare & skapa JWT-token **
app.post('/login', (req, res) => {
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

// ** Middleware för att verifiera JWT-token **
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token
  
  if (!token) return res.status(403).send({ message: "Access denied" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send({ message: "Invalid token" });
    
    req.user = user; // Lagra användarinformation i request-objektet
    next();
  });
};

// ** Hämta inventarie **
app.get('/inventory', (req, res) => {
  db.query('SELECT * FROM inventory_items', (err, results) => {
    if (err) {
      console.error('Error fetching inventory items:', err);
      return res.status(500).send({ message: 'Error fetching inventory items' });
    }
    res.json(results);
  });
});

// ** Lägga en beställning (kräver JWT-token) **
app.post('/orders', authenticateToken, (req, res) => {
  const { foundation, protein, dressing, extras, uuid } = req.body;
  const user_id = req.user.user_id; // Hämta user_id från JWT-token
  
  const sql = "INSERT INTO orders (user_id, foundation, protein, dressing, extras, uuid) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [user_id, foundation, protein, dressing, extras, uuid], (err, result) => {
    if (err) {
      console.error('Error inserting order:', err);
      return res.status(500).send({ message: 'Error placing order' });
    }
    res.send({ status: 'Order received', order: uuid });
  });
});

app.listen(5001, () => console.log("Server started at port 5001"));
