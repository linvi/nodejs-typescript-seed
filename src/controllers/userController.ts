import * as express from "express";

export class UserController {
    select(req: express.Request, res: express.Response): void {
        res.send({
            username: 'linvi'
        });
    }
}