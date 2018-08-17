module.exports = function (app, passport) {
// send to google to do the authentication
    app.get('/oauth2/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// the callback after google has authenticated the user
    app.get('/oauth2/google/callback', passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));
}

