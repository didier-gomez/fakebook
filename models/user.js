'use strict'

const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
    name: String,
    email: { type: String, unique: true, lowercase: true, require:true },
    password: { type:String, require:true },
    role: String,
    image: String
})

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null,isMatch);
    })
}

UserSchema.pre('save', function(next){
    let user = this
    if(!user.isModified('password'))return next()
    bcrypt.genSalt(10,function(err,salt){
        if(err) return next(err)
        bcrypt.hash( user.password, salt, null,function(err,hash){
            if(err)return next(err)
            user.password = hash
            next()
        })
    })
})

module.exports = mongoose.model('User',UserSchema)
