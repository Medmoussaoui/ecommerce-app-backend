import { NextFunction, Request, Response } from "express";
import { SecurityGatewayValidator } from "../../core/class/securityGatewayValiedate";
import { AppResponce } from "../../core/constant/appResponce";
import { isEmailExist } from "../../core/utils/check_email_exist";
import { bcryptHash } from "../../core/utils/encryption";
import { simpleValidation } from "../../core/utils/simple_validation";
import { UsersModule } from "../../module/users.module";

export class SignUpSecurity extends SecurityGatewayValidator {


    validateData(data: any): boolean {
        const { user_first_name, user_last_name, user_email, user_password } = data;
        const validFirstName = simpleValidation({ max: 20, min: 4, value: { user_first_name } });
        if (validFirstName != true) return false;

        const validLastName = simpleValidation({ max: 20, min: 4, value: { user_last_name } });
        if (validLastName != true) return false;

        const validEmail = simpleValidation({ max: 40, min: 4, value: { user_email } });
        if (validEmail != true) return false;

        const validPassword = simpleValidation({ max: 20, min: 4, value: { user_password } });
        if (validPassword != true) return false;
        return true;
    }

    rateLimiterFailerCount() {
        /* Implement Later */
    }

    checkPoint() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const isValidData = this.validateData(req.body);
            if (isValidData == false) {
                this.rateLimiterFailerCount();
                return res.status(400).send("Bad Request body");
            }

            const emailExist = await isEmailExist(req.body.user_email);
            if (emailExist.success == false) {
                return AppResponce.serverFailure(res);
            }

            if (emailExist.data[0] != undefined) {
                this.rateLimiterFailerCount();
                return res.status(400).send('Email is Aready taken try with other email');
            }
            req.body.user_password = await bcryptHash(req.body.user_password);
            next();
        }
    }
}