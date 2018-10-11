var http = require('http');
	
var dataParser = require('./dataParser'),	
	serveStatic = require('./serveStatic'),
	serveCalculator = require('./serveCalculator'),
	notFoundHandler = require('./notFoundHandler');

var server = http.createServer(function(req /*Readable Stream*/, res /* Writable Stream*/){
	console.log(req.method + '\t' + req.url);
	dataParser(req);
	serveStatic(req, res);
	serveCalculator(req, res);
	notFoundHandler(res);
});

server.listen(8080);

console.log('server listening on 8080..');