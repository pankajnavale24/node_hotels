// server.js
const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const db = require('./db'); 

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);

const MenuItemRoutes = require('./routes/MenuItemsRoutes');
app.use('/MenuItem', MenuItemRoutes);
// new comment i am going to make
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});



