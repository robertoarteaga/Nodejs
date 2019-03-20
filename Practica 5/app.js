const http = require("http");
const url = require("url");
const qs = require("querystring"); //Resive string en url parse JSON
const fs = require("fs"); //librería para acceder a los archivos
let rutas = fs.readFileSync("./rutas.json");
rutas = JSON.parse(rutas);
console.log(rutas);

http.createServer(function(req, res) {
    if (req.method == "POST") {
      let body = '';

      req.on('data', function(data){
        body = body + data
        // console.log(body);
      })

      req.on('end',function(){
        body = qs.parse(body);
        var nombre = "ruta" + body.camion;
        rutas[nombre] = { ...body }
        // rutas = rutas.concat(body);
        fs.writeFile(
          "./rutas.json", 
          JSON.stringify(rutas), 
          function(err) {
            if(err) console.log(error);
          });
        res.write(JSON.stringify("Ruta agregada correctamente"));
        res.write(JSON.stringify(rutas));
        res.end();
      });
      // res.write("Ruta guardada correctamente");
    } else if (req.method == "GET") {
      res.write(JSON.stringify(rutas));
      res.end();
    }
  })
  .listen(3000);
console.log("Servidor corriendo");
