import {Profile} from "passport-google-oauth";
import {User} from "../models/user.model";

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

function profileToObject(token: string, refreshToken: string, profile: Profile): object {
    return {
        "google.id": profile.id,
        "google.token": token,
        "google.display_name": profile.displayName,
        "google.email": profile.emails ? (profile.emails[0].value || "").toLowerCase() : "",
        "google.family_name": profile.name ? profile.name.familyName : "",
        "google.given_name": profile.name ? profile.name.givenName : "",
        "google.image_url": profile.photos ? profile.photos[0].value || "" : "",
        "google.profile_data": profile._json,
        "google.last_logged_in_at": (new Date()).toISOString(),
    };
}

module.exports = new GoogleStrategy({
    clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    callbackURL: `${process.env.HOST}:${process.env.PORT}/${process.env.GOOGLE_AUTH_CALLBACK_URL}`,
}, async (token: string, refreshToken: string, profile: Profile, done) => {

    // find existing user and update all fields
    const existingUser = await User.findOne({"google.id": profile.id});
    if (existingUser) {
        await existingUser.update(profileToObject(token, refreshToken, profile));
        return done(null, existingUser);
    }

    // create new user
    const newUser = new User(profileToObject(token, refreshToken, profile));
    await newUser.save();
    done(null, newUser);
});
