const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconn = require('../config/database.js');

router.post("/login", (req,res,next)=>{
    const db = mysql.createConnection(dbconn);
    const query = `SELECT * FROM usuarios WHERE correoElectronico = '${req.body.mail}' 
    AND password = '${req.body.password}';`;
    db.query(query,(err,result,fields)=>{
        if(err){
            console.log(err);
            res.status(500);
            res.json({code: 0, message: "Algo salió mal"});
        }
        if(result.length > 0){
            res.status(200);
            res.json({code: 1, message: "Bienvenido"});
        } else {
            // restringido
            res.status(401);
            res.json({code: 1, message: "Error en los datos"});
        }
        // Nota: No se pueden mandar dos respuestas.
        db.end((err) => {console.log("closed")});
    })
})
// POST ******************************************
router.post("/", (req, res, next) =>{
    const db = mysql.createConnection(dbconn);
    const query = `INSERT INTO usuarios(nombreUsuario, correoElectronico, password) 
    VALUES ('${req.body.nombreUsuario}','${req.body.correoElectronico}','${req.body.password}');`;
    console.log(query);
    db.query(query, (err, result, fields) => {
        if(err){
            console.log(err);
            res.status(500);
            res.json({code: 0, message: "Algo salió mal"});
           
        }
        // 200 OK y 201 Ok por post
        res.status(201);
        res.json({code: 1, message: "Usuario agregado correctamente"});
        db.end((err) => {console.log("closed")});
    })
});
module.exports = router;