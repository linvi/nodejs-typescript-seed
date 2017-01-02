/// <reference path="../typings/index.d.ts" />

import * as express from 'express';
import { RestServer } from './server.rest';
import { HtmlServer } from './server.html';

let restPort: number = 3000;
let websitePort: number = 3000;
let restPrefix: string = '/api/';

(function initParams() {
    process.argv.forEach(arg => {
        const getParamsInfo = /-{1,2}([a-zA-Z\-]+):([a-zA-Z0-9]+)/g;
        const result = getParamsInfo.exec(arg);

        if (result) {
            switch (result[1]) {
                case 'p':
                case 'port':
                    restPort = Number(result[2]);
                    websitePort = Number(result[2]);
                    break;
                case 'port-rest':
                    restPort = Number(result[2]);
                    break;
                case 'port-web':
                    websitePort = Number(result[2]);
                    break;
                case 'restPrefix':
                    restPrefix = result[2];
                    break;
            }
        }
    });
})();

const restServer = express();
RestServer.start(restServer, restPort, restPrefix);

if (websitePort === restPort) {
    HtmlServer.start(restServer, restPort, false);
} else {
    const htmlServer = express();
    HtmlServer.start(htmlServer, websitePort, true);
}
