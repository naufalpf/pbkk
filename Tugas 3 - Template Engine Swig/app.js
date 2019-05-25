var express = require('express'),
  swig = require('./lib/swig'),
  http = require('http'),
  app = express(),
  people;

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
// Optional: use swig's caching methods
// app.set('view cache', false);

app.get('/', function (req, res) {
  res.render('index', {});
});

app.get('/people', function (req, res) {
  res.render('people', { people: people });
});

app.get('/people/:id([0-9]{10})', function (req, res) {
  res.render('person', { person: people[req.params.id] });
});

app.get('/*', function (req, res) {
  res.render(req.params[0], {});
});

people = [
  { name: 'Naufal', NRP: 5115100057 },
  { name: 'Akram', NRP: 5115100050 },
  { name: 'Hilmi', NRP: 5116100164 }
];

app.listen(3000);
console.log('Buka browser ke halaman http://localhost:3000');
