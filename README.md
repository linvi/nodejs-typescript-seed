# nodejs-typescript
## Features :

* Typescript 
* NodeJs and Express
* AMD/CommonJS
* Passport Bearer Authentication
* Sourcemaps

* Gulp
* Typings
* Automatic Build + Release
* Visual Studio Code Debug 

## Install
1. npm install

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
