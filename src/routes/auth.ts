import express from 'express'
import AuthController from '../controllers/auth.controller'

module.exports = function (app, passport) {
    const router = express.Router();

    // send to google to do the authentication
    router.get('/oauth2/google', passport.authenticate('google', {
        session: false,
        scope: ['profile', 'email'],
    }));

    // the callback after google has authenticated the user
    router.get('/oauth2/google/callback', passport.authenticate('google', {session: false}), AuthController.googleOAuthCallback);

    return router
};
