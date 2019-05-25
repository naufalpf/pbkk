var express = require('express');
var session = require('express-session');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var moment = require('moment');
var app = express();
var bodyParser = require('body-parser');
var request = require('request-json');
var baseurl = 'http://10.151.31.167:3000';
var client = request.createClient(baseurl);

app.use(session({secret: 'pbkk4' ,saveUninitialized: true,resave: true}));
app.use(cookieParser());
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded())
app.use(express.static('public'))
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
    res.render('home');
});

app.get('/tambahmahasiswa', function(req,res){
    res.render('tambahmahasiswa');
});

app.get('/tambahmatkul', function(req,res){
    res.render('tambahmatkul');
});

app.get('/tambahjadwal', function(req,res){
    res.render('tambahjadwal');
});

app.get('/tambahpeserta', function(req,res){
    res.render('tambahpeserta');
});

app.post('/tambahpeserta', function(req,res){
    var url = '/tambahpeserta/'+req.body.idmatakuliah+'/'+req.body.iduser;
    client.post(url, function(err, res, body) {
        return console.log(body);
    });
    res.send("Tambah Peserta Sukses");
});

app.get('/absen', function(req,res){
    res.render('absen');
});

app.post('/absen', function(req,res){
    var url = '/absen/'+req.body.ruang+'/'+req.body.nrp;
    client.post(url, function(err, res, body) {
        return console.log(body);
    });
    res.send("Absen berhasil");
});

app.get('/rekap/:idmatkul/semester/:idsemester', function(req,res){
    var url = '/rekap/'+req.params.idmatkul+'/semester/'+req.params.idsemester;
    client.get(url)
    .then(function(result) {
        console.log(result.body);
        var hasil = result.body;
        res.render('rekap', {hasil});
    }).catch((err)=>{
        console.log(err);
    })
});

app.get('/rekap/:idmatkul/pertemuan/:pertemuanke', function(req,res){
    var url = '/rekap/'+req.params.idmatkul+'/pertemuan/'+req.params.pertemuanke;
    client.get(url)
    .then(function(result) {
        console.log(result.body);
        var hasil = result.body;
        res.render('rekap', {hasil});
    }).catch((err)=>{
        console.log(err);
    })
});

app.get('/rekapmahasiswa/:nrp/semester/:idsemester', function(req,res){
    var url = '/rekapmahasiswa/'+req.params.nrp+'/semester/'+req.params.idsemester;
    client.get(url)
    .then(function(result) {
        console.log(result.body);
        var hasil = result.body;
        res.render('rekap', {hasil});
    }).catch((err)=>{
        console.log(err);
    })
});

app.get('/rekapmahasiswa/:nrp/matkul/:idmatkul', function(req,res){
    var url = '/rekapmahasiswa/'+req.params.nrp+'/matkul/'+req.params.idmatkul;
    client.get(url)
    .then(function(result) {
        console.log(result.body);
        var hasil = result.body;
        res.render('rekap', {hasil});
    }).catch((err)=>{
        console.log(err);
    })
});

app.listen(8000, () => {
    console.log('Aplikasi berjalan di port 8000');
});
