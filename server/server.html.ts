import * as express from 'express';
import path = require('path');

export class HtmlServer {
    public static app = express();

    public static start(app: express.Express, port: number, start: boolean) {
        const fileLocation = '../client';
        const websitePath = path.resolve(__dirname, `${fileLocation}`);

        app.use(express.static(websitePath));

        if (start) {
            app.listen(port, function () {
                console.log(`WEB  SERVER started on port ${port}! Serving (${websitePath})`);
            });
        } else {
            console.log(`WEB  SERVER started on port ${port}! Serving (${websitePath})`);
        }
    }
}