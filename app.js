'use strict'
let express = require('express')
let bodyParser = require('body-parser')
let app = express()

// Cargamos las rutas

// Convertir a objetos json las peticiones http
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

// Configuramos cabeceras http

// Rutas base

module.exports = app
