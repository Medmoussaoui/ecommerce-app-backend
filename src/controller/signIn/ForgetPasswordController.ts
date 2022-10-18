import { Request, Response } from "express"
import { AppResponce } from "../../core/constant/appResponce";
import { generateOtpCode } from "../../core/utils/generate_OTP_code";
import { sendMail } from "../../core/utils/send_mail";
import { UsersModule } from "../../module/users.module"

export class ForgetPasswordController {

    sendVerifyCode() {
        return async (req: Request, res: Response) => {
            const OTPcode = generateOtpCode();
            const set = await UsersModule.setVerifyCode(req.body.user_email, OTPcode);

            if (set.success == false) {
                return AppResponce.serverFailure(res);
            }

            const sendOtp = await sendMail({
                to: req.body.user_email,
                subject: 'Reset Password Verification code',
                text: "Your code : " + OTPcode,
            });

            if (sendOtp.success == false) {
                return AppResponce.serverFailure(res);
            }
            res.status(200).send("Check Your Email Verification code is sended");
        }
    }

    verifyCode() {
        return (req: Request, res: Response) => {
            if (req.body.code != res.locals.user_verifycode) {
                return res.status(400).send("verify code is not valid try again later");
            }
            res.status(200).send("verify email successfuly");
        }
    }

    resetPassword() {
        return async (req: Request, res: Response) => {
            const updatePassword = await UsersModule.setPassword(
                req.body.user_password,
                req.body.user_email,
            );

            if (updatePassword.success == false) {
                return AppResponce.serverFailure(res);
            }

            await sendMail({
                to: req.body.user_email,
                subject: "Password Changed",
                text: 'hi, \n Your password has been changed successfuly. \n Password : ' + req.body.user_password
            });

            res.status(200).send('Reset Password succesfuly');
        }
    }
}