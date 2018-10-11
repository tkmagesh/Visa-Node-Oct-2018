var chalk = require('chalk');
module.exports = function(req, res, next){
	var startTime = new Date();
	res.on('finish', function(){
		var endTime = new Date(),
			elapsedTime = endTime - startTime;
		var logMessage = chalk.red(req.method) + '\t' + chalk.green(req.urlObj.pathname) + '\t' + res.statusCode + ' ' + chalk.inverse(elapsedTime + ':ms');
		console.log(logMessage);
	});
	next();
}