var express = require('express');
var router = express.Router();

var db = require('../db.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  var sess = req.session;
  if (sess.email) {
    console.log(sess.email);
    res.redirect('/welcome');
  } else {
    res.render('index');
  }
});

router.get('/welcome', function (req, res, next) {
  if (req.session.email) {
    res.render('welcome', { user: req.session.email });
  } else {
    res.redirect('/login');
  }
});

router.get('/login', (req, res, next) => res.render('index'));

router.post('/login', function (req, res, next) {
  db.findOne({email: req.body.username, password: req.body.password}, (err, docs) => {
    var sess = req.session;
    if (!err) {
      if (docs) {
        var obj = docs.toObject();
        sess.email = obj.email;
        res.redirect('/welcome');
      } else {
        console.log(docs);
        res.render('error', {message: 'wrong credentials'});
      }
    } else {
      res.render('error', {message: 'something went wrong', error: err});
    }
  });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/login');
  });
});

module.exports = router;
