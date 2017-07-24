/*
* 创建一个表单提交
* 测试提交时的路由转换及数据获取
* 以及404处理
* */
const fs = require('fs');
const http = require('http');
const qs = require('querystring');

http.createServer(function (req,res) {
    if('/' == req.url){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end([
            '<form method="POST" action="/url">'
            ,'<h1>my form</h1>'
            ,'<fieldset>'
            ,'<label> personal info</label>'
            ,'<p> what is ur name?</p>'
            ,'<input type="text" name="name"/>'
            ,'<p><button>submit</button></p>'
            ,'</form>'
        ].join(''));
    }else if('/url' == req.url && 'POST' == req.method){
        let body = '';
        req.on('data',function (chunk) {
            body += chunk; //数据分块收集
            console.log(chunk) //chunk = <Buffer 6e 61 6d 65 3d 66 64>
        });
        req.on('end',function () {
            res.writeHead(200,{'Content-Type':'text/html'});
            // res.end('<p>content-type: '+req.headers['content-type']+'</p>'+'<p>data:'+body+'</p>'); //请求头信息及请求数据
            res.end('<p>ur name is <b>'+ qs.parse(body).name +'</b> </p>');

        })
    }else{
        res.writeHead(404);
        res.end('not found');
    }

}).listen(3000);