const http = require('http');
const url = require('url');

// function petitionHandler(req, res){
//     res.write("¡Hola!");
//     res.end();
// }

http.createServer(function (req,res){
    

    if(req.url == '/camion'){
        res.write("121");
        console.log(req.method);
        const url_parts = url.parse(req.url, true);
        console.log(url_parts, query.var);
        console.log(url_parts, query.foo);
        console.log(req.url)
        res.end();
    }

    if(req.url == '/empanada'){
        res.write("Troyana");
        res.end();
    }

}).listen(3000);

console.log("Servidor corriendo");