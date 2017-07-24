/*测试readableStream*/

const fs = require('fs');

let red = fs.createReadStream('client.js',{
    encoding: 'utf8',
    autoClose: true,
});
red.on('open',function (fd) {
    console.log('file was opened'+fd)
});

red.on('readable',function () {
    console.log('received readable');
})

red.on('data',function (chunk) {
    console.log('read %d bytes: %s',chunk.length,chunk);
})

red.on('end',function () {
    console.log('read end')
});

red.on('close',function () {
    console.log('file was closed')
})

red.on('error',function (err) {
    console.log('err occured %s',err.message);
})