const morgan = require("morgan");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./middleware/cors');
const app = express();

const camiones = require('./routes/camiones');
const usuarios = require('./routes/usuarios');
const conductores = require('./routes/conductores');


//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors);

app.use('/camiones',camiones);
app.use('/usuarios',usuarios);
app.use('/conductores',conductores);





module.exports = app;