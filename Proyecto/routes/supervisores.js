const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconn = require('../config/database.js');
const jwt = require('jsonwebtoken');
const middleware = require('./../middleware/token');

//https://api.rutas.com/supervisores
router.get("/ver", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = "SELECT * FROM supervisor;";
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
router.post("/registro",  middleware.myMiddleware, (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = `INSERT INTO supervisor(supNombre, supDireccion, supRegistro, supStatus) VALUES ('${req.body.supName}','${req.body.supAddress}','${req.body.supRegisterDate}','${req.body.supStatus}');`;
    console.log(query);
    if (!req.body.supName || !req.body.supAddress ||!req.body.supRegisterDate || !req.body.supStatus) {
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
                message: "Supervisor Agregado"
            });
            db.end((err) => {
                console.log("closed")
            });
        })
    }
});

router.post("/baja",  middleware.myMiddleware, (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = `DELETE FROM supervisor WHERE idSupervisor='${req.body.id}';`;
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
                message: "Supervisor Eliminado"
            });
            db.end((err) => {
                console.log("closed")
            });
        })
    }
});

router.post("/modificacion",  middleware.myMiddleware, (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = `UPDATE supervisor SET  supNombre='${req.body.supName}', supDireccion='${req.body.supAddress}',supRegistro='${req.body.supRegisterDate}',supStatus='${req.body.supStatus}' WHERE idSupervisor='${req.body.id}';`;
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