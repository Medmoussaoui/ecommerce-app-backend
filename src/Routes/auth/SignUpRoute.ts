import express from 'express';
import { SignUpController } from '../../controller/auth/signUp/index';
import * as security from '../../Security/Signup/index';


export const signupRoute = express.Router();
const signupController = new SignUpController();

// Routes 

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

