var http = require('http');

var server = http.createServer(function(req /*Readable Stream*/, res /* Writable Stream*/){
	console.log(req.url);
	res.write('<h1>Welcome to Node.js</h1>');
	res.end();
	/*
	fs.existsSync()
	res.statusCode = 404;
	res.end();
	*/
});

server.listen(8080);

console.log('server listening on 8080..');