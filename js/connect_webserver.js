/**
 * Created by adyhasch on 1/16/15.
 */
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic("/Documents/Code/TODO-JS-BS")).listen(8080);