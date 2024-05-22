var express = require('express');
var router = express.Router();
const db = require('../models/config');
const { register, login, forgot, otp, changePassword } = require('../controllers/user');
const { checkToken } = require('../middleware/jwt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', (req, res)=>{
  res.render('register')
})

router.get('/login', (req, res)=>{
  res.render('login')
})

router.get('/home', checkToken, (req, res)=>{
  res.render('LoggedInPage')
})

router.post('/register', register)

router.post('/login', login)

router.get('/forgot', (req, res)=>{
  res.render('forgot');
})

router.post('/forgot', forgot)

router.post('/otp', otp)

router.post('/change_password', changePassword)

module.exports = router;
