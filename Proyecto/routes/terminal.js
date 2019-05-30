const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconn = require('../config/database.js');

router.post("/registrar", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = `INSERT INTO terminal(terNombre, terDireccion, terHora) VALUES ('${req.body.terNombre}','${req.body.terDireccion}','${req.body.terHora}');`;
    console.log(query);
    if (!req.body.terNombre || !req.body.terDireccion || !req.body.terHora) {
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
                message: "Terminal agregada correctamente"
            });
            db.end((err) => {
                console.log("closed")
            });
        })
    }
});

router.get("/consultar", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = "SELECT * FROM terminal;";
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

router.post("/borrar", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = `DELETE FROM terminal WHERE terNombre='${req.body.terNombre}';`;
    console.log(query);
    if (!req.body.terNombre) {
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
                message: "Terminal eliminada"
            });
            db.end((err) => {
                console.log("closed")
            });
        })
    }
});

router.post("/actualizar", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = `UPDATE terminal SET  terNombre='${req.body.terNombre}', terDireccion='${req.body.terDireccion}',terHora='${req.body.terHora}' WHERE idTerminal='${req.body.id}';`;
    console.log(query);
    if (!req.body.terNombre || !req.body.terDireccion || !req.body.terHora) {
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
                message: "Terminal actualizada"
            });
            db.end((err) => {
                console.log("closed")
            });
        })
    }
});
module.exports = router;