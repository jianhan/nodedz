"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
module.exports = function (app, passport) {
    const router = express_1.default.Router();
    // send to google to do the authentication
    router.get('/oauth2/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
    // the callback after google has authenticated the user
    router.get('/oauth2/google/callback', passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));
    app.use('/api/v1', router);
};
//# sourceMappingURL=api.js.map