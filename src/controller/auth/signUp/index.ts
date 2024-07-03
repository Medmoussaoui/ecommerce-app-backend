import { Request, Response } from "express";
import { AppResponce } from "../../../core/constant/appResponce";
import { bcryptHash } from "../../../core/utils/encryption";
import { generateOtpCode } from "../../../core/utils/generate_OTP_code";
import { sendMail } from "../../../core/utils/send_mail";
import { UsersModule } from "../../../module/users.module";

export class SignUpController {

    signUp() {

        return async (req: Request, res: Response) => {
            req.body.user_password = await bcryptHash(req.body.user_password);
            const insert = await UsersModule.insert(req.body);
            if (insert.success) {
                await this.sendVerifyCode()(req, res);
                return;
            }
            AppResponce.serverFailure(res);
        }
    }

    sendVerifyCode() {
        return async (req: Request, res: Response) => {

            const otpCode = generateOtpCode();
            let insertCode = await UsersModule.setVerifyCode(req.body.user_email, otpCode);

            if (insertCode.success == false) {
                return AppResponce.serverFailure(res);
            }

            const send = await sendMail({
                to: req.body.user_email,
                subject: "Verify Email address",
                text: `Your code : ${otpCode}`,
            });

            if (send.success) {
                return res.status(200).send(send.successMessage);
            }
            AppResponce.serverFailure(res);
        }

    }

    verifyCode() {
        return async (req: Request, res: Response) => {
            if (req.body.code != res.locals.user_verifycode) {
                return res.status(400).send("Your code is not valid try again");
            }
            const approved = await UsersModule.setApprove(req.body.user_email, 1);
            if (approved.success) {
                return res.status(200).send("success verifing");
            }
            AppResponce.serverFailure(res);
        }
    }
}
