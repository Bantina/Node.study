/*用于定义 服务 内容*/

const http = require('http');
const url = require('url');

function start(route,handle){
    function onRequest(request,response){
        let pathname = url.parse(request.url).pathname; //解析请求地址；
        let content = route(handle,pathname);

        //route(handle,pathname,response);

        let postData="";

        switch (request.method){
            case 'GET':
                postData += url.parse(request.url).query;
                request.setEncoding('utf8');
                route(handle,pathname,response);
                console.log('GET');
                break;

            case 'POST':
                request.addListener('data',function (postDateChunk) {
                    postData += postDateChunk;
                });
                request.addListener('end',function () {
                    route(handle,pathname,response);
                });
                console.log('POST');
                break;
        }

        //console.log("Request received..."); //访问一次打印两次的原因：访问loacalhost:4000时，试读取localhost:40000/favicon.ico
        // response.writeHead(200, {"Content-Type":"text/plain"});
        // response.write(content);
        // response.end(); //结束响应；不调用时客户端将一直处于等待状态；
    }

    http.createServer(onRequest).listen(4002);
    console.log("server 4002 success.")
}
// 先打印 server success.
// 当客户端访问页面时，才调用onRequst回调函数
exports.start = start;