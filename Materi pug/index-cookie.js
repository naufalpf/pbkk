var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!", resave: true, saveUninitialized: true}));

app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));


// app.get('/form', function(req, res){
//     res.render('form');
//  });

app.post('/', function(req, res){
   console.log(req.body);
   res.send("recieved your request!");
});

//cookie
app.get('/cookie', function(req, res){
    //cookie biasa
    res.cookie('name', 'express').send('cookie set'); //Sets name = express
    //Expires after 360000 ms from the time it is set.
    // res.cookie('name', 'express', {expire: 360000 + Date.now()}).send('cookie set'); //Sets name = express
    
    console.log('Cookies: ', req.cookies);
 });

 app.get('/clear_cookie_foo', function(req, res){
    res.clearCookie('foo');
    res.send('cookie foo cleared');
 });

 app.get('/sessions', function(req, res){
    if(req.session.page_views){
       req.session.page_views++;
       res.send("You visited this page " + req.session.page_views + " times");
    } else {
       req.session.page_views = 1;
       res.send("Welcome to this page for the first time!");
    }
 });
app.listen(3000);
console.log('Buka localhost:3000/cookie');
console.log('Buka localhost:3000/clear_cookie_foo untuk delete cookie');
console.log('Buka localhost:3000/sessions untuk session dan refresh')