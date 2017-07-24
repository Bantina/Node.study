const exec = require('child_process').exec;
const fs = require('fs');

function index(response) {
    fs.readFile('index.html',function (error,data) {
        if(error){
            response.writeHead(404);
            response.write('read file failed');
        }else {
            response.writeHead(200, {"Content-Type":"text/html"});
            response.write(data,'utf8');
        }
        response.end()
    });
}

function start(response) {
    console.log('handler start was called');

    exec("ls -lah",function(error,stdout,stderr){
        //console.log(response);
        response.writeHead(200, {'Content-Type':'text/plain'});
        response.write(stdout);
        response.end();
    })
}
function edit(response) {
    console.log('handler upload was called');
    response.writeHead(200, {'Content-Type':'text/plain'});
    response.write('edit test');
    response.end();
}

exports.index = index;
exports.start = start;
exports.edit = edit;
