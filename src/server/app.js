const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const api = require('./routes/api');
const payment = require('./routes/payment');

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());

app.use('/api', api);
app.use('/payment', payment);

app.get('/', (req,res)=>{
    res.send('some');
})

app.listen(port, ()=>{
    console.log('Server running at: ' + port);
})