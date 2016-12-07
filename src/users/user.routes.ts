import { Auth } from '../auth';
import * as express from "express";
import { UserController } from "./user.controller";

const _router = express.Router();
const _controller = new UserController();

_router.get("/user/select?:id", _controller.select);
_router.post("/user/create", _controller.create);
_router.post('/user/update?:id', Auth.AuthenticationRequired, _controller.update);
_router.post('/user/delete?:id', Auth.AuthenticationRequired, _controller.delete);
_router.get("/user_secured", Auth.AuthenticationRequired, _controller.select);

export const UserRoutes: express.Router = _router;