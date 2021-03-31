const User = require('./../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../config');

const createToken = (user) => {
    const token = jwt.sign({ id: user._id, email: user.email }, config.jwtSecret, {
        expiresIn: 86400
    });

    return token;
}

const signup = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            msg: 'Please send your email and password',
        });
    };

    const user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(400).json({
            msg: 'User already exists'
        })
    }

    const newUser = new User(req.body);

    await newUser.save().then(() => {
        res.status(201).json({
            newUser,
            msg: 'User created'
        })
    });
}
const signin = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            msg: 'Please send your email and password',
        });
    };

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).json({
            msg: 'User doesnt exists'
        })
    };

    const isMatch = await user.comparePassword(req.body.password);

    if (isMatch) {
        console.log(isMatch)
        return res.status(200).json({
            token: createToken(user),
        })
    }

    res.status(400).json({
        msg: 'Email or password incorrect'
    })
}
module.exports = { signup, signin }