import { NextFunction, Request, Response } from "express";
import { SecurityGatewayValidator } from "../../core/class/securityGatewayValiedate";

export class SignInSecurity extends SecurityGatewayValidator {
    validateData(data: any): boolean {
        return true;
    }

    checkPoint() {
        return (req: Request, res: Response, next: NextFunction) => {
            const validData = this.validateData(req.body);
            if (validData == false) {
                return res.status(400).send("Bad request");
            }
            next();
        }
    }
}