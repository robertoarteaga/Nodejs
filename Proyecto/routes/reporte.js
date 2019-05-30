const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconn = require('../config/database.js');

router.post("/registrar", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = `INSERT INTO reporte(idCamion, idTerminal, repLlegada, repStatus,repSalida) VALUES ('${req.body.idCamion}','${req.body.idTerminal}','${req.body.repLlegada}','${req.body.repStatus}','${req.body.repSalida}');`;
    console.log(query);
    if (!req.body.idCamion || !req.body.idTerminal || !req.body.repLlegada || !req.body.repStatus || !req.body.repSalida) {
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
                message: "Reporte agregado correctamente"
            });
            db.end((err) => {
                console.log("closed")
            });
        })
    }
});

router.get("/consultar", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = "SELECT * FROM reporte;";
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
    const query = `DELETE FROM reporte WHERE idCamion='${req.body.idCamion}';`;
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
                message: "Reporte eliminado correctamente"
            });
            db.end((err) => {
                console.log("closed")
            });
        })
    }
});

router.post("/actualizar", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = `UPDATE reporte SET  idCamion='${req.body.idCamion}', idTerminal='${req.body.idTerminal}',repLlegada='${req.body.repLlegada}', repStatus='${req.body.repStatus}', repSalida='${req.body.repSalida}' WHERE idReporte='${req.body.idReporte}';`;
    console.log(query);
    if (!req.body.idReporte || !req.body.idCamion || !req.body.idTerminal || !req.body.repStatus||!req.body.repLlegada ||!req.body.repSalida) {
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
                message: "Reporte actualizado"
            });
            db.end((err) => {
                console.log("closed")
            });
        })
    }
});
module.exports = router;