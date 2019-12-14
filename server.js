const express = require('express')
const app = express()
const port = 9009
const apiV1 = require('./App/v1');
const apiV2 = require('./App/v2');

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
app.use('/api/v2', apiV2);

router.get("/auth", function(req, res) {
  var token = req.query.token || uuid.v4();
  var expire = req.query.expire || parseInt(Date.now()/1000)+2400;
  var privateAPIKey = "private_2bNBVB8F5Wk0HzzHXnXpJuwrqhw=";
  var signature = crypto.createHmac('sha1', privateAPIKey).update(token+expire).digest('hex');
  res.status(200);
  res.send({
      token : token,
      expire : expire,
      signature : signature
  });
});

app.listen(process.env.PORT || port, () => console.log(`Pintaki app listening on port ${port}!`))