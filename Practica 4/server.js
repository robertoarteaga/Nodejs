const http = require("http");
const url = require("url");
const fs = require('fs'); //librería para acceder a los archivos 
const rutas = require('./rutas.json');


http.createServer(function(req, res){
  const url_parts = url.parse(req.url, true);
  // console.log(url_parts.query.var);
  // console.log(url_parts.query.foo);
  // console.log(url_parts.query.var);
  rutas.ruta56 = {
      "nombre":56,
      "puntoPartida": "Cerro de las campanas",
      "puntoLlegada": "Santa María",
      "activo": true,
      "pasajeros":["Juan", "Pedro", "Marco"]
  };
  fs.writeFile("./rutas.json",
  JSON.stringify(rutas), 
  function(error){
    if(error) console.log("Hay un error")
  });
  res.write(JSON.stringify(rutas));
  res.end();
})
  .listen(3000);
console.log("Servidor corriendo");
