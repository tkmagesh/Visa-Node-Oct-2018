var fs = require('fs'),
	path = require('path'); 


var dbFile = path.join(__dirname, 'tasks.json');

module.exports = {
	getData(){
		var rawData = fs.readFileSync(dbFile, 'utf8');
		return JSON.parse(rawData);
	},
	saveData(taskList){
		var rawData = JSON.stringify(taskList);
		return fs.writeFileSync(dbFile, rawData);
	}
}