const express = require('express');
const { signin, signup } = require('../controllers/user.controller');

const router = express.Router();


router.post('/api/signup', signup);
router.post('/api/signin', signin);

module.exports = router;