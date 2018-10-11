var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');


var staticExtns = ['.html', '.js', '.css', '.jpg', '.png', '.ico', '.xml', '.json'];

function isStatic(pathString){
	var extn = path.extname(pathString);
	return staticExtns.indexOf(extn) >= 0;
}

var server = http.createServer(function(req /*Readable Stream*/, res /* Writable Stream*/){
	console.log(req.method + '\t' + req.url);
	var urlObj = url.parse(req.url);
	//static resource
	if (isStatic(urlObj.pathname)){
		var resourceFullName = path.join(__dirname, urlObj.pathname);
		if (!fs.existsSync(resourceFullName)){
			res.statusCode = 404;
			res.end();
			return;
		}
		var stream = fs.createReadStream(resourceFullName);
		stream.pipe(res);
	} else if (urlObj.pathname === '/calculator' && req.method === 'GET'){
		var queryData = querystring.parse(urlObj.query),
			op = queryData.op,
			n1 = parseInt(queryData.n1),
			n2 = parseInt(queryData.n2),
			result = calculator[op](n1, n2);
		res.write(result.toString());
		res.end();
	} else if (urlObj.pathname === '/calculator' && req.method === 'POST'){
		var rawData = '';
		req.on('data', function(chunk){
			rawData += chunk;
		});
		req.on('end', function(){
			var bodyData = querystring.parse(rawData),
				op = bodyData.op,
				n1 = parseInt(bodyData.n1),
				n2 = parseInt(bodyData.n2),
				result = calculator[op](n1, n2);
			res.write(result.toString());
			res.end();
		});
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(8080);

console.log('server listening on 8080..');