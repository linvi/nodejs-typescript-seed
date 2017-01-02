import { Auth } from './../auth/auth';
import * as express from "express";
import { UserController } from "./user.controller";

const _router = express();
const _controller = new UserController();

_router.post('/user/plop', function(req, res) {
    const user = req.body;
    console.log('plop', user);
    res.json(user);
})

_router.get('/user/select?:id', _controller.select);
_router.post("/user/create", _controller.create);
_router.post('/user/update?:id', Auth.AuthenticationRequired, _controller.update);
_router.post('/user/delete?:id', Auth.AuthenticationRequired, _controller.delete);

export const UserRoutes: express.Router = _router;