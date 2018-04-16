'use strict'
let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/fakebook',(err,res)=>{
    if(err){
      throw err;
    }else{
      console.log('La conexión a la base de datos se ha establecido ...');
    }
});
