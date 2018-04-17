'use strict'

const bcrypt = require('bcrypt-nodejs')
const User = require('../models/user')
const jwt = require('../services/jwt')
//trabajando con el sistema de archivos
const fs = require('fs')
const path = require('path')

function saveUser(req,res){
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
     })
     //Correo electronico y contraseña son necesarios
     if( user.password && user.email ){
         //Ciframos la contraseña
         bcrypt.genSalt(10,function(err,salt){
             if(err){return res.status(500).send({message:'Error de generador'})}
             bcrypt.hash(user.password,salt,null,function(err,hash){
                 if(err){return res.status(500).send({message:'Error de cifrado'})}
                 user.password = hash;
                 user.save((err)=>{
                     if(err)return res.status(200).send({message:'Usuario ya registrado'})
                     return res.status(200).send({ message: user })
                 })
             })
         })
     }else{
         res.status(200).send({message:'Introduce el correo y contraseña'})
     }
}

function loginUser(req,res){
    const want_token = req.body.gethash
    const password = req.body.password
    const email = req.body.email
    User.findOne({email: email.toLowerCase() },(err,user)=>{
        if(err) return res.status(500).send({message:'Error en la busqueda'})
        if(!user) return res.status(404).send({message:'Usuario no registrado'})
        //Comparamos contraseña
        bcrypt.compare(password,user.password,function(err,check){
            if(check){
                if(want_token){res.status(200).send({token:jwt.createToken(user)})}
                else{res.status(200).send({user})}
            }else{
                res.status(404).send({message:'Usuario o contraseña incorrecta'})
            }
        })
    })
}

function updateUser(req,res){
    const user_id = req.params.id;
    let update = req.body;
    //Ciframos la contraseña sincronamente
    if(update.password){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(update.password,salt);
        update.password = hash;
    }
    User.findByIdAndUpdate(user_id,update,(err,userUpdated)=>{
        if(err){return res.status(500).send({message:'Error al actualizar usuario'})}
        if(!userUpdated){return res.status(404).send({message:'No se pudo actualizar el usuario'})}
        res.status(200).send({user:userUpdated})
    });
}

function uploadImage(req,res){
    const user_id = req.params.id;
    if(req.files){
        const file_path = req.files.image.path;
        const file_name = file_path.split('\/')[2];
        const file_ext = file_name.split('\.')[1];
        if( file_ext=='png' || file_ext=='jpg' || file_ext=='gif'){
            User.findByIdAndUpdate(user_id,{image:file_name},(err,userUpdated)=>{
                if(err) return res.status(500).send({message:'Error al actualizar imagen'})
                if(!userUpdated) return res.status(404).send({message:'No se pudo actualizar la imagen'})
                //eliminamos la imagen anterior
                if(userUpdated.image!=='null'){
                    fs.unlinkSync('./uploads/users/'+userUpdated.image);
                }
                res.status(200).send({user:userUpdated});
            })
        }else { res.status(200).send({message:'Extensión del archivo no valida'}) }
    }else{ res.status(200).send({ message: 'No se ha subido ninguna imagen' }) }
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
  saveUser,
  loginUser,
  updateUser,
  uploadImage,
  getImageFile
}
