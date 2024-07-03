import { NextFunction, Request, Response } from "express";
import { SecurityGatewayValidator } from "../../../core/class/securityGatewayValiedate";
import { AppResponce } from "../../../core/constant/appResponce";
import { isEmailExist } from "../../../core/utils/check_email_exist";

export class ForgetPasswordResetPasswordSecurity extends SecurityGatewayValidator {

    validateData(data: any): boolean {
        return true;
    }

    checkPoint() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const validData = this.validateData(req.body);
            if (validData == false) {
                return res.status(400).send('bad request body');
            }

            const emailExist = await isEmailExist(req.body.user_email);
            if (emailExist.success == false) {
                return AppResponce.serverFailure(res);
            }

            if (emailExist.data[0] == undefined) {
                return res.status(401).send("authentication faild");
            }
            next();
        }
    }
}