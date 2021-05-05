const {Strategy, ExtractJwt} = require('passport-jwt');
const User = require('./../models/user.model');
const config = require('../config');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
};

const passportMiddleware = new Strategy(options, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);
        if(user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        console.log(error);
    }

});

module.exports = passportMiddleware;
