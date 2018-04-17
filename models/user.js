'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
    email: { type: String, require:true, unique: true, lowercase: true },
    password: { type:String, require: true },
    name: { type: String, default: 'USUARIO' },
    role: { type: String, default: 'ROLE_USER' },
    image: { type: String, default: 'null' }
})

module.exports = mongoose.model('User',UserSchema)
