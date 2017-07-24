/* 测试全局对象 process*/

//process.argv
//console.log(process.argv); //打印结果 数组[node,filename,运行参数]

//process.stdout 标准输出流
/*console.log=function (msg) {
    process.stdout.write(msg)
}
console.log('jfdksal\n');*/

//process.stdin 标准输入流
//process.stdin.resume() 恢复流
/*process.stdin.on('readable',function () {
    process.stdout.write('plz input:');
    var data = process.stdin.read();
    if(data != null){
        process.stdout.write(data);
    }
});
process.stdin.on('end',function () {
    process.stdout.write('fds end');
})*/

//process.stderr 标准错误流
//process.cwd() 当前文件的绝对路径
//__dirname 通过node只从的js文件所在的绝对路径
//process.on('exit',function(){})当程序退出时的触发
//process.on('SIGINT'function(){}(当退出程序的时候触发)
process.stdin.on('readable',function () {
    process.stdout.write('input the info then exit to exam the exit status:');

    var data = process.stdin.read();
    if(data != null){
        process.stdout.write(data);
    }
})
process.stdin.on('end',function () {
    process.stdout.write('is end')
})
process.on('exit',function () {
    console.log('----> process will exit')
})
process.on('SIGINT',()=>{
    console.log('-->program will esit')
    process.exit();
})













