import express from 'express'

module.exports = function (passport) {
    const router = express.Router();
    // the callback after google has authenticated the user
    router.get('/user/profile', passport.authenticate('jwt', {session: false}));

    return router
};
