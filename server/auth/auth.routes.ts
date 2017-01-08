import { Auth } from './auth';
import { AuthController } from './auth.controller';
import * as express from "express";

const app = express();
const _controller = new AuthController();

app.post("/auth/authenticate", _controller.authenticate);
app.get("/auth/verify", Auth.AuthenticationRequired, _controller.verify);
app.post("/auth/invalidate", Auth.AuthenticationRequired, _controller.invalidate);

export const AuthRoutes: express.Router = app;