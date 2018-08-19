const User = require('../models/user.model');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    },
    function (jwtPayload, cb) {
        return User.findOneById(jwtPayload.id).then(user => {
            return cb(null, user);
        }).catch(err => {
            return cb(err);
        });
    }
);