// Dependencies
const express = require('express');
// Controller libraries
const { getTests, getTest, createTest, updateTest, deleteTest } = require('../controllers/test.controller');
// Using express app
const router = express.Router();

// Route operations
// Read operation /api/get
router.get('/api/test', getTests);
router.get('/api/test/:id', getTest);
router.post('/api/test', createTest);
router.put('/api/test/:id', updateTest);
router.delete('/api/test/:id', deleteTest);

module.exports = router;