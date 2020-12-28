'use strict'

const repl = require('repl');
const core = require('./core');
const serv = require('./server');
const replServ = repl.start('.> ');
replServ.context.core = core;
replServ.context.dot = require('./dot');
replServ.context.chartServer = serv.createServer();
replServ.context.chartMap = serv.chartMap;
replServ.context.clip = require('clipboardy');

replServ.context.reloaddot = function () {
    replServ.context.dot = core.rereq('./dot');
}
replServ.context.reloadcore = function() {
    replServ.context.core.rereq('./core');
}