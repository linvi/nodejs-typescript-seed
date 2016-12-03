import * as express from 'express';
import { UserRoutes } from './userRoutes';

const app = express();
app.use("/", UserRoutes);

export var RestRoutes: any = app;