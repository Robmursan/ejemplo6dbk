var express = require('express');
var router = express.Router();
//mongoose como gestor de datos
const mongoose = require("mongoose");
//extraer el modelo empleado
const Empleado = mongoose.model('Empleado');
//ruta de actulaizar


router.get('/', async function(req, res){
    let empleados = await Empleado.find({});
    //verifica si hay empleados
    if(!empleados || empleados.length === 0) {
        return res.status(404).send("No hay empleados para mostrar");
    }
    res.json(empleados);
});

//crear empleado ruta 
router.post('/', async function(req, res) {
    try {
        let empleado = new Empleado({
            codigo: req.body.codigo,
            nombre: req.body.nombre,
            apellidoPaterno: req.body.apellidoPaterno,
            apellidoMaterno: req.body.apellidoMaterno,
            puesto: req.body.puesto,
            correo: req.body.correo,
            sueldo: req.body.sueldo
        });
        await empleado.save();

        //responde con un mensaje de éxito
        let mensajeExito = {
            mensaje: "Empleado guardado correctamente",
            empleado: empleado
        }
        res.send(201).json({mensaje: "Empleado guardado correctamente"});
    } catch (err) {
        res.status(400).send({err});
    }
});


//actualizar empleado
router.put('/', async function(req, res) {
    let empleado = await Empleado.findOne({nombre: req.body.nombre});
    if (!empleado) {
        return res.status(400).send("Empleado no encontrado");
    }
    let empleadoActualizado = await Empleado.findOneAndUpdate(
        //campo de búsqueda
        {nombre: req.body.nombre},
        //campos a actualizar 
        {
            codigo: req.body.codigo,
            nombre: req.body.nombre,
            apellidoPaterno: req.body.apellidoPaterno,
            apellidoMaterno: req.body.apellidoMaterno,
            puesto: req.body.puesto,
            correo: req.body.correo,
            sueldo: req.body.sueldo
        }
        //retorna el documento actualizado
        ,{new: true}

    );
    res.send({empleadoActualizado});
});

// Eliminar empleado
router.put('/eliminarEmpleado', async (req, res) => {
    let empleadoEliminado = await Empleado.findOneAndDelete({nombre: req.body.nombre});
    res.send({empleadoEliminado});
});

module.exports = router;