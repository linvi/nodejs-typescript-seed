import { Auth } from './../auth/auth';
import * as express from "express";
import { UserController } from "./../controllers/userController";

const _router = express.Router();
const _controller = new UserController();

_router.get("/user", _controller.select);
_router.get("/user_secured", Auth.AuthenticationRequired, _controller.select);

export const UserRoutes: express.Router = _router;