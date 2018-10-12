var fs = require('fs'),
	path = require('path'); 


var dbFile = path.join(__dirname, 'tasks.json');
/*
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
}*/

//using util.promisify
/*var util = require('util'),
	readFile = util.promisify(fs.readFile),
	writeFile = util.promisify(fs.writeFile);

module.exports = {
	getData(){
		return readFile(dbFile, 'utf8')
			.then(function(rawData){
				return JSON.parse(rawData);
			});
	},
	saveData(taskList){
		var rawData = JSON.stringify(taskList);
		return writeFile(dbFile, rawData);
	}
}*/

//using bluebird
var bluebird = require('bluebird');

bluebird.promisifyAll(fs);

module.exports = {
	getData(){
		return fs.readFileAsync(dbFile, 'utf8')
			.then(function(rawData){
				return JSON.parse(rawData);
			});
	},
	saveData(taskList){
		var rawData = JSON.stringify(taskList);
		return fs.writeFileAsync(dbFile, rawData);
	}
}
