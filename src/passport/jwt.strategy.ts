const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
import {User} from '../models/user.model'

module.exports = new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    },
    function (jwtPayload, cb) {
        return User.findOne(jwtPayload.id).then(user => {
            return cb(null, user);
        }).catch(err => {
            return cb(err);
        });
    }
);