import express = require('express');

export class RestServer {
    public static start(port?: number) {
        const app = express();

        if (port == null) {
            port = 3000;
        }

        app.get('/', function(req, res) {
            console.log('request executed!');
            res.send('plop2');
        });

        app.listen(port, function () {
            console.log('Express server started on port ' + port + '!')
        });
    }
}