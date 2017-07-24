function route(handle,pathname,response){
    console.log('in router'+pathname);
    if (typeof  handle[pathname] === 'function'){
        handle[pathname](response);

    }else{
        console.log('not request handler for '+pathname);
        response.writeHead(404,{'Content-Type':'text/plain'});
        response.write('404');
        response.end();
    }
}
exports.route = route;