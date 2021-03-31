// Dependency
const mongoose = require("mongoose");

// Defining Schema
const TestSchema = mongoose.Schema({
    test: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Test', TestSchema);