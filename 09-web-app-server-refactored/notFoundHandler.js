
module.exports = function(res){
	console.log('[@notFoundHandler] unknown request - serving 404');
	res.statusCode = 404;
	res.end();
};