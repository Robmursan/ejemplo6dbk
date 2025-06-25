const mongoose = require('mongoose');

const empleadoSchema = new mongoose.Schema({
    codigo: {
        type: Number,
        unique: true
    },
    nombre: {
        type: String,
        unique: true
    },
    apellidoPaterno: String,
    apellidoMaterno: String,
    puesto: String,
    correo: {
        type: String,
        unique: true
    },
    sueldo: Number,
});

// Exporta el modelo
mongoose.model('Empleado', empleadoSchema);