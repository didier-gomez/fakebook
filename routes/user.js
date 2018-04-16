'use strict'

const express = require('express')
const UserController = require('../controllers/user')

const api = express.Router()

api.get('/pruebas', UserController.pruebas )
api.post('/signup', UserController.saveUser )
api.post('/login', UserController.loginUser )

module.exports = api
