const express = require('express')
const app = express()
const port = 9000
const apiV1 = require('./App/v1');
require('./App/configs/constants');
require('./App/configs/connection');

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({    
  extended: true
}));   

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.use('/api/v1', apiV1);

app.listen(port, () => console.log(`Pintaki app listening on port ${port}!`))