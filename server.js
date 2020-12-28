const http = require('http');

// id to graph-info (type, data and options)
exports.chartMap = new Map();

exports.createServer = function (port) {
    const server = http.createServer(function (req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.writeHead(200, {'Access-Control-Allow-Origin': "*"});
        res.write(JSON.stringify(exports.chartMap));
        res.end();
    });
    const portNumber = (port == undefined) ? 7500 : port;
    server.listen(portNumber);
    return server;
}