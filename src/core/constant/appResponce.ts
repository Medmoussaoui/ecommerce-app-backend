import { Response } from "express"

export class AppResponce {
    static serverFailure = (res: Response) => {
        return res.status(500).send("sorry, the server has problem to process this request now please try again later");
    }
}