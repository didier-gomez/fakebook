'use strict'
const bcrypt = require('bcrypt-nodejs')
const User = require('../models/user')

function pruebas(req,res){
    res.status(200).send({message:'Probando controlador de usuario'})
}

function saveUser(req,res){
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: 'ROLE_USER',
        image: 'null'
    })
    user.save((err)=>{
       if(err) return res.status(500).send({ message: `Error al crear el usuario` })
       return res.status(200).send({ message: user })
    })
}

function loginUser(req,res){
    User.findOne({email:req.body.email.toLowerCase()},(err,user)=>{
        if(err) return res.status(500).send({message: `Error busqueda ${err}` })
        if(!user) return res.status(404).send({message: 'No existe el usuario' })
        //Comprobamos contraseña
        bcrypt.compare( req.body.password, user.password,(err,check)=>{
            if(err) return res.status(500).send({message: `Error cifrado ${err}` })
            if(check){
                if(req.body.gethash){
                    //devolver JWT
                }else{
                    res.status(200).send({user})
                }
            }else{
                res.status(404).send({message:'Usuario o contraseña incorrecta'})
            }
        })
    })
}


module.exports = {
  pruebas,
  saveUser,
  loginUser
}
