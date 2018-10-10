var fs = require('fs');

fs.readFile('./sample1.txt', 'utf8', function(err, fileContents){
	if (err){
		console.log(err);
		return;
	}
	console.log(fileContents);	
	console.log('Thats all folks!!');
});
