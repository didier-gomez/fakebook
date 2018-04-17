'use strict'

const express = require('express')
const UserController = require('../controllers/user')
const auth = require('../middlewares/auth')

const api = express.Router()

//Subida de ficheros imagen
const multipart = require('connect-multiparty')
const md_upload = multipart({ uploadDir: './uploads/users' })

api.get('/prueba', auth , UserController.pruebas )
api.post('/registry', UserController.saveUser )
api.post('/login', UserController.loginUser )
api.put('/update/:id' , UserController.updateUser )
api.post('/upload-image/:id', md_upload , UserController.uploadImage )
api.get('/get-image/:imageFile', UserController.getImageFile )

module.exports = api
