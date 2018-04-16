'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Cargamos las rutas
const user_routes = require('./routes/user')

// Convertir a objetos json las peticiones http
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

// Configuramos cabeceras http

// Rutas base
app.use('/api',user_routes)

module.exports = app
