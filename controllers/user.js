'use strict'

const User = require('../models/user')
const jwt = require('../services/jwt')
const cipher = require('../services/cipher')
//trabajando con el sistema de archivos
const fs = require('fs')
const path = require('path')

function pruebas(req,res){
    res.status(200).send({message:'Probando controlador de usuario'})
}

function saveUser(req,res){
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: 'ROLE_USER',
        image: 'null'
     })
     if(!user.password){
         return res.status(404).send({message:'El password es incorrecto'})
     }
     cipher.encodePassword(user.password)
     .then(hash=>{
         user.password = hash
         user.save((err)=>{
             if(err) return res.status(500).send({message:'Usuario ya existente'})
             return res.status(200).send({ message: user })
         })
     })
     .catch(erro => {
         res.status(erro.status).send({message:erro.message})
     })

}

function loginUser(req,res){
    User.findOne({email:req.body.email.toLowerCase()},(err,user)=>{
        if(err) return res.status(500).send({message: `Error busqueda ${err}` })
        if(!user) return res.status(404).send({message: 'No existe el usuario' })
        //Comprobamos contraseña
        user.comparePassword(req.body.password,function(err,isMatch){
            if(isMatch){
                if(req.body.gethash){
                    res.status(200).send({token:jwt.createToken(user)})
                }else{
                    res.status(200).send({user})
                }
            }else{
                res.status(404).send({message:'Usuario o contraseña incorrecta'})
            }
        })
    })
}

function updateUser(req,res){
    User.findById(req.params.id,(err,user)=>{
        if(err) return res.status(404).send({message:'Identificador incorrecto'})
        if( user.body.password ) user.password = user.body.password
        if( user.body.name     ) user.name     = user.body.name
        if( user.body.email    ) user.email    = user.body.email
        if( user.body.image    ) user.image    = user.body.image
        user.save((err)=>{
           if(err) return res.status(500).send({ message:`Error al actualizar` })
           res.status(200).send({ message: user })
        })
    })
}

function uploadImage(req,res){
    var file_name = 'No subido'
    if(req.files !== undefined){
        var file_path = req.files.image.path
        var file_name = file_path.split('\/')[2]
        var file_ext = file_name.split('\.')[1]
        if(file_ext=='png' || file_ext=='jpg' || file_ext=='gif'){
            User.findByIdAndUpdate( req.params.id,{image:file_name},(err,userUpdated) => {
                if(err) return res.status(500).send({message:'Error al actualizar imagen'})
                if(!userUpdated) return res.status(404).send({message:'No se ha podido actualizar'})
                return res.status(200).send({user:userUpdated})
            })
        } return res.status(200).send({message:'Extensión del archivo no valida'})
    } res.status(200).send({ message: 'No se ha subido ninguna imagen' })
}

function getImageFile(req,res){
    const imageFile = req.params.imageFile
    const path_file = './uploads/users/'+imageFile
    fs.exists(path_file,function(exist){
        if(exist){ res.sendFile(path.resolve(path_file)) }
        else{ res.status(200).send({message:'No existe la imagen...'}) }
    })
}

module.exports = {
  pruebas,
  saveUser,
  loginUser,
  updateUser,
  uploadImage,
  getImageFile
}
