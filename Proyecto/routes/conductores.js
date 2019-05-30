const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconn = require('../config/database.js');

const jwt = require('jsonwebtoken');
const middleware = require('./../middleware/token');

//https://api.rutas.com/conductores
router.get("/ver", middleware.myMiddleware ,(req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = "SELECT * FROM conductores;";
    db.query(query, (err, result, fields) => {
        if (err) {
            console.log(err);
            res.status(500);
            res.json({
                code: 0,
                message: "Algo salió mal"
            });
        }
        console.log(result);
        res.status(200);
        res.json({
            code: 1,
            message: result
        });
        db.end((err) => {
            console.log("closed")
        });
    })
});
// POST ******************************************
router.post("/registro", middleware.myMiddleware, (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = `INSERT INTO conductores(idSupervisor, conUsername, conPassword, conNombre,conL_cencia) VALUES ('${req.body.idSuper}','${req.body.userName}','${req.body.password}','${req.body.nombre}','${req.body.licencia}');`;
    console.log(query);
    if (!req.body.nombre || !req.body.userName || !req.body.password) {
        return res.json({
            status: 0,
            msg: 'Faltan campos que son necesarios',
            data: []
        });
    } else {
        db.query(query, (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.json({
                    code: 0,
                    message: "Algo salió mal"
                });

            }
            res.status(200);
            res.json({
                code: 0,
                message: "Conductor Agregado"
            });
            db.end((err) => {
                console.log("closed")
            });
        })
    }
});

router.post("/baja", middleware.myMiddleware,(req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = `DELETE FROM conductores WHERE conUsername='${req.body.userName}';`;
    console.log(query);
    if (!req.body.userName) {
        return res.json({
            status: 0,
            msg: 'Faltan campos que son necesarios',
            data: []
        });
    } else {
        db.query(query, (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.json({
                    code: 0,
                    message: "Algo salió mal"
                });

            }
            res.status(200);
            res.json({
                code: 0,
                message: "Conductor Eliminado"
            });
            db.end((err) => {
                console.log("closed")
            });
        })
    }
});

router.post("/modificacion", middleware.myMiddleware,(req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = `UPDATE conductores SET  conUsername='${req.body.userName}', conPassword='${req.body.password}',conNombre='${req.body.nombre}',conL_cencia='${req.body.licencia}' WHERE idConductor='${req.body.id}';`;
    console.log(query);
    if (!req.body.id) {
        return res.json({
            status: 0,
            msg: 'Faltan campos que son necesarios',
            data: []
        });
    } else {
        db.query(query, (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.json({
                    code: 0,
                    message: "Algo salió mal"
                });

            }
            res.status(200);
            res.json({
                code: 0,
                message: "Conductor Actualizado"
            });
            db.end((err) => {
                console.log("closed")
            });
        })
    }
});


module.exports = router;