import { NextFunction, Request, Response } from "express";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const user = (req.session as { [key: string]: any })["user"];
    if (user) {
        res.locals.user = user;
        return next();
    }
    res.status(403).send('You have to bee auth');

}