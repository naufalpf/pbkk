var express = require('express');
var session = require('express-session');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var moment = require('moment');
var app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'tugas4pbkk';

app.use(session({secret: 'pbkk4' ,saveUninitialized: true,resave: true}));
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded())
app.use(express.static('public'))
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
var sess;

MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Berhasil terhubung ke database");
  const db = client.db(dbName);
  client.close();
});

app.get('/', function (req, res) {
  res.redirect('/login');
});

app.get('/login', function (req, res) {
    sess = req.session;
    if(sess.nrp) {
      return res.redirect('/home');
    }
    res.render('login');
});

app.post('/login', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    var query = { nrp : req.body.nrp, password : req.body.password };
    dbo.collection("user").find(query).toArray(function(err, result) {
    if (err) throw err;
    if(result.length > 0){
        db.close();
        console.log('sukses login');
        sess = req.session;
        sess.nrp = req.body.nrp;
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db(dbName);
          var log = {nrp: req.body.nrp, waktu_login: moment().format()};
          dbo.collection("log").insertOne(log, function(err, res) {
            if (err) throw err;
            console.log("nrp "+req.body.nrp + " telah login");
            db.close();
          });
        });
        res.redirect('/home');
    }
    else{
        db.close();
        console.log('gagal login');
        res.redirect('/login');
    }
    });
  });
});

app.get('/register', function (req, res) {
  res.render('register');
});

app.post('/register', function (req, res) {
  const nrp = req.body.nrp;
  const password = req.body.password;
  const kelas = req.body.kelas;
  const nama = req.body.nama;
  const role = 'M';
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    var myobj = {nama :nama, nrp: nrp, password: password, kelas: kelas,role: role};
    dbo.collection("user").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("registrasi berhasil");
      db.close();
    });
  });
  res.redirect('/login');
});

app.get('/home', function (req, res) {
    sess = req.session;
    if(sess.nrp) {
      var nrp = sess.nrp;
      res.render('home', { nrp });
    }
    else {
      res.redirect('/login');
    }
});

app.get('/logout', function (req, res) {
  req.session.destroy((err) => {
    if(err) {
        return console.log(err);
    }
    res.redirect('/');
  });
});

app.listen(8000, () => {
  console.log('Aplikasi berjalan di port 8000');
});