const express = require('express');
const cors = require('cors');

var bodyParser = require("body-parser");
const app = express();


// settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)

// middlewares
app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(bodyParser.json({limit: '300kb'}));

// routes


module.exports = app;