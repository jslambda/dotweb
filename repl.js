'use strict'

const repl = require('repl');
const core = require('./core');
const serv = require('./server');
const replServ = repl.start('.> ');
replServ.context.core = core;
replServ.context.wiki = require('./wiki');
replServ.context.chartServer = serv.createServer();
replServ.context.chartMap = serv.chartMap;
replServ.context.clip = require('clipboardy');

replServ.context.reloadwiki = function () {
    replServ.context.wiki = core.rereq('./wiki');
}
replServ.context.reloadcore = function() {
    replServ.context.core.rereq('./core');
}