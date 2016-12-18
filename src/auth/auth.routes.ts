import { Auth } from './auth';
import { AuthController } from './auth.controller';
import * as express from "express";

const _router = express.Router();
const _controller = new AuthController();

_router.post("/auth/authenticate", _controller.authenticate);
_router.get("/auth/verify", Auth.AuthenticationRequired, _controller.verify);

export const AuthRoutes: express.Router = _router;