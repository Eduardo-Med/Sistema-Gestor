const express = require('express');
const cors = require('cors');

var bodyParser = require("body-parser");
const app = express();


// settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)

// middlewares
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.json({limit: '300kb'}));

// routes
app.use('/api/v1/usuario', require('./src/routes/usuario.routes'))
app.use('/api/v1/autentificar', require('./src/routes/autentificar.routes'))
app.use('/api/v1/reporte', require('./src/routes/reporte.routes'))
app.use('/api/v1/salon', require('./src/routes/salon.routes'))
app.use('/api/v1/correo', require('./src/routes/correo.routes'))

module.exports = app;