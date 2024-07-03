import express from 'express';
import { ForgetPasswordController } from '../../controller/auth/ForgetPassword';
import * as security from '../../Security/SignIn/ForgetPassword/index';


export const forgetPasswordRoute = express.Router();
const forgetPasswordController = new ForgetPasswordController();

// Routes 

forgetPasswordRoute.post('/sendverifycode', [
    new security.ForgetPasswordSendOTPSecurity().checkPoint(),
    forgetPasswordController.sendVerifyCode(),
]);


forgetPasswordRoute.post('/verifycode', [
    new security.ForgetPasswordVerifyCodeSecurity().checkPoint(),
    forgetPasswordController.verifyCode(),
]);


forgetPasswordRoute.post('/resetpassword', [
    new security.ForgetPasswordResetPasswordSecurity().checkPoint(),
    forgetPasswordController.resetPassword(),
]);