const mongoose = require('mongoose');// Importa el módulo mongoose pas 1 

const jwt = require('jsonwebtoken');// Importa el módulo jsonwebtoken paso 2

const clienteSchema = new mongoose.Schema({// Definición del esquema de cliente paso 3 
    nombre:String,
    apellidos:String,
    email:{
        type: String,
        unique: true, //no se pueden repetir los correos de los clientes
        required: true // el correo es obligatorio

    },
    direccion:String,
    telefono:String,
    password:{
        type: String,
        required: true // la contraseña es obligatoria
    }


});

// Método para generar un token JWT paso 5 
clienteSchema.methods.generadorJWT = function(){// Este método genera un token JWT para el cliente
    // El token contiene el email y el nombre del cliente
    return jwt.sign({
        email: this.email,
        nombre: this.nombre
    },'c0ntr4s3n14')//clave secreta para firmar el token
}






mongoose.model('Cliente', clienteSchema);
