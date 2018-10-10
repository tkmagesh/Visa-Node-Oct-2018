var fs = require('fs');

var stream = fs.createReadStream('./sample.txt', 'utf8');

//events -> open, data, end, close, error

var readCount = 0;
stream.on('data', function(chunk){
	console.log(chunk);
	++readCount;
});

stream.on('end', function(){
	console.log('Thats all folks!!');
	console.log('ReadCount = ', readCount);
});

stream.on('error', function(err){
	console.log(err);
});