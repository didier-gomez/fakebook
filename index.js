'use strict'
let mongoose = require('mongoose')
let app = require('./app')
let port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/fakebook',(err,res)=>{
    if(err){
      throw err;
    }else{
      console.log('La conexión a la base de datos se ha establecido ...');
      app.listen(port,()=>{
        console.log(`Servidor http escuchando en: ${port}`);
      })
    }
});
