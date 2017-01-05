# nodejs-typescript
A lightweight node application with 2 servers for the FrontEnd and Backend.

## Features :

* Typescript 
* NodeJs and Express
* JWT Authentication
* AMD/CommonJS
* MongoDB and Mongoose
* HTML Client server
* CRUD operations example with Mongoose
* Sourcemaps
* Cross domain request supported (CORS)

* Gulp
* Typings
* BrowserSync for SCSS
* Automatic Build + Release
* Visual Studio Code Debug 
* [Visual Studio Code RestClient](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

## Coming features
* Dependency Inversion (IoC) : http://inversify.io

## Install and Run

1. run `npm install`
2. run `gulp start` (you can add -port:4242 to start the server on a specific port)

## Debug with VSCode

1. run `gulp build:dev`
2. start `DEBUG: gulp build:dev` in VSCode Debug tab (ctrl + shift + D)

## Build and Run with CommonJS
CommonJS provide a simple require output with multiple js files and their associated source maps.

1. run `gulp start:dev`

OR

1. run `gulp build:dev`
2. run `node .bin/server.js`

## Build and Run with AMD
AMD concatenates your entire app into a single file (`server.js`).

1. run `gulp start:release`

OR

1. run `gulp build:release`
2. run `node .bin/app.js`

## Options

* `-port` to specify a unique port for both the REST and CLIENT servers.
* `-port-rest:3000` to specify the port used by the REST Server.
* `-port-web:3000` to specify the port used by the CLIENT Server.

## Configure Authentication

When you first use the project, a http request is considered as a request with an authenticated user if headers contain a `Authorization` with the value `Bearer authenticated`.
To add your custom authentication logic you can simply modify the `auth.ts` `verifyBearerToken` to implement your own authentication mechanism.
