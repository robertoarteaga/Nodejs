const express = require('express');
const router = express.Router();


const fs = require("fs"); //librería para acceder a los archivos
let routes = fs.readFileSync("./rutas.json");
routes = JSON.parse(routes);

//https://api.rutas.com/camiones
router.get("/", (req, res, next) => {
    res.send(routes);
});

//https://api.rutas.com//id
router.get("/:id", (req, res, next) => {
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
router.post("/", (req, res, next) =>{
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
module.exports = router;