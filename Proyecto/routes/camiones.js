const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconn = require('../config/database.js');

//https://api.rutas.com/camiones
router.get("/ver", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = "SELECT * FROM camiones;";
    db.query(query, (err, result, fields) =>{
        if(err){
            console.log(err);
            res.status(500);
            res.json({code: 0, message: "Algo salió mal"});
        }
        console.log(result);
        res.status(200);
        res.json({code: 1, message: result});
        db.end((err) => {console.log("closed")});
    })
});

//https://api.rutas.com//id
router.get("/:id", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = `SELECT * FROM camiones WHERE idCamion=${req.params.id}`;
    db.query(query, (err, result, fields) => {
        if(err){
            console.log(err);
            res.status(500);
            res.json({code: 0, message: "Algo salió mal"});
        }
        res.status(200);
        res.json({code: 1, message: result});
        db.end((err) => {console.log("closed")});
    })

});

// REGISTRO POR POST DE CAMIONES ******************************************
router.post("/registro", (req, res, next) =>{
        const db = mysql.createConnection(dbconn);
        const query = `INSERT INTO camiones (idConductor, camRuta, camOrigen, camDestino, camPlaca) VALUES ('${req.body.conductor}','${req.body.ruta}','${req.body.origen}','${req.body.destino}','${req.body.placa}');`;
        console.log(query);
        if(!req.body.conductor || !req.body.ruta || !req.body.origen || !req.body.destino || !req.body.placa){
            return res.json({
                status : 0,
                msg : 'Faltan datos',
                data : [] 
            });
        }else{
            db.query(query, (err, result, fields) => {
                if(err){
                    console.log(err);
                    res.status(500);
                    res.json({code: 0, message: "Algo salió mal"});
                
                }
                res.status(200);
                res.json({code: 0, message: "Camión agregado exitosamente "});
                db.end((err) => {console.log("closed")});
            })
        }
});

// ACTUALIZAR CAMIONES POR POST ******************************************
router.post("/actualizar", (req, res, next) =>{
    const db = mysql.createConnection(dbconn); 
    const query = `UPDATE camiones SET idConductor = '${req.body.conductor}', camRuta = '${req.body.ruta}', camOrigen = '${req.body.origen}', camDestino = '${req.body.destino}', camPlaca = '${req.body.placa}' WHERE idCamion = '${req.body.id}';`;
    console.log(query);
    if(!req.body.id || !req.body.conductor || !req.body.ruta || !req.body.origen || !req.body.destino || !req.body.placa){
        return res.json({
            status : 0,
            msg : 'Faltan datos',
            data : [] 
        });
    }else{
        db.query(query, (err, result, fields) => {
            if(err){
                console.log(err);
                res.status(500);
                res.json({code: 0, message: "Algo salió mal"});
            
            }
            res.status(200);
            res.json({code: 0, message: "Camión actualizado exitosamente "});
            db.end((err) => {console.log("closed")});
        })
    }
});

// ELIMINAR CAMION POR POST ******************************************
router.post("/eliminar", (req, res, next) =>{
    const db = mysql.createConnection(dbconn);
    if(!req.body.id){
        return res.json({
            // Bad Request
            status : 400, 
            msg : 'Se requiere un ID válido.',
            data : []
        });
    }else{
    const query = `DELETE FROM camiones WHERE idCamion = '${req.body.id}';`;
    console.log(query);
    db.query(query, (err, result, fields) => {
        if(err){
            console.log(err);
            // Internal Server Error
            res.status(500);
            res.json({code: 0, message: "Algo salió mal"});
           
        }
        // 200 OK y 201 Ok por post
        res.status(201);
        res.json({code: 1, message: "Camión eliminado correctamente"});
        db.end((err) => {console.log("closed")});
    })
    }
});


module.exports = router;