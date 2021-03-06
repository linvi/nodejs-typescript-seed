import * as express from 'express';
import path = require('path');

export class HtmlServer {
    public static app = express();

    public static start(app: express.Express, port: number, start: boolean) {
        const serverDirectory = path.resolve();
        const fileLocation = 'client/app';
        const websitePath = path.resolve(serverDirectory, `${fileLocation}`);
        const websiteDebugPath = path.resolve(serverDirectory, `../`);

        app.use(express.static(websitePath));
        app.use(express.static(websiteDebugPath));

        if (start) {
            app.listen(port, function () {
                console.log(`WEB  SERVER started on port ${port}! Serving (${websitePath})`);
            });
        } else {
            console.log(`WEB  SERVER started on port ${port}! Serving (${websitePath})`);
        }
    }
}