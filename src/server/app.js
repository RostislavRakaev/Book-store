const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const api = require('./routes/api');

const app = express();
const port = process.env.PORT || 3000;
const JWT_Secret = 'your_secret_key';

app.use(cors())
app.use(bodyParser.json());
app.use('/api',  api);

app.get('/', (req,res)=>{
    res.send('some');
})

app.listen(port, ()=>{
    console.log('Server running at: ' + port)
})