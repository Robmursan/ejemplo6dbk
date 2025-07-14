const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({

    codigo:{
        type: Number,
        unique: true, //no se pueden repetir los codigos de los productos
    },
    nombre:{
        type: String,
        unique: true, //no se pueden repetir los nombres de los productos
    },
    descripcion: String,
    existencia: Number,
    precio:Number,
    imgurl:String

},
{
    timestamps: true
}
);

// Método para establecer la URL de la imagen
productoSchema.methods.setimgurl = function setimgurl(imagen){
    this.imgurl = "http://localhost:3000/foto/" + imagen;
}

// Definicion del esquema de producto
mongoose.model("Producto", productoSchema);
