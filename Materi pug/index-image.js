var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();

app.get('/image', function(req, res){
   res.render('index.pug');
});

app.set('view engine', 'pug');
app.set('views', './views');
app.use('/static', express.static('public'));

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));



app.listen(3000);
console.log('buka browser ke localhost:3000/image')