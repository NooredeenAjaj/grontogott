const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require('./users');
const inventoryRoutes = require('./inventory');

app.use(userRoutes);
app.use(inventoryRoutes);

app.listen(5001, () => console.log("Server started at port 5001"));
