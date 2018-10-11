module.exports = function(req, res, next){
	var startTime = new Date();
	res.on('finish', function(){
		var endTime = new Date(),
			elapsedTime = endTime - startTime;
		var logMessage = req.method + '\t' + req.urlObj.pathname + '\t' + res.statusCode + ' ' + elapsedTime + 'ms';
		console.log(logMessage);
	});
	next();
}