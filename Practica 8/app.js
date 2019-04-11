const morgan = require("morgan");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./middleware/cors');
const app = express();

const fs = require("fs"); //librería para acceder a los archivos
let routes = fs.readFileSync("./rutas.json");
routes = JSON.parse(routes);

//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors);


// GET *******************************************
//https://api.rutas.com/
app.get("/", (req, res, next) => {
    res.send("Bienvenidos al API de rutas de camión");
});

//https://api.rutas.com/camiones
app.get("/camiones", (req, res, next) => {
    res.send(routes);
});

//https://api.rutas.com/camiones/id
app.get("/camiones/:id", (req, res, next) => {
    const route ="ruta"+req.params.id;
    if(routes[route]){
        res.send(routes[route])
    } else {
        res.status(404);
        res.send("El camión no existe");
    }
    res.send(routes[route]);
});

// POST ******************************************
app.post("/camiones", (req, res, next) =>{
    const key = "ruta" + req.body.camion;
        routes[key] = { ...req.body }
        fs.writeFile("./rutas.json", 
          JSON.stringify(routes), 
          function(err) {
            if(err){
                res.status(500);
                res.send(err);
            } else {
                res.status(201);
                res.send("Camión agregado correctamente");
            }
          });
});

module.exports = app;