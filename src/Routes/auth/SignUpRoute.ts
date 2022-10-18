import express, { NextFunction, Request, Response } from 'express';
import { SignUpController } from '../../controller/signUp/signupController';
import * as security from '../../Security/Signup/index';


export const signupRoute = express.Router();
const signupController = new SignUpController();

// === Routes === //

signupRoute.post('/', [
    new security.SignUpSecurity().checkPoint(),
    signupController.signUp(),
]);


signupRoute.post('/sendverifycode', [
    new security.SignUpSendVeridyCodeSecurity().checkPoint(),
    signupController.sendVerifyCode(),
]);


signupRoute.post('/verifycode', [
    new security.SignupVerifyCodeSecurity().checkPoint(),
    signupController.verifyCode(),
]);

/// Get Requests
signupRoute.get('/', [
    (req: Request, res: Response, next: NextFunction) => {
        res.locals.verifyCode = "5022";
        next();
    },
    (req: Request, res: Response) => {
        res.send('verify code ' + res.locals.verifyCode);
    }
]);



