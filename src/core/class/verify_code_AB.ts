import { Request, Response } from "express";

export abstract class VerifyCodeAB {

    sendVerifyCode(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    };

    verifyCode(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    };
}
