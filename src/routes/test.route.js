// Dependencies
const express = require('express');
// Controller libraries
const { getTests, getTest, createTest, updateTest, deleteTest } = require('../controllers/test.controller');
// Using express app
const router = express.Router();

// Route operations
// Read operation /api/get
/**
 * @api {get} /test
*/
router.get('/', getTests);
router.get('/:id', getTest);
router.post('/', createTest);
router.put('/:id', updateTest);
router.delete('/:id', deleteTest);

module.exports = router;