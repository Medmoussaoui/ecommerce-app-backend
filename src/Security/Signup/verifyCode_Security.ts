import { NextFunction, Request, Response } from "express";
import { SecurityGatewayValidator } from "../../core/class/securityGatewayValiedate";
import { AppResponce } from "../../core/constant/appResponce";
import { UsersModule } from "../../module/users.module";

export class SignupVerifyCodeSecurity extends SecurityGatewayValidator {

    static limiter = "Limiter";

    validateData(data: any): boolean {
        return true;
    }

    checkPoint() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const isValidData = this.validateData(req.body);
            if (isValidData == false) {
                return res.status(400).send('Access denied');
            }

            const select = await UsersModule.selectByEmail(req.body.user_email);
            if (select.success == false) {
                return res.status(500).send(AppResponce.serverFailure);
            }

            if (select.data[0] == undefined) {
                return res.status(400).send('Please do not play with us this email not find');
            }

            const isAppoved = select.data[0].user_approved == 1;
            if (isAppoved) {
                return res.status(403).send('Access denied');
            }

            res.locals.user_verifycode = select.data[0].user_verifycode;
            next();
        }
    }

}