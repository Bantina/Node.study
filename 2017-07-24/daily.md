# 学习内容

#### 回顾 阻塞与非阻塞
在php中函数的调用是阻塞的，前一个函数未执行完，后一个会被阻塞，不能执行；

在node中采用的是事件轮询的机制，函数调用是非阻塞的；

事件轮询的本质：Node先注册事件，随后不停的询问内核这些事件是否已经分发；<br/>
当事件分发时，对应的回调函数被触发，然后继续执行下去；<br/>
若果没有事件触发，则继续执行其他代码，直到有新事件时，再去执行对应的回调函数.

#### Node的单线程
单线程是指，当一个函数在执行时，同一时间不可能有第二个函数也在执行，经典例子：
 ```javascript
var start = Date.now();

setTimeout(function(){
    console.log(Date.now() - start);
    for(var i = 0; i < 10000000000; i++){}
}, 1000);

setTimeout(function(){
    console.log(Date.now() - start);
},1500);

// 1013
//12129 //结果可能有偏差

 ```
 结果分析：当第一个事件分发时，执行回调函数，执行时间过长，所以下一个事件轮询执行的时间就远远超过了500ms。

#### TCP传输控制协议
- 传输层协议
- 面向连接：<br/>
node写TCP服务，只需要考虑连接以及往套接字中写数据即可。接收方会按序接收到传输的信息，发生网络错误时，连接会失效或者终止。
- 面向字节：<br/>
对字符及字符编码不知。不同编码会导致传输字节数不同。ASCII字符(每个字符一个字节)，Unicode(每个字符四个字节)
- 可靠性：<br/>
当数据发送后，发送方会等待一个确认消息，如果过了指定的窗口时间，还未收到确认消息，发送方就会对数据进行重发。有效解决了如网络错误或网络阻塞的不可预测的情况。
- 流控制：<br/>
若有两台互相通信的计算机，有一台速度远快于另一台，TCP会通过一种叫做流控制的方式来确保两点之间传输数据的平衡。
- 拥堵控制：   <br/>
通过控制数据包的传输速率来避免拥堵的情况。<br/>


#### HTTP超文本传输协议
- 无状态 
	对于事务处理没有记忆能力，不记录客户端信息，请求之间没有对应关系，cookie维护了状态
- request 结构的3部分
1. request line
2. request header
```
	Cache
		If-Modified-Since:Thu,09 Feb 2027 )9:07:54 GMT[浏览器缓存也的最后修改时间发送到服务器，服务器和实际文件的最后修改时间进行对比，一致返回304，不一致返回200和新的文件内容]
		If-None-Match:"03043842bfcc:0"[和ETag(response中)一起工作。再次请求该资源时，服务器验证资源request的其值和response的ETag值是否一致，返回304，否则返回200和新文件。]
		Pragma:no-cache [防止页面被缓存，只有一个状态]
		Cache-Control:Public [定义缓存机制,public:可被任何缓存所缓存，private:只缓存到私有缓存中，no-cache都不会被缓存]
	Client
		Accept:text/html[媒体类型]
		Accept-Encoding:gzip,deflate[编码方式，压缩方式]
		Accept-Language:en-us[语言]
		User-Agent:Mozilla/4.0(...)[操作系统和浏览器信息]
		Accept-Charset:utf-8[字符集]
	Cookie
	Entity
		Content-Length:38[发送给http服务器数据的长度]
		Content-Type:application/x-www-form-urlencoded
	Miscellaneous
		Referer:http://translate.googlt.cn/?hl=zh-cn[request上下文信息的服务器]
	Transport
		Connection:keep-alive [客户端和服务器之间用于疮书http数据的tcp连接会不会关闭，重建tcp连接]／close
```
3. request body[当使用GET方法请求时，body是空的]


- response 结构的3部分
1. response line[状态行]
HTTP/1.1 200 OK[版本号、状态码、状态描述]
2. response header[响应头]
```
	Cache
		Date:Sat,11 Feb 2017 23:34:43 GMT[生成消息的时间和日期]
		Expires:Sun,12 Feb 2017 23:34:43 GMT[指定过期时间内使用本地缓存]
		Vary:Accept-Encoding
	Cookie
		P3P:CP=CURa ADMa DEVa PSAo PSDo OUR BUS UNI PUR INT DEM STA PRE COM NAV OTC NOI DSP COR[跨域设置coolie,解决iframe跨于访问Cookie的问题]
		Set-Coolie:sc=4c31523a; path=/; domain=.acookie.taobao.com[爸cookie发送到客户端浏览器，每写入一个Cookie生成一条它]
	Entity
		Etag:"03043842bfcc:0" [和If-None-Match搭配使用]
		Last-Modified:Sat,11 Feb 2017 23:34:43[资源最后修改时间]
		Content-Type:text/html;charset=utf-8[告诉浏览器自己响应的类型和字符集]
		Content-Lengtn:19847[指定实体正文长度，以字节存储的十进制数字来表示]
		Content-Encoding:gzip[表明自己的压缩方式]
		Content-Language：da[告诉浏览器自己响应的对象的语言]
		Transfer-Encoding: chunked[报文分块编码]
	Miscellaneous
		Server: Microsoft-IIS/7.5[服务器的软件信息]
		X-AspNet-Version: 4.0.30319[ASP.NET开发的话的版本]
		X-Powered-By: ASP.NET[网站开发的技术]
	Transport
		Connection:keep-alive[客户端和服务器之间用于疮书http数据的tcp连接会不会关闭，重建tcp连接]／close
	Location[重定向的新地址]
3. response body[响应实体]
```
- TCP服务器和HTTP服务器实现时都调用了CreateServer方法，客户端在连入时都会执行一个回调函数。
区别在于回调函数中对象的类型：NET服务器中，回调对象是个连接(connection)对象；在http服务器中，则是请求和响应对象。


#### Node的内部工作
Node拿到浏览器发送的数据后，对其进行解析，后，构造一个javascript对象方便我们在脚本中使用。

#### Node中 流 的概念
Node中流的对接是很常见的行为<br>
eg:将一个流(文件系统)接(pipe)到另一个流(一个http.ServerResponse对象)上<br>
Node 中的Stream提供支持字节和字符读写的Readable和Writeable类，转换流的Transform类
- Readable类<br>
有两种模式：flowing和paused模式,区别->用户是否需要手动调用Readable.prototype.read(n),读取缓冲区的数据。<br>
触发flowing模式的三种方式：
1.侦听data事件；
2.readable.resume();
3.readable.pipe();<br>
触发paused模式的方式：
1.移除data事件；
2.readable.pause();
3.readable.unpipe();<br>
ReadableState对象纪录当前的读取状态

#### Node事件
const EventEmitter = require('events').EventEmitter;//node暴露EventEmitter<br/>
let a = new EventEmitter; //a 具有事件监听和分发的功能；<br/>
a.on('event',function(){ .... }) //a.on/emit/removeListener方法<br/><br/>

Node通常不会直接返回数据(因为这样可能会在等待某个资源的时候发生线程阻塞)，而是采用分发事件来传递数据，非阻塞的设计。<br/>

### 知识点汇集
1. data事件将请求数据内容进行缓冲，等到所有数据都接收完毕后end事件再对数据进行处理。
2. node在创建服务的回调函数中，<br>
	2.1 request.headers获取请求的头信息，获取请求头信息的属性eg:req.headers['content-type']<br>
	2.2 request.url获取请求的 主机名后的url地址<br>
3. node允许数据到达服务器时就可以对其进行处理，所以可以逐块接收数据，数据以不同的TCP包到达服务器，逐块接收。当end事件触发时，结束完全。
4. http模块与net模块息息相关，net模块又和底层的socket有联系，socket又涉及到了系统的内核。
5. node 的 querystring模块 用于解析和格式化url查询字符串。

