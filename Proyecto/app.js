const morgan = require("morgan");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./middleware/cors');
const app = express();

const camiones = require('./routes/camiones');
const usuarios = require('./routes/usuarios');
const conductores = require('./routes/conductores');
const terminal = require('./routes/terminal');
const supervisores = require('./routes/supervisores');
const reporte = require('./routes/reporte');

//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors);

app.use('/usuarios',usuarios);

app.use('/camiones',camiones);
app.use('/conductores',conductores);
app.use('/supervisores',supervisores);
app.use('/terminal',terminal);
app.use('/terminal',reporte);


module.exports = app;
