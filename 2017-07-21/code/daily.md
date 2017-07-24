# 学习内容：

### 学习Node.js
#### 一、项目实践
- demo1使用node启动4001服务端口，简单的读取和输出文件；
- demo2在demo1的学习基础上，启动4002端口服务，将入口文件、路由、服务、以及客户端响应文件做了分离，实现文件的读取和输出；

#### 二、node的服务类

`const http = require('http');`

`let server = http.createServer();`

`server.listen(4001);`

使用http.createServer()创建了一个http.Server类的实例，
该类继承自net.Server类，
net.Server类用于创建TCP或IPC server.

在http.Server类中使用server.listen([port])监听端口

- 理解 node 是基于事件驱动的 异步服务器端js
- 理解服务器是如何处理请求的

在node.js中，http提供了Agent、ClienRequest、ServerResponse、Server 、IncomintMessage类；

#### 三、理解 阻塞与非阻塞
在php中函数的调用是阻塞的，前一个函数未执行完，后一个会被阻塞，不能执行；

在node中采用的是事件轮询的机制，函数调用是非阻塞的；

事件轮询的本质：Node先注册事件，随后不停的询问内核这些事件是否已经分发；<br/>
当事件分发时，对应的回调函数被触发，然后继续执行下去；<br/>
若果没有事件触发，则继续执行其他代码，直到有新事件时，再去执行对应的回调函数.

例如：
```javascript
console.log('hello');

setTimeout(function(){
    console.log('world');
},5000);

console.log('bye');

//hello
//bye
//world (从脚本加载完成开始，5s后setTimeout的回调函数被注册到事件列表中并执行)
```


##### 遇到的问题：
1. 从服务器的角度理解request对象和response对象:
    request是服务器要接收的信息；
    response是服务器要输出给客户端的信息；
2. fs.readFile(path,function(){});
    fs读取文件时，文件路径是相对于系统而言的路径，
    可以通过 process.cwd()获取到当前的项目执行路径，再拼接上相对项目的路行
3. 命令行中 pwd 获取当前所在路径；