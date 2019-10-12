const express = require('express')
const app = express()
const cors  = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
require('dotenv').config();

var users = require('./routes/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', users);

app.listen(3001)