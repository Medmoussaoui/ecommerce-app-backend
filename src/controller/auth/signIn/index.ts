import { Request, Response } from "express";
import { AppResponce } from "../../../core/constant/appResponce";
import { bcryptCompere } from "../../../core/utils/encryption";
import { UsersModule } from "../../../module/users.module";

export class SignInController {

    emailNotFound(res: Response): void {
        res.status(400).send("this email not find try with other email");
    }

    invalidPassword(res: Response) {
        res.status(400).send('Email or password is invalid');
    }

    generateSessionLogIn(req: Request, res: Response, user: any): void {
        /// Generate Session
        req.session.regenerate((err) => {
            if (err) {
                res.send('Session Error Happen To Regenerate session');
                return;
            }
            (req.session as { [key: string]: any })["user"] = user;
            res.status(200).send("done sign In");
        });
    }

    signIn() {
        return async (req: Request, res: Response) => {
            let select = await UsersModule.selectByEmail(req.body.user_email);
            if (select.success == false) return AppResponce.serverFailure(res);

            const user = select.data[0];
            if (user == undefined) return this.emailNotFound(res);

            const passwordCorrect = await bcryptCompere(req.body.user_password, user.user_password);
            if (passwordCorrect == false) return this.invalidPassword(res);

            /// LogIn Success 
            this.generateSessionLogIn(req, res, user);
        }
    }

}
