var http = require("http");

//Solicitud re, Respuesta res 
var manejador = fuction(re, res){
	console.log("Hola Mundo");
	re.end();
}

var server = http:createServer(manejador);


server.listen(3000);