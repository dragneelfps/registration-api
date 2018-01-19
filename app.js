// Read config file
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json','utf8'));

var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect(config.db_url, {
    useMongoClient: true
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

var admin = require('./routes/admin')(app);
var client = require('./routes/client')(app);

app.get('/',function (req,res) {
    res.send("Welcome");
});

var server = app.listen(8000, function () {
    console.log('Server started on localhost:'+config.server_port);
});