import { NextFunction, Request, Response } from "express";
import { SecurityGatewayValidator } from "../../../core/class/securityGatewayValiedate";
import { AppResponce } from "../../../core/constant/appResponce";
import { UsersModule } from "../../../module/users.module";

export class ForgetPasswordSendOTPSecurity extends SecurityGatewayValidator {

    validateData(data: any): boolean {
        return true;
    }

    checkPoint() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const ValidData = this.validateData(req.body);
            if (ValidData == false) {
                return res.status(400).send("Bad request body");
            }

            const user = await UsersModule.selectByEmail(req.body.user_email);
            if (user.success == false) {
                return AppResponce.serverFailure(res);
            }

            if (user.data[0] == undefined) {
                return res.status(400).send("this email address not exists");
            }

            const isAppoved = user.data[0].user_approved == 1;
            if (isAppoved) {
                return next();
            }
            res.status(403).send("You can't change password after account not approved");
        }
    }
}