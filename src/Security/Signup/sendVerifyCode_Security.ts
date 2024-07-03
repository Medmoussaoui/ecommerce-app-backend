import { NextFunction, Request, Response } from 'express';
import { SecurityGatewayValidator } from '../../core/class/securityGatewayValiedate';
import { AppResponce } from '../../core/constant/appResponce';
import { UsersModule } from '../../module/users.module';


export class SignUpSendVeridyCodeSecurity extends SecurityGatewayValidator {

    validateData(data: any): boolean {
        return true;
    }

    checkPoint() {
        return async (req: Request, res: Response, next: NextFunction) => {
            const isDataValid = this.validateData(req.body);
            if (isDataValid == false) {
                return res.status(400).send('Access denied');
            }

            const select = await UsersModule.selectByEmail(req.body.user_email);
            if (select.success == false) {
                return AppResponce.serverFailure(res);
            }

            if (select.data[0] == undefined) {
                res.status(400).send('Please do not play with us this email is not find');
                return;
            }

            const isAppoved = select.data[0].user_approved == 1;
            if (isAppoved == true) {
                return res.status(403).send('Access denied');
            }
            next();
        }
    }
}


