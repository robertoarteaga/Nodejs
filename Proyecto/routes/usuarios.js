const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconn = require('../config/database.js');
// MIDDLEWARE DEL TOKEN
const jwt = require('jsonwebtoken');
const middleware = require('./../middleware/token');


// INICIO DE SESION 
router.post("/login", (req,res,next)=>{
    console.log('entra al login')
    const db = mysql.createConnection(dbconn);
    const query = `SELECT * FROM usuarios WHERE usuUsername = '${req.body.username}' 
    AND usuPassword = '${req.body.password}';`;
    console.log(query)
    db.query(query,(err,result,fields)=>{
        if(err){
            console.log(err);
            res.status(500);
            res.json({code: 0, message: "Algo salió mal"});
        }
        if(result.length > 0){
            process.env.JWT_KEY = 'My secret key'
            var us = result[0].usuUsername;
            var idUs = result[0].idUsuario;
            const token = jwt.sign({userId:idUs,user:us}, process.env.JWT_KEY  || 'debugkey')

            res.status(200);
            res.json({code: 1, message: "Hola", token});
            // res.status(200);
            // res.json({code: 1, message: {userId: idUs}})
        } else {
            // restringido
            res.status(401);
            res.json({code: 1, message: "Error en los datos"});
        }
        // Nota: No se pueden mandar dos respuestas.
        db.end((err) => {console.log("closed")});
        
    })
})
// PRUEBAS DE ACCESO
// router.get('/dashboard', middleware.myMiddleware,(req, res) => {
//     res.status(200).send('Acceso correcto')
// })


// REGISTRO DE USUARIOS POR POST ***********************************************
router.post("/registro", (req, res, next) =>{
    const db = mysql.createConnection(dbconn);
    if(!req.body.username || !req.body.password || !req.body.nombre || !req.body.correo){
        return res.json({
            // Bad Request
            status : 400, 
            msg : 'Revisa que los datos estén completos.',
            data : []
        });
    }else{
    const query = `INSERT INTO usuarios(usuUsername, usuPassword, usuNombre, usuCorreo) 
    VALUES ('${req.body.username}','${req.body.password}','${req.body.nombre}','${req.body.correo}');`;
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
        res.json({code: 1, message: "Usuario agregado correctamente"});
        db.end((err) => {console.log("closed")});
    })
    }
});

// ACTUALIZAR USUARIO POR POST ******************************************
router.post("/actualizar", middleware.myMiddleware, (req, res, next) =>{
    const db = mysql.createConnection(dbconn);
    if(!req.body.id){
        return res.json({
            // Bad Request
            status : 400, 
            msg : 'Se requiere un id para actualizar.',
            data : []
        });
    }else{
    const query = `UPDATE usuarios SET usuUsername = '${req.body.username}', usuPassword = '${req.body.password}', usuNombre = '${req.body.nombre}', usuCorreo = '${req.body.correo}' WHERE idUsuario = '${req.body.id}';`;
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
        res.json({code: 1, message: "Usuario actualizado correctamente"});
        db.end((err) => {console.log("closed")});
    })
    }
});


// ELIMINAR USUARIO POR POST ******************************************
router.post("/eliminar", middleware.myMiddleware, (req, res, next) =>{
    const db = mysql.createConnection(dbconn);
    if(!req.body.id){
        return res.json({
            // Bad Request
            status : 400, 
            msg : 'Se requiere un ID válido.',
            data : []
        });
    }else{
    const query = `DELETE FROM usuarios WHERE idUsuario = '${req.body.id}';`;
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
        res.json({code: 1, message: "Usuario eliminado correctamente"});
        db.end((err) => {console.log("closed")});
    })
    }
});


module.exports = router;