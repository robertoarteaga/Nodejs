const http = require("http");
const url = require("url");
const fs = require("fs"); //librería para acceder a los archivos
const rutas = require("./rutas.json");

http
  .createServer(function(req, res) {
    const url_parts = url.parse(req.url, true);
    console.log(url_parts.query.var);
    var nuevaRuta = parseInt(url_parts.query.var);
    var a = JSON.stringify({ nombre: "121" });
    if (a == nuevaRuta) {
      // res.write(JSON.stringify(rutas.ruta121));
      console.log("Es la 121");
    }
    res.end();
  })
  .listen(3000);
console.log("Servidor corriendo");
