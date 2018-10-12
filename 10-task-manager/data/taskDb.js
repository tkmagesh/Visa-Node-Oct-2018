var fs = require('fs'),
	path = require('path'); 


var dbFile = path.join(__dirname, 'tasks.json');

module.exports = {
	getData(callback){
		fs.readFile(dbFile, 'utf8', function(err, rawData){
			if (err){
				callback(err);
			} else {
				callback(null, JSON.parse(rawData));
			}
		});
		
	},
	saveData(taskList,callback){
		var rawData = JSON.stringify(taskList);
		fs.writeFile(dbFile, rawData, callback);
	}
}