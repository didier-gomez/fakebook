'use strict'

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

module.exports = mongoose.model('User',UserSchema)
