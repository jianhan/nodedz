import express from 'express'

module.exports = function (app, passport) {
    const router = express.Router();
    // send to google to do the authentication
    router.get('/oauth2/google', passport.authenticate('google', {scope: ['profile', 'email']}));

    // the callback after google has authenticated the user
    router.get('/oauth2/google/callback', passport.authenticate('google', {session: false}), function (req, res) {
        res.json({user: req.user})
    });

    return router
}
