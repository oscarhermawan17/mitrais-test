const express = require('express')
const app = express()
const cors  = require('cors');
app.use(cors());

app.listen(3001)

app.get('/', (req, res) => res.send('Hello World!'))