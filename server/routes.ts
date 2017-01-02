import * as express from 'express';
import { AuthRoutes } from './auth/auth.routes';
import { UserRoutes } from './users/user.routes';

const app = express();

app.use("/", AuthRoutes)
app.use("/", UserRoutes);

app.get('/salut', function (req, res) {
    console.log('salut');
    res.send('gg2');
});


export var RestRoutes: any = app;