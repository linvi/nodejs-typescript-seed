var requirejs = require('requirejs');

if (typeof define !== 'function') { 
  var define = require('amdefine')(module) 
}

// requirejs('./bin/app.js', function(app) {
//   console.log('loaded!');
//   console.log('app');
// });

var a = requirejs('./server.js');
var app = requirejs('server');

console.log('a = ');
console.log(app);

console.log('salut');