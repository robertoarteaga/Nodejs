const morgan = require("morgan");
const express = require('express');
const app = express();

const fs = require("fs"); //librería para acceder a los archivos
let routes = fs.readFileSync("./rutas.json");
routes = JSON.parse(routes);

app.use(morgan('dev'));

//https://api.rutas.com/
app.get("/", (req, res, next) => {
    res.send("Bienvenidos al API de rutas");
});

//https://api.rutas.com/camiones
app.get("/camiones", (req, res, next) => {
    res.send(routes);
});

//https://api.rutas.com/camiones/id
app.get("/camiones/:id", (req, res, next) => {
    const route ="ruta"+req.params.id;
    res.send(routes[route]);
});

module.exports = app;