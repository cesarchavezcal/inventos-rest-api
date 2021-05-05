const express = require('express');
const passport = require('passport');

const { getAuthObjs, getAuthObj, createAuthObj, updateAuthObj, deleteAuthObj } = require('../controllers/authObj.controller');

const router = express.Router();


router.get('/api/authobj', passport.authenticate('jwt', {session: false}), getAuthObjs); 
router.get('/api/authobj/:id', passport.authenticate('jwt', {session: false}), getAuthObj); 
router.post('/api/authobj', passport.authenticate('jwt', {session: false}), createAuthObj); 
router.put('/api/authobj/:id', passport.authenticate('jwt', {session: false}), updateAuthObj); 
router.delete('/api/authobj/:id', passport.authenticate('jwt', {session: false}), deleteAuthObj); 

module.exports = router;