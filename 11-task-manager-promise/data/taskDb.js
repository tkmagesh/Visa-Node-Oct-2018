var fs = require('fs'),
	path = require('path'); 


var dbFile = path.join(__dirname, 'tasks.json');

module.exports = {

	getData(){
		return new Promise(function(resolveFn, rejectFn){
			fs.readFile(dbFile, 'utf8', function(err, rawData){
				if (err){
					rejectFn(err);
				} else {
					resolveFn(JSON.parse(rawData));
				}
			});
		})
		
		
	},
	saveData(taskList){
		var rawData = JSON.stringify(taskList);
		return new Promise(function(resolveFn, rejectFn){
			fs.writeFile(dbFile, rawData, function(err){
				if (err){
					rejectFn(err);
				} else {
					resolveFn();
				}
			});
		});

	}
}