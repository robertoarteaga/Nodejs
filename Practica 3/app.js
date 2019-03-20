const http = require("http");
const url = require("url");
var uno;
var dos;
http.createServer(function(req, res) {
    const url_parts = url.parse(req.url, true);
    console.log(url_parts.query.var);
    console.log(url_parts.query.foo);
    uno = parseInt(url_parts.query.var);
    dos = parseInt(url_parts.query.foo);
    console.log(uno);
    console.log(dos);

   

    
    if (uno != 0 && dos != 0) {
        var obj = {
            "suma":(uno+dos),
            "resta":(uno-dos),
            "multiplicación":(uno*dos),
            "división":(uno/dos)
        }

        res.write(" Suma "+(uno+dos));
        res.write(" Resta " +(uno-dos));
        res.write(" Multiplicación "+(uno*dos));
    res.write(" División "+(uno/dos)+"\n");
        res.write(JSON.stringify(obj));
        res.end();
    }else{
        var obj = {
            "suma":(uno+dos),
            "resta":(uno-dos),
            "multiplicación":(uno*dos),
            "división":"Algo anda mal!"
        }
        res.write(" Suma "+(uno+dos));
        res.write(" Resta " +(uno-dos));
        res.write(" Multiplicación "+(uno*dos));
        res.write(" División "+" Algo anda mal!"+"\n");
        res.write(JSON.stringify(obj));
        res.end();
    }
    

    if (req.url == "/camion") {
      res.write("121");
      console.log(req.url);
      res.end();
    }

    if (req.url == "/empanada") {
      res.write("Troyana");
      res.end();
    }
  })
  .listen(3000);

console.log("Servidor corriendo");
