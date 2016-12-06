import * as express from 'express';
import { UserRoutes } from './users/user.routes';

const app = express();
app.use("/", UserRoutes);

export var RestRoutes: any = app;