import { Request, Response } from "express";
import { AppResponce } from "../../core/constant/appResponce";
import { bcryptCompere, bcryptHash } from "../../core/utils/encryption";
import { UsersModule } from "../../module/users.module";

export class SignInController {

    async signIn(req: Request, res: Response) {
        let select = await UsersModule.selectByEmail(req.body.user_email);
        if (select.success == false) {
            res.status(500).send(AppResponce.serverFailure);
            return;
        }
        const user = select.data[0];
        if (user == undefined) {
            res.status(400).send("this email not find try with other email");
            return;
        }
        const passwordCorrect = await bcryptCompere(req.body.user_password, user.user_password);
        if (passwordCorrect == false) {
            res.status(400).send('Email or password is invalid');
            return;
        }
        /// Generate Session Token 
        /// And rate limiter middleware for failer signin count
        res.status(200).send({ "userId": user.user_id });
    }

}