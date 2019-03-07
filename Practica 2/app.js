const http = require('http');

// function petitionHandler(req, res){
//     res.write("¡Hola!");
//     res.end();
// }

http.createServer(function (req,res){
    console.log(req.url)

    if(req.url == '/camion'){
        res.write("121");
        res.end();
    }

    if(req.url == '/empanada'){
        res.write("Troyana");
        res.end();
    }

}).listen(3000);

console.log("Servidor corriendo");