//multer es una libreria para guardar archivos 
const multer = require('multer');
const path = require('path');


//constante storage que llama la funcion diskstraje que es almacenar en disco 
const storage = multer.diskStorage({
    //parametro para guaqrdar y despues la direccion 
    destination: function(req,file,cb){
        //cb guarda el archivo con su nombre original 
        cb(null,'./almacen/img');
    },
    //parametro
    filename: function(req,file,cb){
        //se crea una constante con una concatenacion
        const uniqueSuffix = Date.now() + '-'+ Math.round(Math.random()*1E9);
        cb(null,file.fieldname + '-' + uniqueSuffix +'.png')
    }

});

//se guarda en esta constante 
const upload = multer ({storage:storage});//se guarda como Json campo valor 
module.exports = upload;//Actualiza y lanza la vari