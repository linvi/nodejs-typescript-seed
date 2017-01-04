var requirejs = require('requirejs');

if (typeof define !== 'function') { 
  var define = require('amdefine')(module) 
}

var app = requirejs('server/server');