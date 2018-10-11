var path = require('path'),
	fs = require('fs');

var staticExtns = ['.html', '.js', '.css', '.jpg', '.png', '.ico', '.xml', '.json'];

function isStatic(pathString){
	var extn = path.extname(pathString);
	return staticExtns.indexOf(extn) >= 0;
}

module.exports = function(staticResPath){
	return function(req, res, next){
		var resourceName = req.urlObj.pathname === '/' ? 'index.html' : req.urlObj.pathname;
		if (isStatic(resourceName)){
			var resourceFullName = path.join(staticResPath, resourceName);
			if (!fs.existsSync(resourceFullName)){
				next();
				return;
			}
			var stream = fs.createReadStream(resourceFullName);
			stream.pipe(res);		
			stream.on('end', function(){
				next();
			});
		} else {
			next();
		}
	};
};