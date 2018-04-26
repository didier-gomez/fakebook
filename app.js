'use strict'

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// Cargamos las rutas
const user_routes = require('./routes/user')

// Convertir a objetos json las peticiones http
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configuramos cabeceras http
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods',  'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Ruta base
app.use('/api',user_routes)

module.exports = app
