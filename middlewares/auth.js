'use strict'

const services = require('../services/jwt')

function isAuth (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No tienes authorization' })
    }

    const token = req.headers.authorization.split(' ')[1]

    services.decodeToken(token)
       .then(response=>{
           req.user = response
           next()
       })
       .catch(response => {
           res.status(response.status).send({message:response.message})
       })
}

module.exports = isAuth
