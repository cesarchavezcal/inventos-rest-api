// Globals
const msg = require('./dictionary');
// Dependencies
const express = require('express');
const morgan = require('morgan');
const path = require('path');
// Project configurations
const config = require('./src/config');
// Routes

// Services
const database = require('./src/database');

// Connecting to database
database().then(() => {
    // eslint-disable-next-line no-console
    console.log(msg.server.database);
});

// Starting express app
const app = express();
// Express configurations
app.use(express.json({ extend: true }));
app.use(morgan('tiny'));
// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.use('/api/test', require('./src/routes/test.route'));

// Running server app
app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`${msg.server.running + config.port}`);
});