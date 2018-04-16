'use strict'
const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.Promise = global.Promise;
mongoose.connect(config.db,(err,res)=>{
    if(err){
      throw err;
    }else{
      console.log('Conexión a la base de datos establecido ...');
      app.listen(config.port,()=>{
        console.log(`API corriendo en http://localhost:${config.port}`);
      })
    }
});
