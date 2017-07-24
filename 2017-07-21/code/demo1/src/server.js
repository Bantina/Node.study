/*用于定义 服务 内容*/

const http = require('http');
const url = require('url');
const fs = require('fs');

    function onRequest(request,response){
        let pathname = url.parse(request.url).pathname; //解析请求地址；

        switch (pathname){
            case '/':
                response.writeHead(200, {"Content-Type":"text/plain"});
                response.write('init');
                response.end(); //结束响应；不调用时客户端将一直处于等待状态；
                break;
            case '/index':
                //console.log(process.cwd());
                fs.readFile(process.cwd()+ '/code/demo1/index.html',function (error,data) {
                    if(error){
                        console.log(error);
                        response.writeHead(404);
                        response.write('read file failed');
                    }else {
                        response.writeHead(200, {"Content-Type":"text/html"});
                        response.write(data,'utf8');
                    }
                    response.end()
                });
                break;
            case '/index.css':
                fs.readFile(process.cwd()+'code/demo1/index.css',function (error,data) {
                    if(error){
                        response.writeHead(404);
                        response.write('read file failed');
                    }else {
                        response.writeHead(200, {"Content-Type":"text/css"});
                        response.write(data,'utf8');
                    }
                    response.end()
                });
                break;
            default:
                response.writeHead(404);
                response.write('Not Found 404');
                response.end();
                break;
        }

    }

    let server = http.createServer(onRequest);
        console.log(server);
        server.listen(4001);
    //http.createServer(onRequest),onRequest函数被自动添加到request;
    console.log("server 4001 success.");


// 先打印 server success.
// 当客户端访问页面时，才调用onRequst回调函数

//http.request()返回一个http.ClientRequest类的实例；