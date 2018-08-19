const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
import {User} from '../models/user.model'

function profileToObject(token: string, refreshToken: string, profile: any): object {
    return {
        'google.id': profile.id,
        'google.token': token,
        'google.display_name': profile.displayName,
        'google.email': (profile.emails[0].value || '').toLowerCase()
    }
}

module.exports = new GoogleStrategy({
    clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    callbackURL: `${process.env.HOST}:${process.env.PORT}/${process.env.GOOGLE_AUTH_CALLBACK_URL}`,
}, async (token, refreshToken, profile, done) => {
    // Should have full user profile over here
    console.log('profile', profile);
    console.log('accessToken', token);
    console.log('refreshToken', refreshToken);

    const existingUser = await User.findOne({"google.id": profile.id});
    if (existingUser) {
        await existingUser.update(profileToObject(token, refreshToken, profile));
        return done(null, existingUser);
    }

    let newUser = new User(profileToObject(token, refreshToken, profile));
    await newUser.save();
    done(null, newUser);

    // // asynchronous
    // // check if the user is already logged in
    // if (!req.user) {
    //     User.findOne({'google.id': profile.id}, function (err, user) {
    //         if (err) {
    //             return done(err);
    //         }
    //         if (user) {
    //             // if there is a user id already but no token (user was linked at one point and then removed)
    //             if (!user.google.token) {
    //                 user.google.token = token;
    //                 user.google.name = profile.displayName;
    //                 user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
    //
    //                 user.save(function (err) {
    //                     if (err)
    //                         return done(err);
    //                     return done(null, user);
    //                 });
    //             }
    //             return done(null, user);
    //         } else {
    //             var newUser = new User();
    //             newUser.google.id = profile.id;
    //             newUser.google.token = token;
    //             newUser.google.name = profile.displayName;
    //             newUser.google.email = (profile.emails[0].value || '').toLowerCase();
    //             newUser.save(function (err) {
    //                 if (err)
    //                     return done(err)
    //
    //                 return done(null, newUser)
    //             });
    //         }
    //     });
    //
    // } else {
    //     // user already exists and is logged in, we have to link accounts
    //     var user = req.user; // pull the user out of the session
    //
    //     user.google.id = profile.id;
    //     user.google.token = token;
    //     user.google.name = profile.displayName;
    //     user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
    //
    //     user.save(function (err) {
    //         if (err)
    //             return done(err);
    //
    //         return done(null, user);
    //     });
    // }
})