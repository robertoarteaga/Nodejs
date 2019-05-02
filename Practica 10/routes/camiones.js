const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconn = require('../config/database.js');

//https://api.rutas.com/camiones
router.get("/", (req, res, next) => {
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

// POST ******************************************
router.post("/", (req, res, next) =>{
        const db = mysql.createConnection(dbconn);
        const query = `INSERT INTO camiones(nombre, puntoPartida) VALUES ('${req.body.camion}','${req.body.puntoPartida}');`;
        console.log(query);
        db.query(query, (err, result, fields) => {
            if(err){
                console.log(err);
                res.status(500);
                res.json({code: 0, message: "Algo salió mal"});
               
            }
            res.status(200);
            res.json({code: 0, message: result});
            db.end((err) => {console.log("closed")});
        })
});
module.exports = router;