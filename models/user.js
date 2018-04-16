'use strict'

const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
    name: String,
    email: { type: String, unique: true, lowercase: true },
    password: String,
    role: String,
    image: String
})

UserSchema.pre('save',function(next){
    let user = this
    //if (!user.isModified('password')) return next()
    bcrypt.genSalt(10,(err,salt)=>{
    if(err)return next(err)
    bcrypt.hash( user.password, salt, null,(err,hash)=>{
      if(err)return next(err)
      user.password = hash
      next()
    })
  })
})












module.exports = mongoose.model('User',UserSchema)
