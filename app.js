var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index2.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});