const { Router } = require('express');
const router = Router();

const passport = require('passport');


router.get('/api/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        message: 'You did it!',
        user: req.user,
        token: req.query.secret_token,
    })
})

module.exports = router;