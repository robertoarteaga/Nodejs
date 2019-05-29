const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconn = require('../config/database.js');

router.post('/registro', (req, res, next) =>{
    const db = mysql.createConnection(dbconn);
    const query = `INSERT INTO terminal(terNombre, terDireccion, terHora) VALUES ('${req.body.terNombre}','${req.body.terDireccion}','${req.body.terHora}');`;
    console.log(query);
    if(!req.body.terNombre || !req.body.terDireccion || !req.body.terHora){
        return res.json({
            status : 0,
            msg : 'Los campos son necesarios',
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
            res.json({code: 0, message: "Terminal agregada correctamente"});
            db.end((err) => {console.log("closed")});
        })
    }
});

module.exports = router;