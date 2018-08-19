///<reference path="../../node_modules/@types/node/index.d.ts"/>
import {NextFunction, Request, Response} from 'express';

class UserController {
    public profile(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({user: req.user});
    }
}

export default new UserController();
