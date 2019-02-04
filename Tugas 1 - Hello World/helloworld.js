var express = require('express');
var app = express();
var port = 2000;

app.get('/', (req, res) => res.send('Hello world'));

app.listen(port, function() {
    console.log('Buka browser dan ketik ke alamat localhost:2000')
});