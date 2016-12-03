import * as express from "express";

export class UserController {
    select(req: express.Request, res: express.Response): void {
        const id: string = req.query.id;

        res.send({
            id: id,
            username: 'linvi'
        });
    }
}