/*
 * 在index.html表单中输入数据并提交
 * 提交为post请求，将数据写入到submit.js中
 * 以及数据的解析
 *
 * 启动：node index.js
 * */
var http = require('http');
var fs = require('fs');
var qs = require('querystring');

var app = http.createServer(function (req,res) {
    var postData="";
    if(req.method === "GET"){
        switch(req.url){
            case "/":
                fs.readFile("index.html",function (err,data) {
                    if(err) throw err;
                    res.writeHeader(200,{'Content-Type':'text/html'});
                    res.end(data.toString());
                })
                break;
            default:
                res.writeHead(404);
                res.end('not found');
                break;

        }
    }else if (req.method === "POST"){
        switch(req.url){
            case "/submit.js":
                req.on('data',function (chunk) {
                    postData += chunk;
                })
                req.on("end",function () {
                    console.log(postData);
                    var website = qs.parse(postData);
                    res.end('postData ---> '+postData +'\n qs.parse--->server console');
                    console.log(website);
                })
                break;
            default:
                res.writeHead(404);
                res.end('not found');
                break;
        }
    }
})

app.listen(3000);