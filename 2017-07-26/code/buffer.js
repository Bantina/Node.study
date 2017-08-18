//Buffer对象在拼接过程中，可能会出项乱码。
//万能适应buffer编码的方法：连接多个Buffer对象。
var buffers = [];
var nread = 0;
readStream.on('data',function (chunk) {
    buffers.push(chunk);
    nread += chunk.length;
});
readStream.on('end',function () {
    var buffer = null;
    switch(buffers.length){
        case 0:
            buffer = new Buffer(0);
            break;
        case 1:
            buffer = buffers[0];
            break;
        default:
            buffer = new Buffer(nread);
            for(var i=0,pos=0,l=buffers.length;i<l;i++){
                var chunk = buffers[i];
                chunk.copy(buffer,pos);
                pos += chunk.length;
            }
            break;
    }
})