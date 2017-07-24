const http = require('http');
const qs = require('querystring');

/*
 * 模拟一个客户端获取响应
 * 使用http模块中的request静态方法创建一个client对象
 * process控制数据输入输出
 * 结合同目录文件jsonserver.js*/

function send(theName) {
    http.request({
        host: '127.0.0.1'
        , port: 3000
        , url: '/'
        , method: 'POST'
    },function (res) {
        res.setEncoding('utf8');
        res.on('end', function () {
            console.log('request complete ---->'+process.stdout.write('\n ur name:'));
        })
    }).end(qs.stringify({name:theName}));
}

process.stdout.write('\n ur name --');
process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on('data',function (name) {
    send(name.replace('\n',''));
});
