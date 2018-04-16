'use strict'

const bcrypt = require('bcrypt-nodejs')

function encodePassword(pwd){
    const encoded = new Promise((resolve,reject)=>{
        bcrypt.genSalt(10,function(err,salt){
            if(err){
                reject({
                    status: 500,
                    message: 'Error en el generador'
                })
            }
            bcrypt.hash( pwd, salt, null,function(err,hash){
                if(err){
                    reject({
                        status: 500,
                        message: 'Error en el cifrado'
                    })
                }
                resolve(hash)
            })
        })
    })
    return encoded
}

module.exports = {
    encodePassword
}
