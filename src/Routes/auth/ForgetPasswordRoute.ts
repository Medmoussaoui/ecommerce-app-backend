import express from 'express';
import { ForgetPasswordController } from '../../controller/signIn/ForgetPasswordController';
import * as security from '../../Security/ForgetPassword/index';


export const forgetPasswordRoute = express.Router();
const forgetPasswordController = new ForgetPasswordController();

// === Routes === //

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