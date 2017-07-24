/*测试writableStream*/
var fs = require('fs');

var writable = fs.createWriteStream('write.txt',{
    defalstEncoding:'utf8'
});

writable.on('finish',function () {
    console.log('write finished');
    process.exit(0);
    console.log(' n  process.exit');
});

writable.on('error',function (err) {
    console.log('write error: %s',err.massage);
});

writable.write('hi,!~~~~~~~~~\n the txt from writable.js');

writable.end();