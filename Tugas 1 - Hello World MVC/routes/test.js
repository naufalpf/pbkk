var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  /* res.send('Hello World !'); //kalau mau beda tulisan
  */
});

module.exports = router;
