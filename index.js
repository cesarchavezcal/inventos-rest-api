const msg = require('./dictionary');
const config = require('./config');
const express = require('express');
const path = require('path');
const database = require('./database');

const app = express();

app.use(express.json({
    extend: true,
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

database().then(() => {
    console.log(msg.server.database);
});

app.listen(config.port, () => {
    console.log(`${msg.server.running + config.port}`);
});