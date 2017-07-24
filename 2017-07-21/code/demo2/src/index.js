/*用于加载全局配置*/

const server = require('./server');
const router = require('./router');
const requestHandlers = require('./requestHandlers');


//相当于路由对象定义；
var handle={}
handle['/']=requestHandlers.start;
handle['/index']=requestHandlers.index;
handle['/edit']=requestHandlers.edit;

server.start(router.route,handle);