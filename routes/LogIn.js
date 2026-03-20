const express = require('express');
const router = express.Router();
const LogIn = require('../controllers/LogIn');

router.post('/sign-up', LogIn.createUser); 
router.post('/', LogIn.handleLogin);

module.exports = router;