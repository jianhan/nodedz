///<reference path="../../node_modules/@types/node/index.d.ts"/>
import {IUserModel} from "../models/user.model";
import {NextFunction, Request, Response} from 'express';

const JWT = require('jsonwebtoken');
const User = require('../models/user.model');

class AuthController {

    public static signToken(user: IUserModel): string {
        return JWT.sign({
            iss: process.env.JWT_ISS,
            sub: user.id,
            iat: new Date().getTime(), // current time
            exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
            saltLength: 10
        }, process.env.JWT_SECRET)
    }

    public async signUp(req: Request, res: Response, next: NextFunction) {
        const {email, password} = req.body;
        // Check if there is a user with the same email
        const foundUser = await User.findOne({"local.email": email});
        if (foundUser) {
            return res.status(403).json({error: 'Email is already in use'});
        }

        // Create a new user
        const newUser = new User({
            method: 'local',
            local: {
                email: email,
                password: password
            }
        });
        await newUser.save();

        // Generate the token
        const token = AuthController.signToken(newUser);

        // Respond with token
        res.status(200).json({token});
    }

    /**
     * login handles local authentication.
     *
     * @param req incoming request.
     * @param res response object.
     *
     * @param next next func.
     */
    public async login(req: Request, res: Response, next: NextFunction) {
        const token = AuthController.signToken(req.user)
        res.status(200).json({token});
    }

    public async googleOAuthCallback(req: Request, res: Response, next: NextFunction) {
        const token = AuthController.signToken(req.user)
        res.status(200).json({token: token, user: req.user});
    }
}

export default new AuthController();

