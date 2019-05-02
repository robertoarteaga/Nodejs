const cors = (req, res, next) =>{
    //Restricciones de seguridad  IMPORTANTE
    // Permisos CORSE
    res.header("Access-Control-Allow-Origin","+");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorizate"
        );

        // OPCIONES DEL NAVEGADOR 
        if(req.method == "OPTIONS"){
            //RESPONDE
            res.header(
                "Access-Control-Allow-Methods", 
                "PUT, POST, PATCH, DELETE, GET"
            );
            return res.status(200).json({});
        }
    //SIGUIENTE FUNCIÓN
    next();
}

module.exports = cors;
