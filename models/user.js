'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
    name: { type: String, default: 'Usuario' },
    email: { type: String, unique: true, lowercase: true, require:true },
    password: { type:String, require:true },
    role: { type: String, default: 'ROLE_USER' },
    image: { type: String, default: 'null' }
})

module.exports = mongoose.model('User',UserSchema)
