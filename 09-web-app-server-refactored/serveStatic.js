var path = require('path'),
	fs = require('fs');

var staticExtns = ['.html', '.js', '.css', '.jpg', '.png', '.ico', '.xml', '.json'];

function isStatic(pathString){
	var extn = path.extname(pathString);
	return staticExtns.indexOf(extn) >= 0;
}

module.exports = function(req, res, next){
	if (isStatic(req.urlObj.pathname)){
		var resourceFullName = path.join(__dirname, req.urlObj.pathname);
		if (!fs.existsSync(resourceFullName)){
			console.log('[@serveStatic] resource not found - serving 404');
			res.statusCode = 404;
			res.end();
			next();
			return;
		}
		var stream = fs.createReadStream(resourceFullName);
		//stream.pipe(res);
		stream.on('data', function(chunk){
			res.write(chunk);
		});
		stream.on('end', function(){
			res.end();
			next();
		});
		/*var fileContents = fs.readFileSync(resourceFullName);
		res.write(fileContents);
		res.end();*/
	} else {
		next();
	}
};