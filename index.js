// Globals
const msg = require('./src/libs/dictionary');
// Dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const passportMiddleware = require('./src/middlewares/passport');
// Project configurations
const config = require('./src/config');
// Services
const database = require('./src/database');
// Routes
const testRoutes = require('./src/routes/test.route');
const authRoutes = require('./src/routes/auth.route');
const specialRoutes = require('./src/routes/protected.route');
const authObjRoutes = require('./src/routes/authObj.route');

// Connecting to database
database().then(() => {
    // eslint-disable-next-line no-console
    console.log(msg.server.database);
});
// Starting express app
const app = express();
// Middlewares
app.use(passport.initialize());
passport.use(passportMiddleware);
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json({ extend: true }));
// Routes
app.get('/', (req, res) => { res.sendFile(path.join(__dirname + '/src/index.html'))});
app.use(testRoutes);
app.use(authRoutes);
app.use(specialRoutes);
app.use(authObjRoutes);
// Running server app
app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`${msg.server.running + config.port}`);
});