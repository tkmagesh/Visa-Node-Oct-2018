var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url');

var server = http.createServer(function(req /*Readable Stream*/, res /* Writable Stream*/){
	console.log(req.url);
	var urlObj = url.parse(req.url);
	var resourceFullName = path.join(__dirname, urlObj.pathname);
	if (!fs.existsSync(resourceFullName)){
		res.statusCode = 404;
		res.end();
		return;
	}
	var stream = fs.createReadStream(resourceFullName);
	stream.pipe(res);
});

server.listen(8080);

console.log('server listening on 8080..');