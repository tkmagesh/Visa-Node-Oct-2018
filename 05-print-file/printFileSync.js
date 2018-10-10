var fs = require('fs');

var fileContents = fs.readFileSync('./sample.txt', 'utf8');

console.log(fileContents);

console.log('Thats all folks!!');